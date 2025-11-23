import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY;

export const generateDogCostume = async (
  base64Image: string,
  countryAdjective: string
): Promise<string> => {
  if (!apiKey) {
    throw new Error("API Key is missing");
  }

  const ai = new GoogleGenAI({ apiKey });

  // Clean the base64 string to remove the data URL prefix if present
  const base64Data = base64Image.replace(/^data:image\/(png|jpeg|jpg|webp);base64,/, "");
  const mimeType = base64Image.match(/^data:(image\/[a-zA-Z]+);base64,/)?.[1] || "image/jpeg";

  const prompt = `
    Transform this image of a dog. 
    The dog should be wearing traditional ${countryAdjective} clothing.
    IMPORTANT:
    1. Keep the dog's breed, face, fur color, and pose exactly as they are in the original image. 
    2. The clothing should fit the dog naturally.
    3. Change the background to a soft-focus, scenic background that matches the country (${countryAdjective}).
    4. The output must be a high-quality, photorealistic image.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              data: base64Data,
              mimeType: mimeType,
            },
          },
          {
            text: prompt,
          },
        ],
      },
    });

    // Extract image from response
    // The response candidates content parts will contain the image
    const parts = response.candidates?.[0]?.content?.parts;
    
    if (!parts) {
      throw new Error("No content generated");
    }

    for (const part of parts) {
      if (part.inlineData && part.inlineData.data) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }

    throw new Error("No image data found in response");

  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};