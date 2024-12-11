<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Movie extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'category_id',
        'genre',
        'description',
        'release_date',
        'rating',
        'popularity',
        'duration',
        'language',
        'poster_url',
        'trailer_url',
        'is_featured',
        'director',
        'cast',
    ];


    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function favorites()
    {
        return $this->hasMany(Favorite::class);
    }

    public function reviews()
    {
        return $this->hasMany(Review::class);
    }
}
