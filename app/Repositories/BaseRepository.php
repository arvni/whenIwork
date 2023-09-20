<?php

namespace App\Repositories;

use App\Interfaces\RepositoryInterface;

abstract class BaseRepository implements RepositoryInterface
{

    protected $model;
    protected $query;

    public function __construct($model, $query)
    {
        $this->model = $model;
        $this->query = $query;
    }


    public function list(array $queryData)
    {
        $query = $this->query;
        if (isset($queryData["filters"]))
            $this->applyFilters($query, $queryData["filters"]);
        if (isset($queryData["sort"]))
            $this->applyOrderBy($query, $queryData["sort"]);
        if (isset($queryData["pageSize"]))
            return $this->applyPaginate($query, $queryData["pageSize"]);
        return $query->get();
    }

    public function listAll($queryData)
    {
        $query = $this->applyFilters($this->query, $queryData["filters"]);
        if (isset($queryData["sort"]))
            $this->applyOrderBy($query, $queryData["sort"]);
        return $query->get();
    }

    public function findById($id)
    {
        return $this->model->find($id);
    }

    abstract protected function applyFilters($query, $filters);

    protected function applyOrderBy($query, array $orderBy)
    {
        $query->orderBy($orderBy["field"], $orderBy["sort"]);
    }

    protected function applyPaginate($query, $pageSize)
    {
        return $query->paginate($pageSize);
    }

}
