<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Attendance extends Model
{
    use HasFactory;

    public function attendable()
    {
        return $this->morphTo();
    }

    public function attendableRole()
    {
        return $this->belongsTo(Role::class,"attendable_id");
    }

    public function Shift()
    {
        return $this->belongsTo(Shift::class);
    }

}
