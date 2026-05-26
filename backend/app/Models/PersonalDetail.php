<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PersonalDetail extends Model
{
    protected $fillable = [
        'name',
        'daughter_of',
        'mother_name',
        'date_of_birth',
        'gender',
        'marital_status',
        'spouse_name',
        'nationality',
        'languages_known',
        'hobbies',
        'address'
    ];
}
