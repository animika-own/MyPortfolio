<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class WorkExperience extends Model
{
    protected $fillable = [
        'company_name',
        'role',
        'start_date',
        'end_date',
        'description'
    ];
}
