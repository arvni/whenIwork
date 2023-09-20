<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Spatie\Permission\Models\Role as SpatieRole;

class Role extends SpatieRole
{

    public function Attendances()
    {
        return $this->morphMany(Attendance::class, "attendable");
    }

    public function RevisableClientRequests()
    {
        return $this->morphMany(ClientRequest::class, "revisable_by");
    }

    public function permissions(): BelongsToMany
    {
        return parent::permissions();
    }

    public function scopeSearch($query, $search)
    {
        return $query->where("name", "like", "%$search%");
    }

    public function Shifts()
    {
        return $this->belongsToMany(Shift::class, "role_shift");
    }
}
