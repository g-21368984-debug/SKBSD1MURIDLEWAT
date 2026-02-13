
import React, { useState } from 'react';
import { SchoolClass, COMMON_REASONS, LateRecord } from '../types';

interface Props {
  onSubmit: (record: Omit<LateRecord, 'id' | 'status' | 'date'>) => void;
}

const LateStudentForm: React.FC<Props> = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [studentClass, setStudentClass] = useState('');
  const [reason, setReason] = useState('');
  const [otherReason, setOtherReason] = useState('');
  const [time, setTime] = useState(() => {
    const now = new Date();
    return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !studentClass || !reason || (reason === 'Lain-lain' && !otherReason)) {
      alert('Sila lengkapkan semua maklumat.');
      return;
    }

    onSubmit({
      studentName: name.toUpperCase(),
      studentClass,
      reason: reason === 'Lain-lain' ? otherReason : reason,
      arrivalTime: time,
    });

    // Reset form
    setName('');
    setStudentClass('');
    setReason('');
    setOtherReason('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-sm font-bold text-gray-700">Nama Penuh Murid</label>
          <div className="relative">
            <span className="absolute left-3 top-3 text-gray-400">
              <i className="fas fa-user"></i>
            </span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="CONTOH: AHMAD BIN ALI"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              required
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-sm font-bold text-gray-700">Kelas</label>
          <div className="relative">
            <span className="absolute left-3 top-3 text-gray-400">
              <i className="fas fa-school"></i>
            </span>
            <select
              value={studentClass}
              onChange={(e) => setStudentClass(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none appearance-none transition-all"
              required
            >
              <option value="">-- Pilih Kelas --</option>
              {Object.values(SchoolClass).map(sc => (
                <option key={sc} value={sc}>{sc}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-sm font-bold text-gray-700">Sebab Lewat</label>
          <div className="relative">
            <span className="absolute left-3 top-3 text-gray-400">
              <i className="fas fa-comment-dots"></i>
            </span>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none appearance-none transition-all"
              required
            >
              <option value="">-- Pilih Sebab --</option>
              {COMMON_REASONS.map(r => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>
          {reason === 'Lain-lain' && (
            <input
              type="text"
              placeholder="Sila nyatakan sebab..."
              value={otherReason}
              onChange={(e) => setOtherReason(e.target.value)}
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          )}
        </div>

        <div className="space-y-1">
          <label className="text-sm font-bold text-gray-700">Waktu Sampai</label>
          <div className="relative">
            <span className="absolute left-3 top-3 text-gray-400">
              <i className="fas fa-clock"></i>
            </span>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              required
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-green-600 hover:bg-green-700 text-white font-black py-4 rounded-xl shadow-lg transform hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
      >
        <i className="fas fa-save text-xl"></i>
        SIMPAN REKOD KEHADIRAN
      </button>
    </form>
  );
};

export default LateStudentForm;
