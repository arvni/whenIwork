<?php

namespace App\Notifications;


use Illuminate\Notifications\Notification;
use Kavenegar\KavenegarApi;

class SMS
{

    public function send($notifiable, Notification $notification): void
    {
       $values= [
            "receptor" => $receptor,
            "token" => $token,
            "token2" => $token2,
            "token3" => $token3,
            "template" => $template,
            "token10" => $token10,
            "token20" => $token20
            ] = array_merge(
            [
                "receptor"=>null,
                "token20" => null,
                "token10" => null,
                "token2" => null,
                "token3" => null,
            ],
            $notification->toSMS($notifiable)
        );
       if ($receptor) {
           $api = new KavenegarApi(config("services.kavehnegar.apiKey"));
           $api->VerifyLookup($receptor, $token, $token2, $token3, $template, 'sms', $token10, $token20);
       }
    }

}
