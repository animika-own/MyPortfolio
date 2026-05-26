<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});
require __DIR__ . '/api.php';

Route::get('/run-migrations', function () {
    try {
        \Artisan::call('migrate', ['--force' => true]);
        return "Database migrations ran successfully!<br><pre>" . \Artisan::output() . "</pre>";
    } catch (\Exception $e) {
        return "Error running migrations: " . $e->getMessage();
    }
});