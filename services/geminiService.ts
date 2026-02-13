
import { GoogleGenAI, Type } from "@google/genai";
import { LateRecord } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getAIAnalysis = async (records: LateRecord[]) => {
  if (records.length === 0) return "Tiada data untuk dianalisis.";

  const summary = records.map(r => `${r.studentClass}: ${r.reason}`).join(', ');
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Analisis data kehadiran lewat murid berikut dan berikan rumusan ringkas dalam Bahasa Melayu. Kenalpasti trend utama dan cadangan penambahbaikan untuk pihak sekolah: ${summary}`,
      config: {
        thinkingConfig: { thinkingBudget: 0 }
      }
    });

    return response.text || "Gagal mendapatkan analisis AI.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Ralat berlaku semasa menghubungi AI.";
  }
};
