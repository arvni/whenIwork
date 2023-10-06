<?php

namespace App\Notifications;


use Illuminate\Notifications\Notification;

class SMS {

    public function send($notifiable, Notification $notification): void
    {
        $message = $notification->toSMS($notifiable);

    }

    private function checkProvider(){

    }
}
