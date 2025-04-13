// src/utils/generateSummary.js
import { Configuration, OpenAIApi } from 'openai';

const config = new Configuration({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

export async function generateImpactSummary(stats) {
  const prompt = `Summarize the following road safety data in 2 concise and positive sentences:
  - Crash Reports: ${stats.reports}
  - Safety Improvements: ${stats.improvements}
  - Community Users: ${stats.users}
  - Accident Reduction: ${stats.reductions}`;

  try {
    const response = await openai.createChatCompletion({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
    });

    return response.data.choices[0].message.content.trim();
  } catch (error) {
    console.error('❌ AI summary generation failed:', error.message);
    return 'Our community is actively working to improve road safety. Stay tuned for updates on our progress.';
  }
}
