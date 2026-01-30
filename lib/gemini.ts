
import { GoogleGenAI, Modality, Type, LiveServerMessage } from "@google/genai";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function chatLite(message: string) {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: message,
  });
  return response.text;
}

export async function chatPro(prompt: string, options: { useSearch?: boolean; useThinking?: boolean } = {}) {
  const ai = getAI();
  const config: any = {};
  if (options.useSearch) config.tools = [{ googleSearch: {} }];
  if (options.useThinking) config.thinkingConfig = { thinkingBudget: 32768 };

  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: prompt,
    config
  });
  return {
    text: response.text,
    sources: response.candidates?.[0]?.groundingMetadata?.groundingChunks
  };
}

export const PLATFORM_GUIDANCE = `
You are the MGCC (Miftahul Er Jelkhana Coaching Center) Intelligence Assistant.
Rules:
- Payment Process: bKash Send Money to 017XXXXXXXX. Enter Transaction ID at the prompt.
- Verification: Admin checks Transaction ID against logs. Course unlocks within 12 hours.
- Login Roles: Students (Email/Phone), Teachers (4-digit ID), Parents (Student ID link).
- Courses: SSC, HSC, Admission, Coding, AI, Entrepreneurship.
- Vibe: Professional, Apple-style minimalist, encouraging, academic expert.
`;
