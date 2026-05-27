<?php

return [
    'paths' => ['api/*', 'login', 'register'],

    'allowed_methods' => ['*'],

    'allowed_origins' => [
        'https://animika-portfolio.web.app',
        'https://animika-portfolio.firebaseapp.com'
    ],

    'allowed_headers' => ['*'],

    'supports_credentials' => true,
];