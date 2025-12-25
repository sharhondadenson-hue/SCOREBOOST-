
import { GoogleGenAI, Type, FunctionDeclaration } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

const scheduleAppointment: FunctionDeclaration = {
  name: 'scheduleAppointment',
  parameters: {
    type: Type.OBJECT,
    description: 'Schedules a credit repair consultation for a qualified lead.',
    properties: {
      preferredTime: {
        type: Type.STRING,
        description: 'The users preferred time or day for the call.'
      },
      phoneNumber: {
        type: Type.STRING,
        description: 'User phone number for the contact.'
      }
    },
    required: ['phoneNumber']
  }
};

const qualifyLead: FunctionDeclaration = {
  name: 'qualifyLead',
  parameters: {
    type: Type.OBJECT,
    description: 'Updates the qualification status of a lead based on income and negative items.',
    properties: {
      isQualified: {
        type: Type.BOOLEAN,
        description: 'True if user has negative items and sufficient income.'
      }
    },
    required: ['isQualified']
  }
};

export const generateResponse = async (history: { role: string; parts: { text: string }[] }[]) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: history,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        tools: [{ functionDeclarations: [scheduleAppointment, qualifyLead] }]
      }
    });

    return response;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};
