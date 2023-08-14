<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

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

    /**
     * @return BelongsTo
     */
    public function Department(): BelongsTo
    {
        return $this->belongsTo(Department::class);
    }

    public function Managers()
    {
        $departmentId = $this->attributes['department_id']??"";
        return User::permission("admin.Department.$departmentId.Room.$this->id")->select(["name", "id"]);
    }

}
