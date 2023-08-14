<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <style>
        @font-face {
            font-family: 'B Nazanin';
            src: local('B Nazanin'),
            local('BNazanin'),
            url("{{ asset('fonts/BNazanin/BNazanin.woff2') }}") format('woff2'),
            url("{{ asset('fonts/BNazanin/BNazanin.woff')}}") format('woff'),
            url("{{ asset('fonts/BNazanin/BNazanin.ttf')}}") format('truetype');
            font-weight: 400;
            font-stretch: normal;
            /*font-style: normal;*/
        }

        @font-face {
            font-family: 'B Nazanin';
            src: local('B Nazanin Bold'),
            local('BNazanin-Bold'),
            url("{{ asset('fonts/BNazanin/BNaznnBd.woff2')}}") format('woff2'),
            url("{{ asset('fonts/BNazanin/BNaznnBd.woff')}}") format('woff'),
            url("{{ asset('fonts/BNazanin/BNaznnBd.ttf')}}") format('truetype');
            font-weight: 700;
            font-stretch: normal;
        }

        body {
            font-family: "B Nazanin", sans-serif;
            max-width: 280mm;
            margin-left: auto;
            margin-right: auto;
        }

        @media print {
            .no-print {
                display: none;
            }

            body {
                max-width: 280mm;
                padding: 3mm;
            }

            tfoot > tr > td, tfoot > tr > th, tbody > tr:last-child > th {
                border: none !important;
            }

            tbody > tr:last-child > th {
                text-align: right;
            }

            @page {
                size: landscape A4;
                margin: 30mm 10mm;
            }
        }

        .table-row > td {
            text-align: center;
        }

        tbody > tr:first-child > td {
            border-top: solid 1mm;
        }

        .table-row > td:first-child, .table-row > th:first-child, .table-header-row > th:first-child, tr > td:first-child {
            border-right: solid 1mm;
        }

        tr > td, tr > th:not(:first-child) {
            border-left: solid 1mm;
        }

        .table-row > td, tr > td {
            text-align: center;
            border-bottom: solid 0.5mm;
        }

        .table-header-row > th {
            text-align: center;
            margin-bottom: 10mm;
            border-bottom: solid 1mm;
        }

        .table-header-row > th:not(:last-child) {
            border-left: solid 1mm;
        }

        .table {
            max-width: 100%;
            margin-left: auto;
            margin-right: auto;
        }

        .no-border {
            border: none !important;
        }

        .full-border {
            border: solid 1px;
        }

        .header-bordered-box {
            width: 24%;
            margin: 1mm;
            height: 8mm
        }

        .header-items {
            display: flex;
            align-items: center;
            justify-content: space-between;
            align-content: center;
        }

        .header-items-row {
            display: flex;
            width: 100%;
            justify-content: space-between;
            height: 10mm;
        }

        thead > tr > th {
            padding-bottom: 5mm;
        }

        .table-row > th:last-child {
            border-left: solid 1mm;
        }
    </style>
</head>
<body>
<button class="no-print" onclick="window.close()" title="برگشت">برگشت</button>
<button class="no-print" onclick="window.print()" title="پرینت">پرینت</button>
<div class="table">
    <table style="border-collapse: collapse;direction: rtl; width: 100%;">
        <thead>
        <tr>
            <th colspan="12">
                <table dir="rtl" style="text-align:center; width:100%; margin-top:10mm">
                    <tr style="display: flex;align-items: center;}">
                        <td class="no-border" style="flex-grow: 4"><img src="/images/logo.png" alt=""
                                                                        style="width: 20mm;margin-right:auto;margin-left: auto">
                        </td>
                        <th class="no-border" style="flex-grow: 8;">
                            <h3 class="full-border" style="margin: auto">صورت حساب فروش کالا و خدمات</h3>
                        </th>
                        <td style="flex-grow: 6; max-width: 90mm;" class="no-border">
                            <div style="width: 100%; height: 20mm">
                                <div style="width: 100%; display: inline-flex">
                                    <div class="full-border header-bordered-box">
                                        <strong>نوع مشتری :</strong>
                                    </div>
                                    <div class="full-border header-bordered-box">
                                        <strong>{{$invoice->InvoiceSalesType}}</strong>
                                    </div>
                                    <div class="full-border header-bordered-box">
                                        <strong>شماره فاکتور :</strong>
                                    </div>
                                    <div class="full-border header-bordered-box">
                                        <strong>{{ $invoice->InvoiceNumber }}</strong>
                                    </div>
                                </div>
                                <div style="width: 100%; display: inline-flex">
                                    <div class="full-border header-bordered-box">

                                    </div>
                                    <div class="full-border header-bordered-box">

                                    </div>
                                    <div class="full-border header-bordered-box">
                                        <strong>تاریخ فاکتور :</strong>
                                    </div>
                                    <div class="full-border header-bordered-box">
                                        <strong>
                                            {{ \Morilog\Jalali\Jalalian::fromDateTime($invoice->InvoiceDate)->format("Y/m/d") }}
                                        </strong>
                                    </div>
                                </div>
                            </div>
                        </td>
                    </tr>
                </table>
            </th>
        </tr>
        </thead>
        <tbody>
        <tr>
            <td colspan="12">
                <table style="width: 100%; direction: rtl;">
                    <tr>
                        <td colspan="3" class="no-border"><b>مشخصات فروشنده</b></td>
                    </tr>
                </table>
            </td>
        </tr>
        <tr>
            <td colspan="12">
                <table style="width: 100%; direction: rtl;">
                    <tr class="header-items-row">
                        <td class="no-border header-items">
                            <strong>نام شخص حقیقی/حقوقی : </strong>
                            <span>{{ $sellerInformation["value"]["name"]["value"] }}</span>
                        </td>
                        <td class="no-border header-items">
                            <strong>شماره اقتصادی : </strong>
                            <span style="display: inline-flex">
                                @foreach(array_reverse(str_split( $sellerInformation["value"]["economicNumber"]["value"])) as $letter)
                                    <h4 class="full-border" style="width: 5mm">{{ $letter }}</h4>
                                @endforeach
                </span>
                        </td>
                        <td class="no-border header-items">
                            <strong>شناسه ملی :</strong>
                            <span style="display: inline-flex">
                                 @foreach(array_reverse(str_split( $sellerInformation["value"]["nationalID"]["value"])) as $letter)
                                    <h4 class="full-border" style="width: 5mm">{{ $letter }}</h4>
                                @endforeach
                            </span>
                        </td>
                    </tr>
                    <tr class="header-items-row">
                        <td class="no-border header-items">
                            <strong>نشانی: </strong>
                            <small>{!! $sellerInformation["value"]["address"]["value"] !!}</small>
                        </td>
                        <td class="no-border header-items">
                            <div style="display:flex; align-items: center; justify-content: space-between">
                                <span style="margin-left: 5mm">
                                    <strong>شماره تلفن :</strong>{{ $sellerInformation["value"]["phone"]["value"] }}
                                </span>
                                <span>
                                    <strong>شماره ثبت :</strong>{{ $sellerInformation["value"]["registerNumber"]["value"] }}
                                </span>
                            </div>
                        </td>
                        <td class="no-border header-items">
                            <span><strong>کدپستی :</strong>
                            <span style="display: inline-flex">
                                @foreach(array_reverse(str_split( $sellerInformation["value"]["postalCode"]["value"])) as $letter)
                                    <h4 class="full-border" style="width: 5mm">{{ $letter }}</h4>
                                @endforeach
                            </span>
                            </span>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        <tr>
            <td colspan="12">
                <table style="width: 100%; direction: rtl; ">
                    <tr>
                        <td colspan="3" class="no-border"><b>مشخصات خریدار</b></td>
                    </tr>
                </table>
            </td>
        </tr>
        <tr>
            <td colspan="12">
                <table style="width: 100%; direction: rtl;">
                    <tr class="header-items-row">
                        <td class="no-border header-items">
                            <strong>نام شخص حقیقی/حقوقی : </strong> <span>{{ $invoice->InvoiceCustomerName }}</span>
                        </td>
                        <td class="no-border header-items">
                            <strong>شماره اقتصادی : </strong>
                            <span style="display: inline-flex">
                    @if($invoice->InvoiceCustomerEconomicCode)
                                    @foreach(array_reverse(str_split($invoice->InvoiceCustomerEconomicCode)) as $letter)
                                        <h4 class="full-border" style="width: 5mm">{{$letter}}</h4>
                                    @endforeach
                                @endif
                </span>
                        </td>
                        <td class="no-border header-items">
                            <strong>شناسه ملی :</strong>
                            <span style="display: inline-flex">
                    @if($invoice->InvoiceCustomerNatinalOrRegistrationCode)
                                    @foreach(str_split($invoice->InvoiceCustomerNatinalOrRegistrationCode) as $letter)
                                        <h4 class="full-border" style="width: 5mm">{{$letter}}</h4>
                                    @endforeach
                                @endif
                </span>
                        </td>
                    </tr>
                    <tr class="header-items-row">
                        <td class="no-border header-items">
                            <strong>نشانی: </strong> <small
                                style="max-width: 100mm;">{{$invoice->InvoiceCustomerAddress}}</small>
                        </td>
                        <td class="no-border header-items">
                            <div style="display:flex; align-items: center; justify-content: space-around">
                                <span style="margin-left: 5mm">
                                    <strong>شماره تلفن :</strong>{{$invoice->InvoiceCustomerPhoneNumber}}
                                </span>
                                <span>
                                    <strong>شماره ثبت :</strong>
                                    {{$invoice->InvoiceCustomerNatinalOrRegistrationCode}}
                                </span>
                            </div>
                        </td>
                        <td class="no-border header-items">
                            <strong>کدپستی :</strong>
                            <span style="display: inline-flex">
                     @if($invoice->InvoiceCustomerPostalCode)
                                    @foreach(array_reverse(str_split($invoice->InvoiceCustomerPostalCode)) as $letter)
                                        <h4 class="full-border" style="width: 5mm">{{$letter}}</h4>
                                    @endforeach
                                @endif
                </span>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        <tr class="table-header-row">
            <th>
                ردیف
            </th>
            <th>
                کد کالا
            </th>
            <th>
                شرح کالا/خدمات
            </th>
            <th>
                تعداد
            </th>
            <th>
                واحد
            </th>
            <th>
                مبلغ واحد
            </th>
            <th>
                مبلغ کل
            </th>
            <th>
                مبلغ تخفیف
            </th>
            <th>
                مبلغ پس از تخفیف
            </th>
            <th>مالیات</th>
            <th>عوارض</th>
            <th>جمع مبلغ کل</th>
        </tr>
        @php
            $invoiceItems=$invoice->InvoiceItems()->get();
        @endphp
        @php
            function convertNumber($number){
                return \Morilog\Jalali\CalendarUtils::convertNumbers(intval($number));
            }
            function convertPrice($number){
                return \Morilog\Jalali\CalendarUtils::convertNumbers((number_format(intval($number),0,"",",")));
            }

            function sum(Illuminate\Database\Eloquent\Collection $array,string $field){
                return array_sum($array->map(function($item)use ($field){ return intval($item[$field]);})->toArray());
            }
        @endphp
        @foreach($invoiceItems as $invoiceItem)
            <tr class="table-row">
                <td>{{convertNumber($invoiceItem->InvoiceItemRowNumber)}}</td>
                <td>{{convertNumber($invoiceItem->InvoiceItemProductNumber)}}</td>
                <td>{{$invoiceItem->InvoiceItemProductName}}</td>
                <td>{{convertPrice($invoiceItem->InvoiceItemQuantity)}}</td>
                <td>{{$invoiceItem->InvoiceItemUnitName}}</td>
                <td>{{convertPrice($invoiceItem->InvoiceItemFee-($invoiceItem->InvoiceItemReductionAmount/$invoiceItem->InvoiceItemQuantity))}}</td>
                <td>{{convertPrice($invoiceItem->InvoiceItemPrice-$invoiceItem->InvoiceItemReductionAmount)}}</td>
                <td>0</td>
                <td>{{convertPrice($invoiceItem->InvoiceItemPriceAfterDiscount-$invoiceItem->InvoiceItemReductionAmount)}}</td>
                <td>{{convertPrice($invoiceItem->InvoiceItemPolicyTaxes)}}</td>
                <td>{{convertPrice($invoiceItem->InvoiceItemPolicyAddionals)}}</td>
                <td>{{convertPrice($invoiceItem->InvoiceItemTotalPrice-$invoiceItem->InvoiceItemReductionAmount)}}</td>
            </tr>
        @endforeach

        <tr class="table-row">
            <td colspan="6"><strong>جمع</strong></td>
            <td>{{ convertPrice(sum($invoiceItems,"InvoiceItemPrice")-sum($invoiceItems,"InvoiceItemReductionAmount")) }}</td>
            <td>{{ convertPrice(0) }}</td>
            <td>{{ convertPrice(sum($invoiceItems,"InvoiceItemPriceAfterDiscount")-sum($invoiceItems,"InvoiceItemReductionAmount")) }}</td>
            <td>{{ convertPrice(sum($invoiceItems,"InvoiceItemPolicyTaxes")) }}</td>
            <td>{{ convertPrice(sum($invoiceItems,"InvoiceItemPolicyAddionals")) }}</td>
            <td>{{ convertPrice(sum($invoiceItems,"InvoiceItemTotalPrice")-sum($invoiceItems,"InvoiceItemReductionAmount"))}}</td>
        </tr>
        <tr class="table-row">
            <th colspan="12">
                {{(new \App\Helper\Number2Word())->numberToWords(sum($invoiceItems,"InvoiceItemTotalPrice")-sum($invoiceItems,"InvoiceItemReductionAmount"))." ریال"}}
            </th>
        </tr>
        </tbody>
        <tfoot>
        <tr class="table-row">
            <td colspan="12" style="padding-top:10mm">
            </td>
        </tr>
        </tfoot>
    </table>
</div>
<div style="display: inline-flex;justify-content: space-around; width: 100%; margin-top: 20mm">
    <div>
        <strong>مهر و امضای خریدار</strong>
    </div>
    <div>
        <strong>مهر و امضا فروشنده</strong>
        <img src="{{route("files.download",$financialStamp["value"]["image"]["value"]["id"])}}" width="100mm"
             style="position: absolute;transform: rotate(45deg);margin-left: -10mm;margin-top: -10mm;" alt="">
    </div>
</div>
<div
    style="direction: rtl;float: left;text-align: justify;margin-top: 10mm ">{!! $invoiceFootnote["value"]["footnote"]["value"] !!}</div>
<script>
    window.print();
</script>
</body>
</html>
