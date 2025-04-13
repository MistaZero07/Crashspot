// src/utils/classifyCrash.js
export async function classifyCrash(description) {
    const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
  
    const prompt = `
  You are an AI trained to classify road incidents. Given the description below, respond with:
  - crash_type: the kind of incident (e.g. pothole, rollover, fender bender, pedestrian collision)
  - severity: low, medium, or high
  
  Respond in JSON format only.
{
  "crash_type": "...",
  "severity": "..."
   } 
  
  Description: ${description}
  `;
  
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [{ role: "user", content: prompt }],
      }),
    });
  
    const data = await res.json();
    const response = data.choices?.[0]?.message?.content;
  
    try {
      return JSON.parse(response); // will return { crash_type: "", severity: "" }
    } catch (e) {
      console.error("❌ Failed to parse AI response", response);
      return { crash_type: "unknown", severity: "unknown" };
    }
  }
  