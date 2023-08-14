<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\DataAwareRule;
use Illuminate\Contracts\Validation\InvokableRule;
use Illuminate\Contracts\Validation\Rule;

class CheckShiftRelated implements InvokableRule, DataAwareRule
{
    protected array $data = [];

    public function setData($data)
    {
        $this->data = $data;
    }

    public function __invoke($attribute, $value, $fail)
    {
        if ($this->data["type"] === "normal" && !$value["class"]::whereId($value["id"])->count()) {
            $fail("کاربر با این مشخصات یافت نشد");
        } elseif ($this->data["type"] == "open") {
            if (count($value) > 0) {
                foreach ($value as $model) {
                    if (!$model["class"]::whereId($model["id"])->count())
                        $fail("نقش " . $model["name"] . "  انتخاب شده اشتباه است");
                }
            } else
                $fail("حداقل یک نقش را انتخاب کنید");
        }
    }
}
