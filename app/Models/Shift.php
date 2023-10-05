<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Shift extends Model
{
    use HasFactory;

    protected $fillable = [
        "noUsers",
        "started_at",
        "ended_at",
        "date",
        "type",
        "isActive"
    ];

    protected $appends = [
        "started_at_dateTime"
    ];

    //additional Attribute
    public function getStartedAtDateTimeAttribute()
    {
        return Carbon::parse("$this->date $this->started_at", config("app.timezone"));
    }

    //Scopes
    public function scopeActive($query, $isActive = true)
    {
        return $query->where("isActive", $isActive);
    }


    // Relations
    public function Room()
    {
        return $this->belongsTo(Room::class);
    }

    public function Works()
    {
        return $this->hasMany(Work::class);
    }

    public function Roles()
    {
        return $this->belongsToMany(Role::class, "role_shift");
    }

    public function Users()
    {
        return $this->belongsToMany(User::class, "works")->withPivot(["user_id", "changed", "accepted"]);
    }

    public function ClientRequests()
    {
        return $this->morphMany(ClientRequest::class, "requestable");
    }

    public function AcceptedClientRequests()
    {
        return $this->morphMany(ClientRequest::class, "requestable")->accepted();
    }

    public function WaitingClientRequests()
    {
        return $this->morphMany(ClientRequest::class, "requestable")->waiting();
    }

}
