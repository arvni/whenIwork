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

    // Relations

    public function requestable()
    {
        return $this->morphTo();
    }

    public function RevisableBy()
    {
        return $this->belongsTo(User::class, "revisable_by_id");
    }

    public function User()
    {
        return $this->belongsTo(User::class);
    }

    public function Shift()
    {
        return $this->belongsTo(Shift::class, "requestable_id")->where("requestable_type", Shift::class);
    }


    // Scopes

    public function scopeStatus($query, $status)
    {
        return $query->where("status", $status);
    }

    public function scopeType($query, $type)
    {
        return $query->where("type", $type);
    }

    public function scopeAccepted($query)
    {
        return $query->status("accepted");
    }

    public function scopeWaiting($query)
    {
        return $query->status("waiting");
    }

    public function scopeChangeUser($query)
    {
        return $query->type("changeUser");
    }
}
