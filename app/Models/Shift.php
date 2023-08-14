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
        "type"
    ];

    protected $appends = [
        "started_at_dateTime"
    ];

    public function getStartedAtDateTimeAttribute()
    {
        return Carbon::parse("$this->date $this->started_at", config("app.timezone"));
    }

    public function Attendances()
    {
        return $this->hasMany(Attendance::class);
    }

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
        return $this->morphToMany(\Spatie\Permission\Models\Role::class, "attendable", "attendances", "shift_id", "attendable_id", null, null, true);
    }
    public function Users()
    {
        return $this->morphToMany(User::class, "attendable", "attendances", "shift_id", "attendable_id", null, null, true);
    }

    public function scopeActive($query)
    {
        return $query->where("isActive",true);
    }

    public function ClientRequests()
    {
        return $this->morphMany(ClientRequest::class,"requestable");
    }

}
