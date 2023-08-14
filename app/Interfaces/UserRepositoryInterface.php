<?php


namespace App\Interfaces;


use App\Models\User;

interface UserRepositoryInterface
{
    public function list(array $queryData);

    public function create(array $userData);

    public function show(User $user);

    public function edit(User $user, $userNewData);

    //public function updatePassword(User $user, string $password);

    public function delete(User $user);
}
