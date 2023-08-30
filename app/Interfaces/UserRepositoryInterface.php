<?php


namespace App\Interfaces;


use App\Models\User;

interface UserRepositoryInterface
{
    public function list(array $queryData);

    public function create(array $userData);

    public function findById($id);

    public function show(User $user);


    public function edit(User $user, $userNewData);

    public function delete(User $user);
}
