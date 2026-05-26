<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Education extends Model
{
    protected $fillable = [
        'degree',
        'institution',
        'board',
        'year_of_passing',
        'grade'
    ];
}
