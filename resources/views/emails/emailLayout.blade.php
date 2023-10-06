<!DOCTYPE html
    PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" dir="rtl">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
</head>

<body style="margin: 0; padding: 0;direction: rtl">
<table border="0" cellpadding="0" cellspacing="0" width="100%">
    <tr>
        <td>
            <table align="center" border="0" cellpadding="0" cellspacing="0" width="800"
                   style="margin-top: 20px; border-collapse: collapse; border-left: 1px solid #E2E8EF; border-right: 1px solid #E2E8EF; border-top: 6px solid #3D77FF;">
                <tr>
                    <td align="left" valign="top" width="800"
                        style="color: #153643; font-size: 28px; font-weight: bold; font-family: Open Sans, sans-serif;">
                        <img alt="" src="{{$message->embed(public_path("images/logo.png"))}}" height="32"
                             style="margin-right: 30px; margin-top: 20px; margin-bottom: 10px;"/>
                    </td>
                </tr>
                <tr>
                    <td style="padding: 20px 30px; word-break: break-word;" id="content">
                        @yield('content')
                    </td>
                </tr>
            </table>
        </td>
    </tr>
    <tr style="text-align:center">
        <td>
            <table align="center" border="0" cellpadding="0" cellspacing="0" width="800"
                   style="border-collapse: collapse;">
                <tr>
                    <td align="center" valign="bottom" width="800" height="78"
                        style="width:800px; height:78px; background-color: #2C313D;">
                        <table align="center" border="0" cellpadding="0" cellspacing="0" width="800"
                               style="border-collapse: collapse;">
                            <tbody>
                            <tr>
                                <td colspan="2" align="center" width="800" height="78">
                                    <div
                                        style="color: #7D8A99; font-size: 14px; line-height: 30px; font-family: Open Sans, sans-serif;">
                                        <div>©<span id="time">{{\Carbon\Carbon::now()->year}}</span><a
                                                href="{{url("/")}}"> {{config("app.name")}}</a>. All
                                            rights reserved.
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td>
                        <div style="text-align: center; padding-top: 20px; color: #596680; font-size: 14px;">This is an
                            automatically generated email. Please do not reply.
                        </div>
                    </td>
                </tr>
            </table>
        </td>
    </tr>
</table>
</body>

</html>
