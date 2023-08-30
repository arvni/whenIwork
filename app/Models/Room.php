<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Room extends Model
{
    use HasFactory;

    protected $fillable = [
        "name",
        "isActive",
        "description",
        "department_id"
    ];


    public function Shifts()
    {
        return $this->hasMany(Shift::class);
    }

    public function Works()
    {
        return $this->hasManyThrough(Work::class, Shift::class);
    }

    public function Department(): BelongsTo
    {
        return $this->belongsTo(Department::class);
    }


    public function scopeSearch($query, $search)
    {
        return $query->where("name", "like", "%$search%");
    }

}
