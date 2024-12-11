<?php

namespace App\Services;

use GuzzleHttp\Client;

class ChatGPTService
{
    protected $client;
    protected $apiKey;

    public function __construct()
    {
        $this->client = new Client();
        $this->apiKey = env('OPENAI_API_KEY');
    }

    public function getRecommendations($userPreferences)
    {
        $response = $this->client->post('https://api.openai.com/v1/chat/completions', [
            'headers' => [
                'Authorization' => "Bearer {$this->apiKey}",
                'Content-Type' => 'application/json',
            ],
            'json' => [
                'model' => 'gpt-4',
                'messages' => [
                    ['role' => 'system', 'content' => 'You are a movie recommendation engine. Provide movie suggestions based on user genre preferences.'],
                    ['role' => 'user', 'content' => "Suggest movies for a user who prefers these genres: {$userPreferences}. The genres are ranked by interest level."],
                ],
                'temperature' => 0.7,
                'max_tokens' => 150,
            ],
        ]);

        $result = json_decode($response->getBody(), true);
        return $result['choices'][0]['message']['content'] ?? 'No recommendations found.';
    }
}
