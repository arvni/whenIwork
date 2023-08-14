<?php

namespace App\Rules;

use Carbon\Carbon;
use Illuminate\Contracts\Validation\DataAwareRule;
use Illuminate\Contracts\Validation\InvokableRule;

class TimeCheck implements DataAwareRule, InvokableRule
{
    protected array $data = [];
    protected string $compareTimeField;
    protected string $type;

    public function __construct(string $type, string $compareTimeField)
    {
        $this->compareTimeField = $compareTimeField;
        $this->type = $type;
    }

    public function __invoke($attribute, $value, $fail)
    {

        $timeValue = $this->getTimeValue($value);
        $comparedValue = $this->getTimeValue($this->data[$this->compareTimeField]);

        switch ($this->type) {
            case "gte":
                if ($timeValue->getTimestamp() - $comparedValue->getTimestamp() < 0) {
                    $fail(__("validation_gt", ["attribute" => __("constants.$attribute"), "compareAttribute" => __("constants.$this->compareTimeField")]));
                }
                break;
            case "gt":
                if ($timeValue->getTimestamp() - $comparedValue->getTimestamp() <= 0) {
                    $fail(__("validation_gte", ["attribute" => __("constants.$attribute"), "compareAttribute" => __("constants.$this->compareTimeField")]));
                }
                break;
            case "eq":
                if ($timeValue->getTimestamp() - $comparedValue->getTimestamp() == 0) {
                    $fail(__("validation_eq", ["attribute" => __("constants.$attribute"), "compareAttribute" => __("constants.$this->compareTimeField")]));
                }
                break;

            case "lte":
                if ($timeValue->getTimestamp() - $comparedValue->getTimestamp() >= 0) {
                    $fail(__("validation_lte", ["attribute" => __("constants.$attribute"), "compareAttribute" => __("constants.$this->compareTimeField")]));
                }
                break;
            case "lt":
                if ($timeValue->getTimestamp() - $comparedValue->getTimestamp() > 0) {
                    $fail(__("validation_lt", ["attribute" => __("constants.$attribute"), "compareAttribute" => __("constants.$this->compareTimeField")]));
                }
                break;
        }
    }

    private function getTimeValue(string $value)
    {
        return Carbon::parse($value);
    }

    public function setData($data)
    {
        $this->data = $data;
        return $this;
    }

}
