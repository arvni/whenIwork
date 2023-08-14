<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ClientRequest extends Model
{
    use HasFactory;

    protected $fillable = [
        "type",
        "message",
        "status"
    ];

    public function requestable()
    {
        return $this->morphTo();
    }

    public function RevisableBy()
    {
        return $this->morphTo();
    }

    public function User()
    {
        return $this->belongsTo(User::class);
    }
}
