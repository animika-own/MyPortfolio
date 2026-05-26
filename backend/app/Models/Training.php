<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Training extends Model
{
    protected $fillable = [
        'course_name',
        'institute_name',
        'start_date',
        'end_date',
        'description'
    ];
}
