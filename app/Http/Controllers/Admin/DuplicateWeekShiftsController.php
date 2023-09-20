<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Interfaces\RoomRepositoryInterface;
use App\Models\Room;
use Carbon\Carbon;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class DuplicateWeekShiftsController extends Controller
{
    protected RoomRepositoryInterface $roomRepository;

    public function __construct(RoomRepositoryInterface $roomRepository)
    {
        $this->roomRepository = $roomRepository;
    }

    /**
     * Handle the incoming request.
     *
     * @param Room $room
     * @param Request $request
     * @return RedirectResponse
     * @throws AuthorizationException
     */
    public function __invoke(Room $room, Request $request)
    {
        $this->authorize("view", $room);
        $request->validate([
            "date" => [
                "required",
                "array",
                function ($attribute, $value, $fail) use ($room, $request) {
                    list($from, $to) = $value;
                    if (Carbon::parse($from, "Asia/Tehran")->lessThan(Carbon::now("Asia/Tehran")))
                        $fail("تاریخ انتخابی مربوط به گذشته میباشد");
                    if ($this->roomRepository->countShifts($room, ["filters" => ["date" => $value]])) {
                        $fail("در هفته انتخابی شیفت ثبت شده");
                    }
                    if (Carbon::parse($from, "Asia/Tehran")->format("Y-m-d") !== $from || Carbon::parse($to, "Asia/Tehran")->format("Y-m-d") !== $to) {
                        $fail("فرمت تاریخ های انتخابی اشتباه است");
                    }
                }]
        ]);

        $this->roomRepository->duplicateShifts($room, $request->get("date"));

        return $this->responseWithSuccess("شیفت ها با موفقیت ثبت شد لطفا برای نمایش شیفت ها اقدام کنید");
    }
}
