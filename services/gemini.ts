
import { GoogleGenAI, Type } from "@google/genai";

export const getSmartProductSuggestions = async (query: string) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `O usuário está procurando por: "${query}". Sugira 3 categorias de produtos relacionadas ou termos de busca populares num marketplace local em Angola. Responda apenas em formato JSON com uma lista de strings.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            suggestions: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          }
        }
      }
    });
    const text = response.text;
    return JSON.parse(text || '{"suggestions": []}').suggestions;
  } catch (error) {
    console.error("Gemini Error:", error);
    return [];
  }
};

export const generateProductDescription = async (productName: string, category: string) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Crie uma descrição atraente e profissional para um produto chamado "${productName}" na categoria "${category}" para um marketplace online. Destaque qualidade e utilidade.`,
    });
    return response.text || "Sem descrição disponível.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Não foi possível gerar uma descrição automática.";
  }
};
