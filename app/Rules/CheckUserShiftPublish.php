<?php

namespace App\Rules;

use Carbon\Carbon;
use Illuminate\Contracts\Validation\Rule;

class CheckUserShiftPublish implements Rule
{
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
        $user = $value->Users()->first();
        if ($user->Leaves()->where(function ($q) use ($value) {
            $q->whereDate("started_at", ">=", Carbon::parse($value->date)->toDate())->whereDate("ended_at", "<=", Carbon::parse($value->date)->toDate());
        })->where("type", "daily")->count()) {
            $this->msg=__("messages.haveDailyLeaveOnThisDate");
            return false;
        }

        if ($user->Shifts()->active()->whereDate("shifts.date", "=", $value->date)->where(function ($q) use ($value) {
            $q->where(function ($qu) use ($value) {
                $qu->whereTime("shifts.ended_at", ">", $value->started_at)->whereTime("shifts.ended_at", "<=", $value->ended_at);
            })->orWhere(function ($qu) use ($value) {
                $qu->whereTime("shifts.started_at", ">=", $value->started_at)->whereTime("shifts.started_at", "<", $value->ended_at);
            })->orWhere(function ($qu) use ($value) {
                $qu->whereTime("shifts.started_at", "<=", $value->started_at)->whereTime("shifts.ended_at", ">=", $value->ended_at);
            });
        })->count()) {
            $shift=$user->Shifts()->active()->whereDate("shifts.date", "=", $value->date)->where(function ($q) use ($value) {
                $q->where(function ($qu) use ($value) {
                    $qu->whereTime("shifts.ended_at", ">", $value->started_at)->whereTime("shifts.ended_at", "<=", $value->ended_at);
                })->orWhere(function ($qu) use ($value) {
                    $qu->whereTime("shifts.started_at", ">=", $value->started_at)->whereTime("shifts.started_at", "<", $value->ended_at);
                })->orWhere(function ($qu) use ($value) {
                    $qu->whereTime("shifts.started_at", "<=", $value->started_at)->whereTime("shifts.ended_at", ">=", $value->ended_at);
                });
            })->withAggregate("Room","name")->first();
            $this->msg=__("messages.haveShiftOnThisDateRange",["room"=>$shift->room_name]);
            return false;
        }
        return true;
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return $ths->msg??__("messages.userHasShiftOrLeave");
    }
}
