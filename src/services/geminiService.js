import { GoogleGenAI } from '@google/genai';

const apiKey = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({ apiKey: apiKey || '' });

/**
 * Generates an image from a text prompt using Gemini API.
 * @param {string} prompt - The text description for the image.
 * @param {object} options - Generation options.
 * @param {number} [options.seed] - Seed for reproducibility.
 * @param {string} [options.aspectRatio] - Aspect ratio ("1:1", "16:9", "9:16", "4:3").
 * @param {string} [options.stylePreset] - Style preset name.
 * @returns {Promise<{imageUrl: string, seed: number}>}
 */
export async function generateImage(prompt, options = {}) {
  const { seed, aspectRatio, stylePreset } = options;

  // Build an enhanced prompt with style context
  let enhancedPrompt = prompt;
  if (stylePreset && stylePreset !== 'None') {
    enhancedPrompt = `${prompt}, ${stylePreset} style`;
  }

  // Use provided seed or generate a random one for tracking
  const usedSeed = seed !== undefined && seed !== '' ? Number(seed) : Math.floor(Math.random() * 2147483647);

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: enhancedPrompt,
      config: {
        responseModalities: ['Text', 'Image'],
        imageConfig: {
          aspectRatio: aspectRatio || '1:1',
        },
      },
    });

    if (!response.candidates || response.candidates.length === 0) {
      throw new Error('No response from AI model');
    }

    const content = response.candidates[0].content;
    if (content && content.parts) {
      for (const part of content.parts) {
        if (part.inlineData && part.inlineData.data) {
          const mimeType = part.inlineData.mimeType || 'image/png';
          const base64Data = part.inlineData.data;
          return {
            imageUrl: `data:${mimeType};base64,${base64Data}`,
            seed: usedSeed,
          };
        }
      }
    }

    throw new Error('No image data found in response');
  } catch (error) {
    console.error('Gemini API Error:', error);
    throw error;
  }
}
