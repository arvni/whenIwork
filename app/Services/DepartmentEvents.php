<?php

namespace App\Services;

use App\Models\Department;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;

class DepartmentEvents
{

    public function __invoke(Department $department, $defaultDate = null): array
    {
        $date = Carbon::now("Asia/Tehran");
        if ($defaultDate)
            $date = Carbon::parse($defaultDate, "Asia/Tehran");
        $rooms=$department->Rooms()->with(["Shifts" => function ($q) use ($date) {
            $q->active()
                ->whereDate("date", $date)
                ->with(["Works.User:id,name"]);
        }])->get()->toArray();

        return $this->convertShiftToEvents($rooms) ;
    }

    protected function convertShiftToEvents($rooms)
    {
        return array_map(fn($room) => [
            "id" => $room["id"],
            "title" => $room["name"],
            "shifts" => array_map(fn($shift) => [
                "title" => "شیفت " . __("constants." . $shift["type"]) . " : " . implode(", ", array_map(fn($work) => $work["user"]["name"],$shift["works"]??[])),
                "start" => $shift["date"]." ".$shift["started_at"],
                "end" => $shift["date"]." ". $shift['ended_at'],
                "id" => "shift-".$shift["id"],
                "className" => "work"
            ],$room["shifts"]),
        ],$rooms);
    }
}
