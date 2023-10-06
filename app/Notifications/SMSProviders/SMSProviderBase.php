<?php

namespace App\Notifications\SMSProviders;
abstract class SMSProviderBase
{
    protected $message;

    public function __construct($message)
    {
        $this->message = $message;
    }

    abstract public function sendOne($mobile);

    abstract public function sendMany($mobiles = []);

}
