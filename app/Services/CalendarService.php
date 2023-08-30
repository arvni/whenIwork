<?php

namespace App\Services;

use App\Interfaces\RepositoryInterface;
use App\Interfaces\ShiftRepositoryInterface;
use App\Repositories\BaseRepository;
use Carbon\Carbon;
use Illuminate\Support\Collection;
use Morilog\Jalali\Jalalian;

use App\Interfaces\WorkRepositoryInterface;
use App\Interfaces\LeaveRepositoryInterface;

class CalendarService
{

    private Carbon $date;

    private WorkRepositoryInterface $workRepository;
    private LeaveRepositoryInterface $leaveRepository;
    private ShiftRepositoryInterface $shiftRepository;

    public function __construct(WorkRepositoryInterface $workRepository, LeaveRepositoryInterface $leaveRepository, ShiftRepositoryInterface $shiftRepository)
    {
        $this->workRepository = $workRepository;
        $this->leaveRepository = $leaveRepository;
        $this->shiftRepository = $shiftRepository;
        $this->date = Carbon::now();
    }

    public function listLeaves($date = null)
    {
        if ($date)
            $this->date = Carbon::parse($date);
        $range = $this->dateRangeProvider($this->date);
        return $this->fetchData($this->leaveRepository, $range, "startedAt");
    }

    public function listWorks($date = null)
    {
        if ($date)
            $this->date = Carbon::parse($date);
        $range = $this->dateRangeProvider($this->date);


    }

    public function listShifts($date = null)
    {
        if ($date)
            $this->date = Carbon::parse($date);
        $range = $this->dateRangeProvider($this->date);
        $shifts = $this->fetchData($this->shiftRepository, $range, "date");
        return $this->convertShiftToEvents($shifts);

    }

    protected function convertShiftToEvents($shifts)
    {
        return $shifts->map(fn($shift) => [
            "title" => "شیفت : بخش " . $shift->room->name,
            "start" => "$shift->date $shift->started_at",
            "end" => "$shift->date $shift->ended_at",
            "id" => "shift-$shift->id",
            "resources"=>["style"=>["background"=>"#f54df3"]]
        ])->toArray();
    }

    protected function convertLeavesToEvents()
    {

    }

    public function dateRangeProvider($date): array
    {
        $jDate = Jalalian::fromCarbon($date);
        return [$this->getStartVisibleDate($jDate), $this->getEndVisibleDate($jDate)];
    }

    private function getStartVisibleDate(Jalalian $date): string
    {
        return $date->subDays($date->getDay() - 1)
            ->getFirstDayOfWeek()
            ->toCarbon()
            ->format("Y-m-d");
    }

    private function getEndVisibleDate(Jalalian $date): string
    {
        return $date->getNextMonth()
            ->getFirstDayOfMonth()
            ->addDays(6)
            ->getFirstDayOfWeek()
            ->subDay()->toCarbon()
            ->format("Y-m-d");
    }

    private function fetchData(RepositoryInterface $query, $range, $sortField)
    {
        return $query->listAll(["filters" => ["date" => $range], "sort" => ["field" => $sortField, "sort" => "desc"]]);
    }


}
