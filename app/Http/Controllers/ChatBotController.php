<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Services\ChatGPTServices;

class ChatBotController extends Controller
{
    protected $chatGPTService;

    public function __construct(ChatGPTServices $chatGPTService)
    {
        $this->chatGPTService = $chatGPTService;
    }

    // Render ChatBot page
    public function index()
    {
        return Inertia::render('Chatbot');
    }

    // Handle chat request
    public function chatbot(Request $request)
    {
        $message = $request->input('message');

        if (!$message) {
            return response()->json(['error' => 'Message is required'], 400);
        }

        $response = $this->chatGPTService->askChatGPT($message);

        // Extract the response content
        $chatGPTResponse = $response['choices'][0]['message']['content'] ?? 'No response from ChatGPT.';

        return response()->json([
            'response' => $chatGPTResponse,
        ]);
    }
}
