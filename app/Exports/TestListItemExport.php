<?php

namespace App\Exports;

use App\Models\TestListItem;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;

class TestListItemExport implements FromCollection, WithMapping, WithHeadings
{
    public array $DaysOfTheWeek = ["", "شنبه", "یکشنبه ", "دوشنبه", "سه شنبه", "چهارشنبه", "پنجشنبه", "جمعه"];

    public function headings(): array
    {

        return ["کد کولایف",
            "نام اختصاری تست",
            "نام تست",
            "درصورت تعطیلی ایام هفته",
            "روزهای هفته",
            "روش محاسبه تاریخ جواب",
            "متد انجام تست",
            "کد استاندارد",
            "تعداد روز جواب دهی",
            "نوع نمونه قابل انجام"
        ];
    }

    public function map($row): array
    {
        return [
            $row->testcode,
            $row->Abbr,
            $row->TestName,
            ["اولین روز غیر تعطیل از کل هفته انتخاب شود", "اولین روز غیر تعطیل از روزهای انتخاب شده انتخاب شود", "بدون تاثیر"][$row->MethodType],
            implode(', ', collect(explode(',', $row->DayOfWeek))->map(function ($index) {
                return $this->DaysOfTheWeek[intval($index)];
            })->toArray()),
            $row->MethodDesc,
            $row->MethodName,
            $row->MedicalCode,
            $row->DayAfterAccept,
            $row->SampleTypes,
        ];
    }

    /**
     * @return Collection
     */
    public function collection()
    {
        return TestListItem::where('IsActiveTest', 1)->with('Test')->get();
    }
}
