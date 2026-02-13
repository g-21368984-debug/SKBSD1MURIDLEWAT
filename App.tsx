
import React, { useState, useEffect, useCallback } from 'react';
import { LateRecord, SchoolClass, COMMON_REASONS } from './types';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import LateStudentForm from './components/LateStudentForm';
import AttendanceTable from './components/AttendanceTable';
import AIInsights from './components/AIInsights';

const STORAGE_KEY = 'skbsd1_late_records';

const App: React.FC = () => {
  const [records, setRecords] = useState<LateRecord[]>([]);
  const [showForm, setShowForm] = useState(true);

  // Load initial data
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setRecords(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse saved records");
      }
    }
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
  }, [records]);

  const addRecord = (record: Omit<LateRecord, 'id' | 'status' | 'date'>) => {
    const newRecord: LateRecord = {
      ...record,
      id: Date.now().toString(),
      date: new Date().toLocaleDateString('en-GB'),
      status: 'Lewat',
    };
    setRecords(prev => [newRecord, ...prev]);
  };

  const deleteRecord = (id: string) => {
    if (window.confirm('Adakah anda pasti mahu memadam rekod ini?')) {
      setRecords(prev => prev.filter(r => r.id !== id));
    }
  };

  const clearAllRecords = () => {
    if (window.confirm('Adakah anda pasti mahu memadam SEMUA rekod? Tindakan ini tidak boleh diundurkan.')) {
      setRecords([]);
    }
  };

  const exportCSV = () => {
    const headers = ['Nama Murid', 'Kelas', 'Waktu Sampai', 'Tarikh', 'Sebab', 'Status'];
    const rows = records.map(r => [
      r.studentName,
      r.studentClass,
      r.arrivalTime,
      r.date,
      r.reason,
      r.status
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(e => e.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `Rekod_Lewat_SKBSD1_${new Date().toLocaleDateString()}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-8">
      <Header />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 no-print">
        <div className="lg:col-span-2 space-y-8">
          <Dashboard records={records} />
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-800">
                <i className="fas fa-edit mr-2 text-blue-600"></i>
                Rekod Baru
              </h3>
              <button 
                onClick={() => setShowForm(!showForm)}
                className="text-sm text-blue-600 hover:underline"
              >
                {showForm ? 'Sembunyikan Borang' : 'Tunjukkan Borang'}
              </button>
            </div>
            {showForm && <LateStudentForm onSubmit={addRecord} />}
          </div>
        </div>

        <div className="space-y-8">
          <AIInsights records={records} />
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Tindakan Pantas</h3>
            <div className="flex flex-col gap-3">
              <button 
                onClick={exportCSV}
                className="flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-lg transition-colors"
              >
                <i className="fas fa-file-csv"></i> Muat Turun CSV
              </button>
              <button 
                onClick={() => window.print()}
                className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors"
              >
                <i className="fas fa-print"></i> Cetak Laporan
              </button>
              <button 
                onClick={clearAllRecords}
                className="flex items-center justify-center gap-2 border-2 border-red-500 text-red-500 hover:bg-red-50 font-bold py-3 px-4 rounded-lg transition-colors"
              >
                <i className="fas fa-trash-alt"></i> Kosongkan Data
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-800">
            <i className="fas fa-list-ul mr-2 text-blue-600"></i>
            Senarai Kehadiran Lewat
          </h3>
          <span className="text-sm text-gray-500">Jumlah: {records.length} rekod</span>
        </div>
        <AttendanceTable records={records} onDelete={deleteRecord} />
      </div>

      <footer className="text-center text-gray-400 text-sm py-8 no-print">
        &copy; {new Date().getFullYear()} SK Bandar Sri Damansara 1. Semua Hak Terpelihara.
      </footer>
    </div>
  );
};

export default App;
