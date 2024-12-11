<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Exception;

class CategoryController extends Controller
{
    // Retrieve all categories
    public function index()
    {
        try {
            $categories = Category::all();
            return response()->json($categories, 200);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Failed to retrieve categories.',
                'error' => $e->getMessage()
            ], 500); // Internal Server Error
        }
    }

    // Store a new category
    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'name' => 'required|string|max:100',
            ]);

            $category = Category::create($validated);

            return response()->json([
                'message' => 'Category created successfully.',
                'data' => $category
            ], 201);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Failed to create category.',
                'error' => $e->getMessage()
            ], 500); // Internal Server Error
        }
    }

    // Retrieve a single category by ID
    public function show($id)
    {
        try {
            $category = Category::findOrFail($id);
            return response()->json($category, 200);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'message' => 'Category not found.',
                'error' => $e->getMessage()
            ], 404); // Not Found
        } catch (Exception $e) {
            return response()->json([
                'message' => 'An error occurred while retrieving the category.',
                'error' => $e->getMessage()
            ], 500); // Internal Server Error
        }
    }

    // Update a category by ID
    public function update(Request $request, $id)
    {
        try {
            $category = Category::findOrFail($id);

            $validated = $request->validate([
                'name' => 'required|string|max:100',
            ]);

            $category->update($validated);

            return response()->json([
                'message' => 'Category updated successfully.',
                'data' => $category
            ], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'message' => 'Category not found.',
                'error' => $e->getMessage()
            ], 404); // Not Found
        } catch (Exception $e) {
            return response()->json([
                'message' => 'An error occurred while updating the category.',
                'error' => $e->getMessage()
            ], 500); // Internal Server Error
        }
    }

    // Delete a category by ID
    public function destroy($id)
    {
        try {
            $category = Category::findOrFail($id);
            $category->delete();

            return response()->json(['message' => 'Category deleted successfully.'], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'message' => 'Category not found.',
                'error' => $e->getMessage()
            ], 404); // Not Found
        } catch (Exception $e) {
            return response()->json([
                'message' => 'An error occurred while deleting the category.',
                'error' => $e->getMessage()
            ], 500); // Internal Server Error
        }
    }
}
