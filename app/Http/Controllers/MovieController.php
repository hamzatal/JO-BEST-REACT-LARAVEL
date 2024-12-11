<?php

namespace App\Http\Controllers;

use App\Models\Movie;
use App\Models\Category;
use Illuminate\Http\Request;
use App\Services\ChatGPTService;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Database\QueryException;
use Illuminate\Validation\ValidationException;

class MovieController extends Controller
{

    public function featured()
    {
        try {
            $featuredMovies = Movie::where('is_featured', true)
                ->orderBy('rating', 'desc')
                ->take(5)
                ->get();

            return response()->json($featuredMovies, 200);
        } catch (QueryException $e) {
            return response()->json(['message' => 'Failed to fetch featured movies.', 'error' => $e->getMessage()], 500);
        }
    }

    public function trending()
    {
        try {
            $trendingMovies = Movie::orderBy('popularity', 'desc')
                ->take(10)
                ->get();

            return response()->json($trendingMovies, 200);
        } catch (QueryException $e) {
            return response()->json(['message' => 'Failed to fetch trending movies.', 'error' => $e->getMessage()], 500);
        }
    }

    public function byGenre($genre)
    {
        try {
            $movies = Movie::where('genre', $genre)->take(10)->get();
            return response()->json($movies, 200);
        } catch (QueryException $e) {
            return response()->json(['message' => 'Failed to fetch movies by genre.', 'error' => $e->getMessage()], 500);
        }
    }


    public function chatGptRecommendations($userId)
    {
        // Check if the user exists
        $userExists = DB::table('users')->where('id', $userId)->exists();
        if (!$userExists) {
            return response()->json(['error' => 'User not found.'], 404);
        }

        // Fetch genres from watched_movies
        $watchedGenres = DB::table('watched_movies')
        ->join('movies', 'watched_movies.movie_id', '=', 'movies.id')
        ->where('watched_movies.user_id', $userId)
            ->select('movies.genre', DB::raw('COUNT(movies.genre) as count'))
            ->groupBy('movies.genre')
            ->orderByDesc('count')
            ->pluck('count', 'genre')
            ->toArray();

        // Fetch genres from favorites
        $favoriteGenres = DB::table('favorites')
        ->join('movies', 'favorites.movie_id', '=', 'movies.id')
        ->where('favorites.user_id', $userId)
            ->select('movies.genre', DB::raw('COUNT(movies.genre) as count'))
            ->groupBy('movies.genre')
            ->orderByDesc('count')
            ->pluck('count', 'genre')
            ->toArray();

        // Merge and weight genres from both sources
        $mergedGenres = [];
        foreach ($watchedGenres as $genre => $count) {
            $mergedGenres[$genre] = ($mergedGenres[$genre] ?? 0) + $count * 2; // Higher weight for watched
        }
        foreach ($favoriteGenres as $genre => $count) {
            $mergedGenres[$genre] = ($mergedGenres[$genre] ?? 0) + $count;
        }

        // Sort genres by relevance
        arsort($mergedGenres);
        $preferredGenres = array_keys($mergedGenres);

        // Fetch the IDs of movies that the user has already watched or favorited
        $watchedMovieIds = DB::table('watched_movies')
        ->where('user_id', $userId)
            ->pluck('movie_id')
            ->toArray();

        $favoriteMovieIds = DB::table('favorites')
        ->where('user_id', $userId)
            ->pluck('movie_id')
            ->toArray();

        // Merge the watched and favorite movie IDs
        $excludedMovieIds = array_merge($watchedMovieIds, $favoriteMovieIds);

        // Fetch recommended movies from the movies table based on preferred genres, excluding already watched/favorited
        $recommendedMovies = DB::table('movies')
        ->whereIn('genre', $preferredGenres)
            ->whereNotIn('id', $excludedMovieIds) // Exclude movies already watched or favorited
            ->orderByDesc('popularity') // You can order by other factors like rating, release_date, etc.
            ->limit(10) // Limit to top 10 recommendations
            ->get();

        return response()->json([
            'user_preferences' => $mergedGenres,
            'recommended_movies' => $recommendedMovies,
        ]);
    }


    // Retrieve all movies
    public function index()
    {
        try {
            $movies = Movie::with('category')->get();
            return response()->json($movies, 200);
        } catch (QueryException $e) {
            return response()->json(['message' => 'Failed to fetch movies.', 'error' => $e->getMessage()], 500);
        }
    }

    // Retrieve a single movie by ID
    public function show($id)
    {
        try {
            $movie = Movie::with('category')->find($id);

            if (!$movie) {
                return response()->json(['message' => 'Movie not found.'], 404);
            }

            return response()->json($movie, 200);
        } catch (QueryException $e) {
            return response()->json(['message' => 'Failed to fetch movie.', 'error' => $e->getMessage()], 500);
        }
    }

    // Store a new movie
    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'title' => 'required|string|max:255',
                'category_id' => 'required|exists:categories,id',
                'genre' => 'required|string|max:100',
                'description' => 'required|string',
                'release_date' => 'required|date',
                'rating' => 'required|numeric|between:0,10',
                'poster_url' => 'required|string',
                'trailer_url' => 'nullable|string',
                'director' => 'nullable|string|max:255',
                'cast' => 'nullable|string',
            ]);

            $movie = Movie::create($validated);

            return response()->json([
                'message' => 'Movie created successfully.',
                'data' => $movie,
            ], 201);
        } catch (ValidationException $e) {
            return response()->json(['message' => 'Validation error.', 'errors' => $e->errors()], 422);
        } catch (QueryException $e) {
            return response()->json(['message' => 'Failed to create movie.', 'error' => $e->getMessage()], 500);
        }
    }

    // Update an existing movie
    public function update(Request $request, $id)
    {
        try {
            $movie = Movie::find($id);

            if (!$movie) {
                return response()->json(['message' => 'Movie not found.'], 404);
            }

            $validated = $request->validate([
                'title' => 'required|string|max:255',
                'category_id' => 'required|exists:categories,id',
                'genre' => 'required|string|max:100',
                'description' => 'required|string',
                'release_date' => 'required|date',
                'rating' => 'required|numeric|between:0,10',
                'poster_url' => 'required|string',
                'trailer_url' => 'nullable|string',
                'director' => 'nullable|string|max:255',
                'cast' => 'nullable|string',
            ]);

            $movie->update($validated);

            return response()->json([
                'message' => 'Movie updated successfully.',
                'data' => $movie,
            ], 200);
        } catch (ValidationException $e) {
            return response()->json(['message' => 'Validation error.', 'errors' => $e->errors()], 422);
        } catch (QueryException $e) {
            return response()->json(['message' => 'Failed to update movie.', 'error' => $e->getMessage()], 500);
        }
    }

    // Delete a movie by ID
    public function destroy($id)
    {
        try {
            $movie = Movie::find($id);

            if (!$movie) {
                return response()->json(['message' => 'Movie not found.'], 404);
            }

            $movie->delete();

            return response()->json(['message' => 'Movie deleted successfully.'], 200);
        } catch (QueryException $e) {
            return response()->json(['message' => 'Failed to delete movie.', 'error' => $e->getMessage()], 500);
        }
    }

    // Search for movies with filters
    public function search($query = null, Request $request)
    {
        try {
            // Start query with eager loading of category
            $movieQuery = Movie::with('category');

            // Search by the query parameter from the route
            if ($query) {
                $movieQuery->where('title', 'LIKE', '%' . $query . '%');
            }

            // Additional filtering by title (case-insensitive)
            if ($request->has('title')) {
                $movieQuery->where('title', 'LIKE', '%' . $request->input('title') . '%');
            }

            // Filter by genre
            if ($request->has('genre')) {
                $movieQuery->where('genre', $request->input('genre'));
            }

            // Filter by category
            if ($request->has('category_id')) {
                $movieQuery->where('category_id', $request->input('category_id'));
            }

            // Filter by minimum rating
            if ($request->has('min_rating')) {
                $movieQuery->where('rating', '>=', $request->input('min_rating'));
            }

            // Filter by release date range
            if ($request->has('start_date') && $request->has('end_date')) {
                $movieQuery->whereBetween('release_date', [
                    $request->input('start_date'),
                    $request->input('end_date')
                ]);
            }

            // Paginate results
            $movies = $movieQuery->paginate(10);

            return response()->json($movies, 200);
        } catch (QueryException $e) {
            return response()->json(['message' => 'Failed to fetch movies.', 'error' => $e->getMessage()], 500);
        }
    }


    public function random()
    {
        // Fetch a random movie
        $movie = Movie::inRandomOrder()->first(); // `inRandomOrder` fetches a random record

        if (!$movie) {
            return response()->json(['error' => 'No movies found'], 404);
        }

        return response()->json($movie);
    }
}