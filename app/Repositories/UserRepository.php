<?php

namespace App\Repositories;

use App\Interfaces\UserRepositoryInterface;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserRepository implements UserRepositoryInterface
{

    private User $user;

    public function __construct(User $user)
    {
        $this->user = $user;
    }

    public function list(array $queryData)
    {
        $query = $this->user->with("Roles");
        $this->applyFilters($query, $queryData["filters"]);
        $this->applyOrderBy($query, $queryData["orderBy"]);
        return $this->applyPaginate($query, $queryData["pageSize"]);
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
        $user->syncRoles($userNewData["role"]["id"]);
    }

    public function delete(User $user)
    {
        // TODO: Implement delete() method.
    }

    private function applyFilters($query, $filters)
    {
        if (isset($filters["search"])) {
            $query->where("name", "like", "%" . $filters["search"] . "%")
                ->orWhere("userId", "like", "%" . $filters["search"] . "%");
        }
        if (isset($filters["role"]) && $filters["role"])
            $query->role($filters["role"]["id"]);
    }

    private function applyOrderBy($query, $orderBy)
    {
        $query->orderBy($orderBy["field"], $orderBy["sort"]);
    }

    private function applyPaginate($query, $pageSize)
    {
        return $query->paginate($pageSize);
    }
}
