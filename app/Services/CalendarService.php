<?php

namespace App\Services;

use App\Interfaces\RepositoryInterface;
use App\Interfaces\ShiftRepositoryInterface;
use App\Models\User;
use Carbon\Carbon;
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

    public function listLeaves($date = null, $userId = null, $view="month")
    {
        if ($date)
            $this->date = Carbon::parse($date,"Asia/Tehran");
        $range = $this->dateRangeProvider($this->date,$view);
        $leaves = $this->fetchData($this->leaveRepository, $range, "started_at", $userId);
        return $this->convertLeavesToEvents($leaves);
    }

    public function listShifts($date = null, $userId = null, $view="month")
    {
        if ($date)
            $this->date = Carbon::parse($date,"Asia/Tehran");
        $range = $this->dateRangeProvider($this->date,$view);
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
            "title" => ($leave->status === "accepted" ? "مرخصی : " : "درخواست مرخصی : ") . __("messages." . $leave->type),
            "start" => Carbon::parse($leave->started_at)->format("Y-m-d H:i:s"),
            "end" => Carbon::parse($leave->ended_at)->format("Y-m-d H:i:s"),
            "id" => "leave-$leave->id",
            "className" => $leave->status == "accepted" ? "leave" : "waiting"
        ])->toArray();
    }

    public function dateRangeProvider($date, $view="month"): array
    {
        $jDate = Jalalian::fromCarbon($date);
        return [$this->getStartVisibleDate($jDate, $view), $this->getEndVisibleDate($jDate, $view)];
    }

    private function getStartVisibleDate(Jalalian $date, $view="month"): string
    {
        return ($view!=="month"?$date->getFirstDayOfWeek():$date->getFirstDayOfMonth())
            ->toCarbon()
            ->format("Y-m-d");
    }

    private function getEndVisibleDate(Jalalian $date, $view="month"): string
    {
        return ($view!=="month"?$date->getNextWeek()->getFirstDayOfWeek():$date->getNextMonth()->getFirstDayOfMonth())
            ->subDay()
            ->toCarbon()
            ->format("Y-m-d");

    }

    private function fetchData(RepositoryInterface $query, $range, $sortField, $userId = null)
    {
        if (!(Gate::allows("viewAny", User::class) && $userId)) {
            $userId = auth()->user()->id;
        }

        return $query->listAll(["filters" => ["date" => $range, "user_id" => $userId, "status" => ["accepted", "waiting"], "active" => true], "sort" => ["field" => $sortField, "sort" => "desc"]]);
    }


}
