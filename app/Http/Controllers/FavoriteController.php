<?php

namespace App\Http\Controllers;

use App\Models\Favorite;
use App\Models\Movie;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Exception;

class FavoriteController extends Controller
{
    public function index()
    {
        try {
            // Get the authenticated user's ID
            $userId = auth()->id();

            // Ensure the user is authenticated
            if (!$userId) {
                return response()->json(['message' => 'Unauthorized.'], 401);
            }

            // Fetch favorite movies for the authenticated user
            $favorites = Favorite::where('user_id', $userId)
                ->join('movies', 'favorites.movie_id', '=', 'movies.id')
                ->select(
                    'movies.id',
                    'movies.title',
                    DB::raw('YEAR(movies.release_date) as year'),
                    'movies.genre',
                    'movies.duration as runtime',
                    'movies.rating',
                    'favorites.created_at'
                )
                ->get();

            return response()->json(['data' => $favorites], 200);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'An error occurred while fetching favorites.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }



    // Add a movie to favorites
    public function store(Request $request, $movieId)
    {
        try {
            // Ensure the user is authenticated
            $userId = auth()->id();

            // If the user is not authenticated, return an unauthorized response
            if (!$userId) {
                return response()->json(['message' => 'Unauthorized.'], 401);
            }

            // Check if the movie exists before adding to favorites
            $movie = Movie::find($movieId);
            if (!$movie) {
                return response()->json(['message' => 'Movie not found.'], 404); // Movie not found
            }

            // Check if the movie is already in the user's favorites
            $favorite = Favorite::firstOrCreate([
                'user_id' => $userId, // Use the authenticated user's ID
                'movie_id' => $movieId,
            ]);

            return response()->json([
                'message' => 'Movie added to favorites successfully.',
                'data' => $favorite
            ], 201);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'An error occurred while adding the movie to favorites.',
                'error' => $e->getMessage(),
            ], 500); // Internal Server Error
        }
    }


    // Remove a movie from favorites
    public function destroy(Request $request, $movieId)
    {
        try {
            $validated = $request->validate([
                'user_id' => 'required|exists:users,id',
            ]);

            $favorite = Favorite::where('movie_id', $movieId)
                ->where('user_id', $validated['user_id'])
                ->first();

            if (!$favorite) {
                return response()->json(['message' => 'Favorite not found.'], 404); // Not Found
            }

            $favorite->delete();

            return response()->json(['message' => 'Movie removed from favorites successfully.'], 200);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'An error occurred while removing the movie from favorites.',
                'error' => $e->getMessage(),
            ], 500); // Internal Server Error
        }
    }
}
