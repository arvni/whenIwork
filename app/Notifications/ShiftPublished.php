<?php

namespace App\Notifications;

use App\Models\Shift;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
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
        return ['mail', SMS::class];
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
            "mobile" => $notifiable->mobileNo,
            "message" => " شیفت " . __("constants." . $this->shift->type) . " یرای بخش" . $this->shift->room->name . "
    از دپارتمان" . $this->shift->room->department->name . "
    برای تاریخ" . $this->shift->date . "از ساعت" . $this->shift->started_at . "تا ساعت" . $this->shift->ended_at
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
