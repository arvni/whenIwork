<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Leave extends Model
{
    use HasFactory;

    protected $fillable = [
        "started_at",
        "ended_at",
        "type"
    ];

    public function User()
    {
        return $this->belongsTo(User::class);
    }

    public function Acceptor()
    {
        return $this->belongsTo(User::class, "acceptor_id");
    }

}
