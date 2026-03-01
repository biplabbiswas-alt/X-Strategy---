import { GoogleGenAI, Type } from "@google/genai";
import { DayOfWeek, STRATEGY } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function generateTweets(day: DayOfWeek, topic?: string) {
  const strategy = STRATEGY[day];
  const prompt = `
    You are a world-class Twitter Content Strategist for Biplab Biswas, a YouTube Content Strategist and Expert.
    User Profile: Biplab Biswas (biplab_expert), YouTube Content Strategist, Expert in YouTube growth, algorithms, and creator workflows.
    
    Current Day: ${day}
    Strategy Focus: ${strategy.title} (${strategy.focus})
    Strategy Description: ${strategy.description}
    ${topic ? `Specific Topic to include: ${topic}` : ""}
    
    Task: Generate 4 unique, high-engagement tweets for today.
    Style: Professional yet punchy, authoritative, helpful, and "Twitter-native" (use threads if appropriate, hooks, and clear formatting).
    Target Audience: Aspiring YouTubers, established creators, and digital marketers.
    
    Requirements:
    - Each tweet must be unique.
    - Use relevant hashtags sparingly.
    - Ensure the tone matches Biplab's expertise.
    - If a topic is provided, weave it naturally into the strategy.
    - For each tweet, provide a "catchy image prompt" that aligns with the post's message. This prompt should be suitable for an AI image generator (like Midjourney or DALL-E) or to search for a relevant stock photo.
    - Return exactly 4 tweets.
  `;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            content: { type: Type.STRING, description: "The text content of the tweet" },
            type: { type: Type.STRING, description: "The specific angle or type of this tweet (e.g., Hook, Tip, Question)" },
            imagePrompt: { type: Type.STRING, description: "A catchy image prompt that aligns with the post" }
          },
          required: ["content", "type", "imagePrompt"]
        }
      }
    }
  });

  try {
    return JSON.parse(response.text || "[]");
  } catch (e) {
    console.error("Failed to parse Gemini response", e);
    return [];
  }
}
