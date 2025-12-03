import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY;
if (!apiKey) {
  console.error("API_KEY is missing from environment variables.");
}

const ai = new GoogleGenAI({ apiKey: apiKey || '' });

/**
 * Generates an image based on the provided text prompt using Gemini.
 * @param prompt The text description for the image.
 * @returns A promise that resolves to the base64 image data URL or null if failed.
 */
export const generateImageFromText = async (prompt: string): Promise<string | null> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: prompt,
    });

    if (!response.candidates || response.candidates.length === 0) {
      throw new Error("No candidates returned from API");
    }

    const content = response.candidates[0].content;
    
    // Iterate through parts to find the image part
    if (content.parts) {
        for (const part of content.parts) {
            if (part.inlineData && part.inlineData.data) {
                const mimeType = part.inlineData.mimeType || 'image/png';
                const base64Data = part.inlineData.data;
                return `data:${mimeType};base64,${base64Data}`;
            }
        }
    }
    
    throw new Error("No image data found in response");

  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};
