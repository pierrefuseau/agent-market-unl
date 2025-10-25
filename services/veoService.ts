import { GoogleGenAI } from "@google/genai";
import { fileToGenerativePart } from '../utils/fileUtils';

export const generateVideoFromImage = async (imageFile: File, prompt: string): Promise<string> => {
    // Per Veo guidelines, create a new instance right before the API call to ensure the latest key is used.
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });
    
    const imagePart = await fileToGenerativePart(imageFile);

    let operation = await ai.models.generateVideos({
        model: 'veo-3.1-fast-generate-preview',
        prompt: prompt,
        image: {
            imageBytes: imagePart.inlineData.data,
            mimeType: imagePart.inlineData.mimeType,
        },
        config: {
            numberOfVideos: 1,
            resolution: '720p',
            aspectRatio: '16:9' // Or determine from image
        }
    });

    // Poll for the result
    while (!operation.done) {
        // Wait for 10 seconds before checking the status again
        await new Promise(resolve => setTimeout(resolve, 10000));
        operation = await ai.operations.getVideosOperation({ operation: operation });
    }

    const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;

    if (!downloadLink) {
        throw new Error("Video generation succeeded, but no download link was found in the response.");
    }
    
    // The response body contains the MP4 bytes. You must append an API key when fetching from the download link.
    const response = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
    const videoBlob = await response.blob();
    
    // Create a local URL for the video to be used in the <video> src attribute
    return URL.createObjectURL(videoBlob);
};
