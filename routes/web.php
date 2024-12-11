<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\MovieController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ChatBotController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
// Route::get('movies/chatgpt-recommendations', [MovieController::class, 'chatGptRecommendations']);

// Route::get('/chatbot', [ChatBotController::class, 'index']); // Renders the chatbot page
// Route::post('/chatbot', [ChatBotController::class, 'chatbot']); // Handles chat messages



Route::get('/PaymentSuccess', function () {
    return Inertia::render('PaymentSuccess');
})->name('PaymentSuccess');

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('welcome');
Route::get('/about-us', function () {
    return Inertia::render('about-us');
})->name('about-us');

Route::get('/contact-us', function () {
    return Inertia::render('contact-us');
})->name('contact-us');

Route::get('/Watchlist', function () {
    return Inertia::render('Watchlist');
})->name('Watchlist');

Route::get('/home', function () {
    return Inertia::render('Home');
})->middleware(['auth', 'verified'])->name('home');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/SubscriptionPage', function () {
    return Inertia::render('SubscriptionPage');
})->name('SubscriptionPage');

// Route::get('/UserProfile/{user?}', function (Request $request) {
//     return Inertia::render('UserProfile', [
//         'user' => $request->user() // Pass the authenticated user by default
//     ])->name('UserProfile');
// })->middleware(['auth', 'verified']);

Route::get('/UserProfile', function () {
    return Inertia::render('UserProfile', [
        'user' => Auth::user(), 
    ]);
})->name('UserProfile')->middleware(['auth', 'verified']);

require __DIR__ . '/auth.php';
