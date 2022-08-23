<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        {{-- test --}}
        <title inertia>{{ config('app.name', 'Laravel') }}</title>
        <link href="{{ secure_asset('/css/app.css') }}" rel="stylesheet" />
        <script src="{{ secure_asset('/js/app.js') }}" defer></script>
        @routes
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap">
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>
