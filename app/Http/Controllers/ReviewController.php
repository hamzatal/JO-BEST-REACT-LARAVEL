<?php

namespace App\Http\Controllers;

use App\Models\Review;
use App\Models\User;
use App\Models\Movie;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class ReviewController extends Controller
{
    // Retrieve all reviews
    public function index()
    {
        try {
            $reviews = Review::with(['user', 'movie'])->get();
            return response()->json($reviews, 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to retrieve reviews.', 'error' => $e->getMessage()], 500);
        }
    }

    // Retrieve a single review by ID
    public function show($id)
    {
        try {
            $review = Review::with(['user', 'movie'])->findOrFail($id);
            return response()->json($review, 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'Review not found.'], 404);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to retrieve the review.', 'error' => $e->getMessage()], 500);
        }
    }

    // Show the form for creating a new review
    public function create(Request $request)
    {
        try {
            return response()->json(['message' => 'Display the create review form.'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to display the create review form.', 'error' => $e->getMessage()], 500);
        }
    }

    // Store a new review
    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'user_id' => 'required|exists:users,id',
                'movie_id' => 'required|exists:movies,id',
                'rating' => 'required|numeric|min:1|max:5',
                'review' => 'nullable|string',
            ]);

            $review = Review::create($validated);

            return response()->json([
                'message' => 'Review created successfully.',
                'data' => $review,
            ], 201);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['message' => 'Validation failed.', 'errors' => $e->errors()], 422);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to create the review.', 'error' => $e->getMessage()], 500);
        }
    }

    // Show the form for editing an existing review
    public function edit($id)
    {
        try {
            $review = Review::findOrFail($id);
            return response()->json([
                'message' => 'Display the edit review form.',
                'data' => $review,
            ], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'Review not found.'], 404);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to display the edit review form.', 'error' => $e->getMessage()], 500);
        }
    }

    // Update an existing review
    public function update(Request $request, $id)
    {
        try {
            $review = Review::findOrFail($id);

            $validated = $request->validate([
                'rating' => 'required|numeric|min:1|max:5',
                'review' => 'nullable|string',
            ]);

            $review->update($validated);

            return response()->json([
                'message' => 'Review updated successfully.',
                'data' => $review,
            ], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'Review not found.'], 404);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['message' => 'Validation failed.', 'errors' => $e->errors()], 422);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to update the review.', 'error' => $e->getMessage()], 500);
        }
    }

    // Delete a review by ID
    public function destroy($id)
    {
        try {
            $review = Review::findOrFail($id);
            $review->delete();

            return response()->json(['message' => 'Review deleted successfully.'], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'Review not found.'], 404);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to delete the review.', 'error' => $e->getMessage()], 500);
        }
    }
}
