<?php

namespace App\Rules;

use App\Models\User;
use Carbon\Carbon;
use Illuminate\Contracts\Validation\DataAwareRule;
use Illuminate\Contracts\Validation\Rule;

class CheckUserShiftCreate implements Rule, DataAwareRule
{
    /**
     * All of the data under validation.
     *
     * @var array<string, mixed>
     */
    protected $data = [];

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
     * @param mixed $_value
     * @return bool
     */
    public function passes($attribute, $_value)
    {
        $value = $this->data;
        if ($this->data["type"] === "normal") {
            $user = User::find($this->data["related"]["id"]);
            if ($user->Leaves()->where(function ($q) use ($value) {
                $q->whereDate("started_at", ">=", Carbon::parse($value["date"])->toDate())->whereDate("ended_at", "<=", Carbon::parse($value["date"])->toDate());
            })->where("type", "daily")->count()) {
                return false;
            }
            $query = $user->UnPublishedShifts()->whereDate("shifts.date", "=", $value["date"])->where(function ($q) use ($value) {
                $q->where(function ($qu) use ($value) {
                    $qu->whereTime("shifts.ended_at", ">=", $value["started_at"])->whereTime("shifts.ended_at", "<=", $value["ended_at"]);
                })->orWhere(function ($qu) use ($value) {
                    $qu->whereTime("shifts.started_at", ">=", $value["started_at"])->whereTime("shifts.started_at", "<=", $value["ended_at"]);
                })->orWhere(function ($qu) use ($value) {
                    $qu->whereTime("shifts.started_at", "<=", $value["started_at"])->whereTime("shifts.ended_at", ">=", $value["ended_at"]);
                });
            });
            if (isset($this->data["id"]))
                $query->whereNot("shifts.id", $this->data["id"]);
            if ($query->count())
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
        return __("messages.userHasShiftOrLeave");
    }

    public function setData($data)
    {
        $this->data = $data;
        return $this;
    }
}
