<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Work extends Model
{
    use HasFactory;

    protected $fillable=[
        "started_at",
        "ended_at",
        "location",
        "changed",
        "accepted"
    ];

    protected $casts=[
        "started_at"=>"datetime: H:i",
        "ended_at"=>"datetime: H:i",
        "location"=>"json",
        "changed"=>"boolean",
        "accepted"=>"boolean",
    ];

    public function scopeStarted($query)
    {
        return $query->whereNotNull("started_at");
    }

    public function Shift()
    {
        return $this->belongsTo(Shift::class);
    }

    public function User()
    {
        return $this->belongsTo(User::class);
    }

    public function scopeAccepted($query)
    {
        return $query->where("accepted",true);
    }
}
