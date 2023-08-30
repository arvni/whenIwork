<?php

namespace App\Repositories;

use App\Interfaces\UserRepositoryInterface;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserRepository extends BaseRepository implements UserRepositoryInterface
{

    private User $user;

    public function __construct(User $user)
    {
        $this->user = $user;
        parent::__construct($user, User::query()->with("roles"));
    }

    public function create(array $userData)
    {
        $user = new $this->user([
            ...$userData,
            "password" => Hash::make($userData["password"])
        ]);
        $user->save();
        $user->syncRoles(collect($userData["roles"])->pluck("id")->toArray());

        return $user;
    }

    public function show(User $user)
    {
        return $user->load("roles");
    }

    public function edit(User $user, $userNewData)
    {
        $user->update($userNewData);
        $user->syncRoles(collect($userNewData["roles"])->pluck("id")->toArray());
    }

    public function delete(User $user)
    {
        // TODO: Implement delete() method.
    }

    protected function applyFilters($query, $filters)
    {
        if (isset($filters["search"])) {
            $query->where("name", "like", "%" . $filters["search"] . "%")
                ->orWhere("userId", "like", "%" . $filters["search"] . "%");
        }
        if (isset($filters["role"]) && $filters["role"])
            $query->role($filters["role"]["id"]);
        return $query;
    }

    protected function applyOrderBy($query, $orderBy)
    {
        return $query->orderBy($orderBy["field"], $orderBy["sort"]);
    }

    protected function applyPaginate($query, $pageSize)
    {
        return $query->paginate($pageSize);
    }
}
