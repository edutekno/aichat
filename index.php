expand the blog title in to high level blog sections. the importance to regulate ai

use Orhanerday\OpenAi\OpenAi;
$open_ai = new OpenAi(env(‘OPEN_AI_API_KEY’));

$complete = $open_ai->complete([
    'engine' => 'davinci',
    'prompt' => 'Hello',
    'temperature' => 0.7,
    'max_tokens' => 276,
    'frequency_penalty' => 0,
    'presence_penalty' => 0.6,
]);

echo $complete;

print(response.choices[0].text)
