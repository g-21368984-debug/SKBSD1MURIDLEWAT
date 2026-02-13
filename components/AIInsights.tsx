
import React, { useState } from 'react';
import { LateRecord } from '../types';
import { getAIAnalysis } from '../services/geminiService';

interface Props {
  records: LateRecord[];
}

const AIInsights: React.FC<Props> = ({ records }) => {
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    setLoading(true);
    const result = await getAIAnalysis(records);
    setAnalysis(result);
    setLoading(false);
  };

  return (
    <div className="bg-gradient-to-br from-indigo-600 to-purple-700 p-6 rounded-xl shadow-lg text-white">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
          <i className="fas fa-robot text-xl"></i>
        </div>
        <div>
          <h3 className="text-lg font-bold">Analisis Pintar AI</h3>
          <p className="text-xs text-indigo-100 opacity-80">Trend & Rumusan Mingguan</p>
        </div>
      </div>

      {!analysis && !loading && (
        <p className="text-sm text-indigo-50 mb-4 leading-relaxed">
          Gunakan AI untuk menganalisis trend kelewatan murid dan mendapatkan cadangan penambahbaikan secara automatik.
        </p>
      )}

      {loading && (
        <div className="flex flex-col items-center py-6">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mb-3"></div>
          <p className="text-xs font-bold uppercase tracking-widest animate-pulse">Menjana Analisis...</p>
        </div>
      )}

      {analysis && !loading && (
        <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 mb-4 text-sm leading-relaxed border border-white/10 max-h-60 overflow-y-auto custom-scrollbar">
          <p className="whitespace-pre-line">{analysis}</p>
        </div>
      )}

      <button
        onClick={handleAnalyze}
        disabled={loading || records.length === 0}
        className={`w-full py-3 rounded-lg font-bold transition-all flex items-center justify-center gap-2 ${
          loading || records.length === 0 
            ? 'bg-white/10 text-white/30 cursor-not-allowed' 
            : 'bg-white text-indigo-700 hover:bg-indigo-50 shadow-md'
        }`}
      >
        <i className="fas fa-sparkles"></i>
        {analysis ? 'Kemaskini Analisis' : 'Jana Analisis Sekarang'}
      </button>

      {records.length === 0 && !analysis && (
        <p className="text-[10px] text-center mt-2 text-indigo-200">
          Sila masukkan data murid untuk menggunakan ciri ini.
        </p>
      )}
    </div>
  );
};

export default AIInsights;
