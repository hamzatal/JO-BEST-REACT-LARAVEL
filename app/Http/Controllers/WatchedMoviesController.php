<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\WatchedMovie;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Exception;

class WatchedMoviesController extends Controller
{
    /**
     * Store a new watched movie entry.
     */
    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'user_id' => 'required|exists:users,id',
                'movie_id' => 'required|exists:movies,id',
            ]);

            $watchedMovie = WatchedMovie::create($validated);

            // Optionally load relationships for the created entry
            $watchedMovie->load('user', 'movie');

            return response()->json([
                'message' => 'Movie watched entry added successfully.',
                'data' => $watchedMovie,
            ], 201);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'message' => 'User or Movie not found.',
                'error' => $e->getMessage(),
            ], 404);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'An error occurred while adding the watched movie entry.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Get the list of watched movies for a user.
     */
    public function index(Request $request)
    {
        try {
            $userId = $request->user_id; // Or use auth()->id() if using authentication
            $watchedMovies = WatchedMovie::where('user_id', $userId)->get();

            return response()->json($watchedMovies);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'An error occurred while fetching watched movies.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
