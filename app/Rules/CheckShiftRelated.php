<?php

namespace App\Rules;

use App\Models\User;
use Illuminate\Contracts\Validation\DataAwareRule;
use Illuminate\Contracts\Validation\InvokableRule;

class CheckShiftRelated implements InvokableRule, DataAwareRule
{
    protected array $data = [];

    public function setData($data)
    {
        $this->data = $data;
    }

    public function __invoke($attribute, $value, $fail)
    {
        if ($this->data["type"] === "normal" && !User::whereId($value["id"])->count()) {
            $fail("کاربر با این مشخصات یافت نشد");
        }
    }
}
