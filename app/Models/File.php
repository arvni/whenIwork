<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class File extends Model
{
    use HasFactory;
    protected $primaryKey = "hash";
    protected $keyType = "uuid";
    public $incrementing = false;
    protected $fillable=[
        'hash',
        'ext',
        'related_id',
        'related_type',
        'tag',
        "originalName"
    ];


    protected $appends=[
        'path',
        'file_name',
        'address'
    ];

    public function getPathAttribute(): string
    {
        return 'app/'.implode('/',explode('\\',$this->attributes['related_type'])).'/'.
            $this->attributes['related_id'].'/'.
            $this->attributes['tag'].'/'.
            $this->attributes['hash'].'.'.
            $this->attributes['ext'];
    }

    public function getFileNameAttribute(): string
    {
        return $this->attributes['hash'].'.'.$this->attributes['ext'];
    }

    public function getAddressAttribute(): string
    {
        return implode('/',explode('\\',$this->attributes['related_type'])).'/'.$this->attributes['related_id'].'/'.$this->attributes['tag'];
    }

    public function related(): MorphTo
    {
        return $this->morphTo();
    }
}
