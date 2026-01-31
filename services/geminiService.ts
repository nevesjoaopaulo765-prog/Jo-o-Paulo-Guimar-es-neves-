
import { GoogleGenAI, Type } from "@google/genai";
import { Task } from "../types";

// Fix: Use process.env.API_KEY directly as required by the latest SDK guidelines
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getProductivityTip = async (tasks: Task[]): Promise<string> => {
  try {
    const taskSummary = tasks.map(t => `${t.title} (${t.category})`).join(', ');
    // Fix: Using gemini-3-flash-preview for simple text tasks like summarization and tips
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Com base nestas tarefas: ${taskSummary || 'Nenhuma tarefa pendente'}. Forneça uma dica curta, motivadora e estratégica de produtividade em português brasileiro. Max 150 caracteres.`,
    });
    // Fix: Access .text property directly (not as a method)
    return response.text || "Mantenha o foco e priorize o que é essencial hoje!";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "O sucesso é a soma de pequenos esforços repetidos dia após dia.";
  }
};

export const prioritizeTasks = async (tasks: Task[]): Promise<string[]> => {
  try {
    if (tasks.length === 0) return [];
    
    // Fix: Use gemini-3-pro-preview for tasks requiring reasoning and complex data analysis
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `Analise estas tarefas e retorne APENAS um array JSON com os IDs das 3 tarefas mais críticas para realizar primeiro hoje: ${JSON.stringify(tasks)}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: { type: Type.STRING }
        }
      }
    });
    
    // Fix: Use .text property to retrieve the JSON output
    return JSON.parse(response.text || "[]");
  } catch (error) {
    return tasks.slice(0, 3).map(t => t.id);
  }
};
