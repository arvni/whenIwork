<?php

namespace App\Console\Commands;

use App\Models\Shift;
use App\Notifications\ShiftPublished;
use App\Notifications\TomorrowShifts;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Notification;


class RunDailyFunction extends Command
{
    // The name and signature of the command
    protected $signature = 'daily:function';

    // The command description
    protected $description = 'Run a function every day at 10 AM Tehran time';

    // The function logic to execute
    public function handle()
    {
        // Add your function logic here
        \Log::info('Daily function executed at 10 AM Tehran time.');
        $tomorrowShifts=Shift::query()
            ->whereDate("date",Carbon::now("Asia/Tehran")->addDay()->toDate())
            ->withCount("Users")
            ->with("Users","Room:name,id")
            ->having("users_count",'>',0)
            ->get();
        if (count($tomorrowShifts)){
            foreach ($tomorrowShifts as $shift){
                Notification::send($shift->Users, new TomorrowShifts($shift));
            }
        }
    }
}
