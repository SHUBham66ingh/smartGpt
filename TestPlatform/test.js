import { OpenRouter } from '@openrouter/sdk';
import "dotenv/config";
import readlineSync from 'readline-sync';


const client = new OpenRouter({
  apiKey: '<OPENROUTER_API_KEY>',
});

const completion = await client.chat.send({
  model: '~openai/gpt-latest',
  messages: [
    {
      role: 'user',
      content: 'What is the meaning of life?',
    },
  ],
});

console.log(completion.choices[0].message.content);


