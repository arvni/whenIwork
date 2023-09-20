<?php

namespace App\Services;

use App\Interfaces\RepositoryInterface;
use App\Interfaces\ShiftRepositoryInterface;
use App\Models\User;
use App\Repositories\BaseRepository;
use Carbon\Carbon;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Gate;
use Morilog\Jalali\Jalalian;

use App\Interfaces\WorkRepositoryInterface;
use App\Interfaces\LeaveRepositoryInterface;

class CalendarService
{

    private Carbon $date;

    private WorkRepositoryInterface $workRepository;
    private LeaveRepositoryInterface $leaveRepository;
    private ShiftRepositoryInterface $shiftRepository;

    public function __construct(
        WorkRepositoryInterface $workRepository,
        LeaveRepositoryInterface $leaveRepository,
        ShiftRepositoryInterface $shiftRepository)
    {
        $this->workRepository = $workRepository;
        $this->leaveRepository = $leaveRepository;
        $this->shiftRepository = $shiftRepository;
        $this->date = Carbon::now();
    }

    public function listLeaves($date = null, $userId = null)
    {
        if ($date)
            $this->date = Carbon::parse($date);
        $range = $this->dateRangeProvider($this->date);
        $leaves = $this->fetchData($this->leaveRepository, $range, "started_at", $userId);
        return $this->convertLeavesToEvents($leaves);
    }

    public function listShifts($date = null, $userId = null)
    {
        if ($date)
            $this->date = Carbon::parse($date);
        $range = $this->dateRangeProvider($this->date);
        $shifts = $this->fetchData($this->shiftRepository, $range, "date", $userId);
        return $this->convertShiftToEvents($shifts);

    }

    protected function convertShiftToEvents($shifts)
    {
        return $shifts->map(fn($shift) => [
            "title" => "شیفت : بخش " . $shift->room->name,
            "start" => "$shift->date $shift->started_at",
            "end" => "$shift->date $shift->ended_at",
            "id" => "shift-$shift->id",
            "className" => "work"
        ])->toArray();
    }

    protected function convertLeavesToEvents($leaves)
    {
        return $leaves->map(fn($leave) => [
            "title" => "مرخصی : " . __("messages." . $leave->type),
            "start" => Carbon::parse($leave->started_at, "Asia/Tehran")->addMinutes(30)->format("Y-m-d H:i:s"),
            "end" => Carbon::parse($leave->ended_at, "Asia/Tehran")->addMinutes(30)->format("Y-m-d H:i:s"),
            "id" => "leave-$leave->id",
            "className" => $leave->status == "accepted" ? "leave" : "waiting"
        ])->toArray();
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

    private function fetchData(RepositoryInterface $query, $range, $sortField, $userId = null)
    {
        if (!(Gate::allows("viewAny", User::class) && $userId)) {
            $userId = auth()->user()->id;
        }

        return $query->listAll(["filters" => ["date" => $range, "user_id" => $userId, "status" => ["accepted", "waiting"]], "sort" => ["field" => $sortField, "sort" => "desc"]]);
    }


}
