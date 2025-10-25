import { GoogleGenAI, Modality } from "@google/genai";
import { fileToGenerativePart } from '../utils/fileUtils';

// Fix: Per Gemini API guidelines, assume API_KEY is always available in process.env and initialize the client directly.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

export const editImageWithPrompt = async (imageFile: File, prompt: string): Promise<string> => {
  const imagePart = await fileToGenerativePart(imageFile);

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [
        imagePart,
        {
          text: prompt,
        },
      ],
    },
    config: {
        responseModalities: [Modality.IMAGE],
    },
  });

  for (const part of response.candidates[0].content.parts) {
    if (part.inlineData) {
      return part.inlineData.data;
    }
  }

  throw new Error("No image data found in the Gemini API response.");
};
