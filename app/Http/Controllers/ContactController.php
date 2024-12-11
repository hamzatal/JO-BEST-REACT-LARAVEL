<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Exception;

class ContactController extends Controller
{
    // Retrieve all contacts
    public function index()
    {
        try {
            $contacts = Contact::all();
            return response()->json($contacts, 200);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Failed to retrieve contacts.',
                'error' => $e->getMessage()
            ], 500); // Internal Server Error
        }
    }
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'subject' => 'required|string|max:255',
            'message' => 'required|string',
        ]);
    
        Contact::create($request->all());
    
        return response()->json(['message' => 'Your message has been sent successfully!'], 201);
    }
    
    // Retrieve a single contact by ID
    public function show($id)
    {
        try {
            $contact = Contact::findOrFail($id);
            return response()->json($contact, 200);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'message' => 'Contact not found.',
                'error' => $e->getMessage()
            ], 404); // Not Found
        } catch (Exception $e) {
            return response()->json([
                'message' => 'An error occurred while retrieving the contact.',
                'error' => $e->getMessage()
            ], 500); // Internal Server Error
        }
    }

    // Delete a contact by ID
    public function destroy($id)
    {
        try {
            $contact = Contact::findOrFail($id);
            $contact->delete();
            return response()->json(['message' => 'Contact deleted successfully.'], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'message' => 'Contact not found.',
                'error' => $e->getMessage()
            ], 404); // Not Found
        } catch (Exception $e) {
            return response()->json([
                'message' => 'An error occurred while deleting the contact.',
                'error' => $e->getMessage()
            ], 500); // Internal Server Error
        }
    }
}
