<?php

use App\Http\Controllers\AboutController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CertificationController;
use App\Http\Controllers\EducationController;
use App\Http\Controllers\PersonalDetailController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\ResumeController;
use App\Http\Controllers\SkillController;
use App\Http\Controllers\TrainingController;
use App\Http\Controllers\WorkExperienceController;

Route::middleware('auth:sanctum')->group(function () {
    // |---------------------------------
    // Skills
    // ----------------------------------|

    Route::get('/skills', [SkillController::class, 'index']);
    Route::post('/skills', [SkillController::class, 'store']);


    // |---------------------------------
    // WorkExperience
    // ----------------------------------|

    Route::get('/work-experience', [WorkExperienceController::class, 'index']);
    Route::post('/work-experience', [WorkExperienceController::class, 'store']);
    Route::put('/work-experience/{id}', [WorkExperienceController::class, 'update']);
    Route::delete('/work-experience/{id}', [WorkExperienceController::class, 'destroy']);

    // |---------------------------------
    // Education
    // ----------------------------------|

    Route::get('/education', [EducationController::class, 'index']);
    Route::post('/education', [EducationController::class, 'store']);
    Route::put('/education/{id}', [EducationController::class, 'update']);
    Route::delete('/education/{id}', [EducationController::class, 'destroy']);


    // |---------------------------------
    // Training
    // ----------------------------------|

    Route::get('/trainings', [TrainingController::class, 'index']);
    Route::post('/trainings', [TrainingController::class, 'store']);
    Route::put('/trainings/{id}', [TrainingController::class, 'update']);
    Route::delete('/trainings/{id}', [TrainingController::class, 'destroy']);



    // |---------------------------------
    // Project
    // ----------------------------------|

    Route::get('/projects', [ProjectController::class, 'index']);
    Route::post('/projects', [ProjectController::class, 'store']);
    Route::put('/projects/{id}', [ProjectController::class, 'update']);
    Route::delete('/projects/{id}', [ProjectController::class, 'destroy']);

    // |---------------------------------
    // Personal Details
    // ----------------------------------|

    Route::get('/personal-details', [PersonalDetailController::class, 'index']);
    Route::post('/personal-details', [PersonalDetailController::class, 'store']);
    Route::put('/personal-details/{id}', [PersonalDetailController::class, 'update']);



    // |---------------------------------
    // Certifications
    // ----------------------------------|

    Route::get('/certifications', [CertificationController::class, 'index']);
    Route::post('/certifications', [CertificationController::class, 'store']);
    Route::put('/certifications/{id}', [CertificationController::class, 'update']);
    Route::delete('/certifications/{id}', [CertificationController::class, 'destroy']);


    // |---------------------------------
    // Resume
    // ----------------------------------|


    Route::get('/resume', [ResumeController::class, 'index']);
    Route::post('/resume', [ResumeController::class, 'store']);
    Route::put('/resume/{id}', [ResumeController::class, 'update']);
    Route::delete('resume', ResumeController::class);

});



// |---------------------------------
// Login & Logout
// ----------------------------------|


Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
});



Route::get('/clear-everything', function () {
    \Artisan::call('config:clear');
    \Artisan::call('cache:clear');
    \Artisan::call('route:clear');
    return "All caches have been successfully cleared!";
});

?>