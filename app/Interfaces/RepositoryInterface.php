<?php


namespace App\Interfaces;


/**
 * Interface RepositoryInterface
 * @package App\Interfaces
 *
 * @template T
 *
 */
interface RepositoryInterface
{
    public function listAll(array $queryData);

    public function list(array $queryData);

    public function create(array $data);
}
