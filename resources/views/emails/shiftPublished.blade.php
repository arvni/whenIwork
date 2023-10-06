@extends('emails.emailLayout')
@section('content')
    <table border="0" cellpadding="0" cellspacing="0" width="740"
           style="color: #10131a; font-size: 14px;">
        <tr>
            <td>
                <div
                    style="margin-top: 0px; margin-bottom: 0px; line-height: 2em; font-family: Open Sans, sans-serif;">
                    <div style="font-size: 16px; font-weight: bold; line-height: 2em;">
                        سلام {{$user->name}} ,
                    </div>
                </div>
                <div
                    style="padding: 15px 20px; border: 1px solid #E9EEF2; background-color: #F5F7FA; margin-top: 15px; margin-bottom: 80px; line-height: 32px; font-family: Open Sans, sans-serif;">
                    <div style="color: #10131A; font-size: 14px;">
                        شیفت {{ __("constants.".$shift->type) }} یرای بخش
                        <span
                            style="color: #3D77FF; font-weight: bold;">{{$shift->room->name}}</span>
                        از دپارتمان
                        <span style="color: #3D77FF; font-weight: bold;">{{$shift->room->department->name}}</span>
                        برای تاریخ
                        <span
                            style="color: #3D77FF; font-weight: bold;">{{\Morilog\Jalali\CalendarUtils::convertNumbers(Morilog\Jalali\Jalalian::fromDateTime($shift->date)->format("Y/m/d"))}}</span>
                        از
                        ساعت
                        <span
                            style="color: #3D77FF; font-weight: bold;">{{\Morilog\Jalali\CalendarUtils::convertNumbers($shift->started_at)}}</span>
                        تا ساعت
                        <span
                            style="color: #3D77FF; font-weight: bold;">{{\Morilog\Jalali\CalendarUtils::convertNumbers($shift->ended_at)}}</span>.
                    </div>
                </div>
            </td>
        </tr>
    </table>
@endsection
