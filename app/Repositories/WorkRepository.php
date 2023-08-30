<?php

namespace App\Repositories;

use App\Interfaces\UserRepositoryInterface;
use App\Interfaces\WorkRepositoryInterface;
use App\Models\Work;
use Carbon\Carbon;


class WorkRepository extends BaseRepository implements WorkRepositoryInterface
{
    protected UserRepositoryInterface $userRepository;

    public function __construct(Work $work, UserRepositoryInterface $userRepository)
    {
        parent::__construct($work, Work::query());
        $this->userRepository = $userRepository;
    }


    public function listAll($queryData)
    {
        $this->query = $this->getQuery($queryData["user_id"])
            ->accepted()
            ->with(["Shift.Room.Department:name,id"]);
        $this->applyFilters($this->query, $queryData);
        $this->applyOrderBy($this->query, $queryData["sort"]);
        return $this->query->get();
    }

    public function create(array $data)
    {
        $work = new $this->model($data);
        $work->Shift()->associate($data["shift_id"]);
        $work->User()->associate($data["user_id"]);
        $work->save();
        return $work;

    }

    public function show(Work $work)
    {
        $work->load(["Room" => function ($q) {
            $q->select(["id", "name"]);
        }, "Attendances" => function ($q) {
            $q->with(["attendable" => function ($query) {
                $query->select("name", "id");
            }]);
        }]);
        return $work;
    }

    public function edit(Work $work, $workNewData)
    {
        $work->Room()->associate($workNewData["room"]["id"]);
        $work->update($workNewData);
        return $work;
    }

    public function delete(Work $work): bool
    {
        if ($work->Works()->started()->count() < 1) {
            return $work->Works()->delete() && $work->delete();
        }
        return false;
    }

    public function requestsList(Work $work, array $queryData)
    {
        $query = $work->ClientRequests();
        $this->applyFilters($query, $queryData["filters"]);
        $this->applyOrderBy($query, $queryData["sort"] ?? ["field" => "id", "sort" => "asc"]);
        $works = $query->get();
        return $this->prepareRequests($works, $queryData["filters"]["date"]);
    }

    protected function applyFilters($query, $filters)
    {
        if (isset($filters["date"])) {
            $query->whereBetween("date", $filters["date"]);
        }
        if (isset($filters["type"])) {
            $query->where("type", $filters["type"]);
        }
        return $query;
    }

    public function findById($id)
    {
        return $this->query->find($id);
    }

    private function getQuery($id)
    {
        if ($id)
            $user = $this->userRepository->findById($id);
        else
            $user = auth()->user();
        return $user->Works();
    }

    public function changeUser(Work $work, $userId)
    {
        $work->User()->associate($userId);
        $work->changed = true;
        $work->save();
    }
}
