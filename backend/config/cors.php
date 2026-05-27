<?php

return [
    'paths' => ['api/*', 'sanctum/csrf-cookie'],

    'allowed_methods' => ['*'],

    'allowed_origins' => [
        'https://animika-portfolio.web.app',
    ],

    'allowed_headers' => ['*'],

    'supports_credentials' => true,
];