<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" dir="rtl">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title >{{ config('app.name', 'Laravel') }}</title>
    @laravelPWA
    <!-- Fonts -->
    <link rel="stylesheet" href="https://fonts.bunny.net/css2?family=Nunito:wght@400;600;700&display=swap">
</head>
<body class="font-sans antialiased">
<h1>You are currently not connected to any networks.</h1>
</body>
</html>
