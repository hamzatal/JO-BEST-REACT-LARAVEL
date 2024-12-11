<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\FavoriteController;
use App\Http\Controllers\MovieController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ChatBotController;
use App\Http\Controllers\WatchedMoviesController;


Route::post('/chatbot', [ChatBotController::class, 'chatbot']); // Updated to 'chatbot'

/*
|----------------------------------------------------------------------
| API Routes
|----------------------------------------------------------------------
*/

Route::get('movies/chatgpt-recommendations/{userId}', [MovieController::class, 'chatGptRecommendations']);


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Categories Routes
Route::get('categories', [CategoryController::class, 'index']);
Route::post('categories', [CategoryController::class, 'store']);
Route::get('categories/{category}', [CategoryController::class, 'show']);
Route::put('categories/{category}', [CategoryController::class, 'update']);
Route::delete('categories/{category}', [CategoryController::class, 'destroy']);

// Contacts Routes
Route::get('contacts', [ContactController::class, 'index']);
Route::get('contacts/{contact}', [ContactController::class, 'show']);
Route::post('contacts', [ContactController::class, 'store']);
Route::delete('contacts/{contact}', [ContactController::class, 'destroy']);

// Movies Routes
Route::get('movies', [MovieController::class, 'index']);
Route::post('movies', [MovieController::class, 'store']);
Route::get('movie', [MovieController::class, 'show']);
Route::get('movies/featured', [MovieController::class, 'featured']);
Route::get('movies/trending', [MovieController::class, 'trending']);
Route::get('movies/genre/{genre}', [MovieController::class, 'byGenre']);
Route::get('movies/search/{query}', [MovieController::class, 'search']);
Route::put('movies/{movie}', [MovieController::class, 'update']);
Route::delete('movies/{movie}', [MovieController::class, 'destroy']);
// New route for fetching a random movie
Route::get('movies/random', [MovieController::class, 'random']);

// Favorite Routes
Route::get('favorites', [FavoriteController::class, 'index']);
Route::post('favorites/{movieId}', [FavoriteController::class, 'store']);
Route::delete('favorites/{movieId}', [FavoriteController::class, 'destroy']);

// Reviews Routes
Route::get('reviews', [ReviewController::class, 'index']);
Route::post('reviews/{movieId}', [ReviewController::class, 'store']);
Route::delete('reviews/{movieId}/{reviewId}', [ReviewController::class, 'destroy']);
Route::get('reviews/create', [ReviewController::class, 'create']);
Route::get('reviews/{reviewId}/edit', [ReviewController::class, 'edit']);

// Watched Movies Routes

Route::post('/watched-movies', [WatchedMoviesController::class, 'store']);
// Route to get watched movies for a user
Route::get('/watched-movies', [WatchedMoviesController::class, 'index']);


// Users Routes
Route::get('users', [UserController::class, 'index']);
Route::get('users/{user}', [UserController::class, 'show']);
Route::delete('users/{user}', [UserController::class, 'destroy']);
