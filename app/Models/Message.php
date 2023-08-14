<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    use HasFactory;

    protected $fillable = [
        "sender",
        "title",
        "context",
    ];
    protected $with = ["Receivers", "Sender"];

    public function Receivers()
    {
        return $this->belongsToMany(User::class, "message_user", "message_id", "user_id")->withPivot("read_at");
    }

    public function Sender()
    {
        return $this->belongsTo(User::class, "sender", "id");
    }
}
