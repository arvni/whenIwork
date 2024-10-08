<?php

namespace App\Rules;

use Carbon\Carbon;
use Illuminate\Contracts\Validation\DataAwareRule;
use Illuminate\Contracts\Validation\Rule;

class ConfirmClientRequestRule implements Rule, DataAwareRule
{
    /**
     * All of the data under validation.
     *
     * @var array<string, mixed>
     */
    protected $data = [];
    protected $msg="";

    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Determine if the validation rule passes.
     *
     * @param string $attribute
     * @param mixed $value
     * @return bool
     */
    public function passes($attribute, $value)
    {
        $clientRequest = request()->route("clientRequest");
        $user = $clientRequest->User;
        $requestable = $clientRequest->Requestable;
        if ($clientRequest->status !== "waiting") {
            $this->msg=__("messages.haveDefinedBefore");
            return false;
        }
        if ($clientRequest->type == "takeLeave") {

            if ($user->Leaves()->where(function ($q) use ($requestable) {
                $q->whereDate("started_at", ">=", Carbon::parse($requestable->started_at)->toDate())->whereDate("started_at", "<=", Carbon::parse($requestable->ended_at)->toDate())->whereNot("id", $requestable->id);
            })->orWhere(function ($q) use ($requestable) {
                $q->whereDate("ended_at", ">=", Carbon::parse($requestable->started_at)->toDate())->whereDate("ended_at", "<=", Carbon::parse($requestable->ended_at)->toDate())->whereNot("id", $requestable->id);
            })->count()) {
                $this->msg=__("messages.haveDailyLeaveOnThisDate");
                return false;
            }
            if ($requestable->type == "hourly") {
                if (!$user->Shifts()->whereDate("date", "=", Carbon::parse($requestable->started_at)->toDate())->whereTime("started_at", "<=", Carbon::parse($requestable->started_at)->toTimeString())->whereTime("ended_at", ">=", Carbon::parse($requestable->ended)->toTimeString())->count()) {
                    $this->msg=__("messages.dontHaveShiftAtThisTime");
                    return false;
                }
            } else {
                $shiftCount=$user->Shifts()->whereBetween("date", [Carbon::parse($requestable->started_at)->toDateString(), Carbon::parse($requestable->ended_at)->toDateString()])->count();
                if ($shiftCount) {
                    $this->msg=__("messages.haveShiftOnThisDateRange",["no"=>$shiftCount]);
                    return false;

                }
                if ($user->leaves()->whereBetween("started_at", [Carbon::parse($requestable->started_at)->toDate(), Carbon::parse($requestable->ended_at)->toDate()])->whereNot("id", $requestable->id)->accepted()->count()) {
                    $this->msg = __("messages.haveLeaveOnThisDateRange");
                    return false;
                }
            }
        } else {
            if ($user->Leaves()->whereDate("started_at", "<=", $requestable->date)->whereDate("ended_at", ">=", $requestable->date)->count()) {
                $this->msg = __("messages.haveLeaveOnThisDateRange");
                return false;
            }
            if ($user->Shifts()
                ->whereDate("shifts.date", "=", $requestable->date)
                ->whereTime("shifts.started_at", "<=", $requestable->started_at)
                ->whereTime("shifts.ended_at", ">=", $requestable->ended_at)
                ->count()
            ) {
                $room=$user->Shifts()->whereDate("shifts.date", "=", $requestable->date)->whereTime("shifts.started_at", "<=", $requestable->started_at)->whereTime("shifts.ended_at", ">=", $requestable->ended_at)->first()->Room;
                $this->msg=__("messages.haveShiftOnThisDateRange",["room"=>$room->name]);
                return false;
            }
        }
        return true;
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message(): string
    {
        return $this->msg??__("messages.clientRequest_cannot_confirm");
    }

    public function setData($data)
    {
        $this->data = $data;

        return $this;
    }
}
