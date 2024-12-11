<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WatchedMovie extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'movie_id'];

    // Tell Laravel to only manage the `created_at` column
    const UPDATED_AT = null;

    /**
     * Get the user who watched the movie.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the movie that was watched.
     */
    public function movie()
    {
        return $this->belongsTo(Movie::class);
    }
}
