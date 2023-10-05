<?php

namespace App\Services;

use App\Interfaces\LeaveRepositoryInterface;
use App\Interfaces\ShiftRepositoryInterface;
use Carbon\Carbon;
use Morilog\Jalali\Jalalian;

class CalculateUserHours
{

    private Carbon $date;

    private LeaveRepositoryInterface $leaveRepository;
    private ShiftRepositoryInterface $shiftRepository;

    public function __construct(
        LeaveRepositoryInterface $leaveRepository,
        ShiftRepositoryInterface $shiftRepository)
    {
        $this->leaveRepository = $leaveRepository;
        $this->shiftRepository = $shiftRepository;
        $this->date = Carbon::now();
    }

    public function calculateSumOfShiftsHours($user_id, $date = null)
    {
        $shifts = $this->shiftRepository->listAll(["filters" => ["date" => $this->dateRangeProvider($this->convertDateTimeStringToCarbon($date)), "user_id" => $user_id,"active"=>true]]);
        return $this->sumShifts($shifts);
    }

    private function sumShifts($shifts)
    {
        $sum = 0;
        foreach ($shifts as $shift) {
            $sum += $this->convertDateTimeStringToCarbon("$shift->date $shift->ended_at")->diffInMinutes($this->convertDateTimeStringToCarbon("$shift->date $shift->started_at"));
        }
        return $sum;
    }

    public function calculateSumOfLeavesHours($user_id, $date = null)
    {
        $leaves = $this->leaveRepository->listAll(["filters" => ["date" => $this->dateRangeProvider($this->convertDateTimeStringToCarbon($date)), "user_id" => $user_id, "status" => ["accepted"]]]);
        return $this->sumLeaves($leaves);
    }


    private function sumLeaves($leaves)
    {
        $sum = 0;
        foreach ($leaves as $leave) {
            $sum += $this->convertDateTimeStringToCarbon($leave->ended_at)->diffInMinutes($this->convertDateTimeStringToCarbon($leave->started_at));
        }
        return $sum;
    }


    private function convertDateTimeStringToCarbon($dateTime)
    {
        return Carbon::parse($dateTime);
    }

    public function dateRangeProvider($date): array
    {
        $jDate = Jalalian::fromCarbon($date);
        return [$this->getStartVisibleDate($jDate), $this->getEndVisibleDate($jDate)];
    }

    private function getStartVisibleDate(Jalalian $date): string
    {
        return $date->getFirstDayOfMonth()
            ->toCarbon()
            ->format("Y-m-d");
    }

    private function getEndVisibleDate(Jalalian $date): string
    {
        return $date->getNextMonth()
            ->getFirstDayOfMonth()
            ->subDay()
            ->toCarbon()
            ->format("Y-m-d");

    }
}
