<?php

return [
    'name' => 'WIW',
    'manifest' => [
        'name' => env('APP_NAME', 'WIW'),
        'short_name' => 'WIW',
        'start_url' => '/',
        'background_color' => '#ffffff',
        'theme_color' => '#00adef',
        'display' => 'standalone',
        'orientation'=> 'any',
        'status_bar'=> 'black',
        'icons' => [
            '72x72' => [
                'path' => '/images/icons/72.png',
                'purpose' => 'any'
            ],
            '96x96' => [
                'path' => '/images/icons/96.png',
                'purpose' => 'any'
            ],
            '128x128' => [
                'path' => '/images/icons/128.png',
                'purpose' => 'any'
            ],
            '144x144' => [
                'path' => '/images/icons/144.png',
                'purpose' => 'any'
            ],
            '152x152' => [
                'path' => '/images/icons/152.png',
                'purpose' => 'any'
            ],
            '192x192' => [
                'path' => '/images/icons/192.png',
                'purpose' => 'any'
            ],
            '384x384' => [
                'path' => '/images/icons/384.png',
                'purpose' => 'any'
            ],
            '512x512' => [
                'path' => '/images/icons/512.png',
                'purpose' => 'any'
            ],
        ],
        'splash' => [
            '640x1136' => '/images/icons/640_1136.png',
            '750x1334' => '/images/icons/750_1334.png',
            '828x1792' => '/images/icons/828_1792.png',
            '1125x2436' => '/images/icons/1125_2436.png',
            '1242x2208' => '/images/icons/1242_2208.png',
            '1242x2688' => '/images/icons/1242_2688.png',
            '1536x2048' => '/images/icons/1536_2048.png',
            '1668x2224' => '/images/icons/1668_2224.png',
            '1668x2388' => '/images/icons/1668_2388.png',
            '2048x2732' => '/images/icons/2048_2732.png',
        ],
        'shortcuts' => [
            [
                'name' => 'Dashboard',
                'description' => 'Dashboard',
                'url' => '/dashboard',
                'icons' => [
                    "src" => "/images/icons/72.png",
                    "purpose" => "any"
                ]
            ],
            [
                'name' => 'Shifts',
                'description' => 'Shifts',
                'url' => '/shifts'
            ]
        ],
        'custom' => []
    ]
];
