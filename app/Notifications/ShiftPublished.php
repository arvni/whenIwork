<?php

namespace App\Notifications;

use App\Models\Shift;
use Carbon\Carbon;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Morilog\Jalali\CalendarUtils;
use Morilog\Jalali\Jalalian;
use Ramsey\Uuid\Uuid;

class ShiftPublished extends Notification implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new notification instance.
     *
     * @param Shift $shift
     */
    public function __construct(public Shift $shift)
    {

    }

    /**
     * Get the notification's delivery channels.
     *
     * @param mixed $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return [
            SMS::class,
            'mail'
        ];
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param mixed $notifiable
     * @return MailMessage
     */
    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->subject("اعلان شیفت")
            ->view(
                'emails.shiftPublished', ['shift' => $this->shift->load(["Room:name,id", "Room.Department:id,name"]), "user" => $notifiable]
            );
    }

    public function toSMS($notifiable)
    {
        return [
            "receptor" => $notifiable->mobileNo,
            "token" => $this->shift->room->name,
            "token2" => CalendarUtils::convertNumbers(CalendarUtils::strftime('Y/m/d', strtotime($this->shift->date))),
            "token3" => CalendarUtils::convertNumbers(Carbon::parse($this->shift->started_at)->format("H:i")),
            "template" => "shift-register",
            "token10" => $notifiable->name,
        ];
    }

    /**
     * Get the array representation of the notification.
     *
     * @param mixed $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
        return [
            "id" => Uuid::uuid4()->toString(),
            "shift_id" => $this->shift->id,
            "status" => "published",
            "type" => "shift"
        ];
    }
}
