<?php
namespace App\Services;

use GuzzleHttp\Client;
use GuzzleHttp\Exception\RequestException;
use Illuminate\Support\Facades\DB;

class ChatGPTServices
{
    protected $client;
    protected $apiKey;

    public function __construct()
    {
        $this->client = new Client();
        $this->apiKey = env('OPENAI_API_KEY');
    }

    /**
     * Retrieve movie details from the database
     *
     * @param int $movieId
     * @return array|string
     */
    public function getMovieDetails($movieId)
    {
        $movie = DB::table('movies')->where('id', $movieId)->first();

        if ($movie) {
            return [
                'id' => $movie->id,
                'title' => $movie->title,
                'genre' => $movie->genre,
                'description' => $movie->description,
                'release_date' => $movie->release_date,
                'rating' => $movie->rating,
                'poster_url' => $movie->poster_url,
                'trailer_url' => $movie->trailer_url,
                'exists' => true
            ];
        }

        return ['exists' => false];
    }

    /**
     * Find similar movies based on genre or other criteria
     *
     * @param string $genre
     * @param int $excludeMovieId
     * @return array
     */
    public function findSimilarMovies($genre, $excludeMovieId)
    {
        return DB::table('movies')
            ->where('genre', $genre)
            ->where('id', '!=', $excludeMovieId)
            ->limit(3)
            ->get()
            ->map(function($movie) {
                return [
                    'id' => $movie->id,
                    'title' => $movie->title,
                    'genre' => $movie->genre,
                    'rating' => $movie->rating
                ];
            })
            ->toArray();
    }

    /**
     * Search for a movie and provide comprehensive response
     *
     * @param int $movieId
     * @return array
     */
    public function searchMovie($movieId)
    {
        // Get movie details
        $movieDetails = $this->getMovieDetails($movieId);

        // If movie exists
        if ($movieDetails['exists']) {
            // Prepare response for existing movie
            $response = [
                'status' => 'found',
                'message' => 'Movie is available on our site!',
                'movie' => $movieDetails
            ];

            // Find similar movies
            $similarMovies = $this->findSimilarMovies(
                $movieDetails['genre'],
                $movieDetails['id']
            );

            $response['similar_movies'] = $similarMovies;

            return $response;
        }

        // If movie does not exist
        try {
            // Use ChatGPT to suggest a similar movie
            $aiSuggestion = $this->askChatGPT(
                "Suggest a similar movie to the movie with ID $movieId. " .
                "Provide a brief description and why it might be interesting."
            );

            return [
                'status' => 'not_found',
                'message' => 'Unfortunately, this movie is not in our database.',
                'ai_suggestion' => $aiSuggestion['choices'][0]['message']['content']
            ];
        } catch (\Exception $e) {
            return [
                'status' => 'error',
                'message' => 'An error occurred while searching for the movie.',
                'error' => $e->getMessage()
            ];
        }
    }

    /**
     * Ask ChatGPT for a movie-related query
     *
     * @param string $message
     * @return array
     */
    public function askChatGPT($message)
    {
        try {
            $response = $this->client->post('https://api.openai.com/v1/chat/completions', [
                'headers' => [
                    'Authorization' => 'Bearer ' . $this->apiKey,
                    'Content-Type' => 'application/json',
                ],
                'json' => [
                    'model' => 'gpt-4',
                    'messages' => [
                        ['role' => 'system', 'content' => 'You are a movie recommendation assistant.'],
                        ['role' => 'user', 'content' => $message],
                    ],
                    'max_tokens' => 200,
                    'temperature' => 0.7,
                ],
            ]);

            $responseBody = json_decode($response->getBody()->getContents(), true);

            if (isset($responseBody['choices'][0]['message']['content'])) {
                return $responseBody;
            }

            return ['choices' => [['message' => ['content' => 'No meaningful response from ChatGPT.']]]];

        } catch (RequestException $e) {
            throw new \Exception('Error connecting to OpenAI API: ' . $e->getMessage());
        }
    }
}
