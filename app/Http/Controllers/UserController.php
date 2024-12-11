<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Exception;

class UserController extends Controller
{
    // Get all users
    public function index()
    {
        try {
            $users = User::all();

            return response()->json([
                'message' => 'Users retrieved successfully.',
                'data' => $users,
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'An error occurred while retrieving users.',
                'error' => $e->getMessage(),
            ], 500); // Internal Server Error
        }
    }

    // Get a single user by ID
    public function show($id)
    {
        try {
            $user = User::find($id);

            if (!$user) {
                return response()->json(['message' => 'User not found.'], 404); // Not Found
            }

            return response()->json([
                'message' => 'User retrieved successfully.',
                'data' => $user,
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'An error occurred while retrieving the user.',
                'error' => $e->getMessage(),
            ], 500); // Internal Server Error
        }
    }

    // Delete a user by ID
    public function destroy($id)
    {
        try {
            $user = User::find($id);

            if (!$user) {
                return response()->json(['message' => 'User not found.'], 404); // Not Found
            }

            $user->delete();

            return response()->json(['message' => 'User deleted successfully.'], 200);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'An error occurred while deleting the user.',
                'error' => $e->getMessage(),
            ], 500); // Internal Server Error
        }
    }
}
