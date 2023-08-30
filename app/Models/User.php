<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, HasRoles;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'userId',
        'mobileNo',
        'email',
        'consent',
        'avatar',
        'password',
        "isActive"
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'mobile_verified_at' => 'datetime',
    ];

    public function ReceivedMessages()
    {
        return $this->belongsToMany(Message::class, "message_user", "user_id")->withPivot("read_at");
    }

    public function SentMessages(): HasMany
    {
        return $this->hasMany(Message::class, "sender");
    }

    public function Documents()
    {
        return $this->morphMany(File::class, "related");
    }

    public function Attendances()
    {
        return $this->morphMany(Attendance::class, "attendable");
    }

    public function ClientRequests()
    {
        return $this->hasMany(ClientRequest::class);
    }

    public function Works()
    {
        return $this->hasMany(Work::class);
    }

    public function Shifts()
    {
        return $this->belongsToMany(Shift::class,"works")->withPivot("accepted")->wherePivot("accepted",true);
    }


    public function Leaves()
    {
        return $this->hasMany(Leave::class);
    }

    public function AcceptedLeaves()
    {
        return $this->hasMany(Leave::class, "acceptor_id");
    }

    public function scopeSearch($query, $search)
    {
        return $query->where(function ($q) use ($search) {
            $q->where("name", "like", "%$search%")->orWhere("userId", "like", "%$search%");
        });
    }

    public function RevisableClientRequests()
    {
        return $this->morphMany(ClientRequest::class, "revisable_by");
    }

    public function Role()
    {

    }

}
