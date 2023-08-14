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
    public function list(array $queryData);

    public function create(array $data);

    /**
     * @param T $model
     *
     */
    public function show($model);

    /**
     * @param T $model
     * @param array $data
     *
     */
    public function edit( $model, $data);

    /**
     * @param T $model
     *
     *
     */
    public function delete( $model);
}
