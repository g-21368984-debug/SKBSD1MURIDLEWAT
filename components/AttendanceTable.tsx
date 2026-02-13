
import React from 'react';
import { LateRecord } from '../types';

interface Props {
  records: LateRecord[];
  onDelete: (id: string) => void;
}

const AttendanceTable: React.FC<Props> = ({ records, onDelete }) => {
  if (records.length === 0) {
    return (
      <div className="py-20 text-center flex flex-col items-center">
        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4 text-gray-300 text-2xl">
          <i className="fas fa-folder-open"></i>
        </div>
        <p className="text-gray-400 font-medium">Tiada rekod kelewatan dijumpai.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-100">
      <table className="w-full text-left border-collapse bg-white">
        <thead>
          <tr className="bg-gray-50 text-gray-600 text-xs uppercase tracking-widest font-bold">
            <th className="px-6 py-4 border-b">Nama Murid</th>
            <th className="px-6 py-4 border-b">Kelas</th>
            <th className="px-6 py-4 border-b">Waktu</th>
            <th className="px-6 py-4 border-b">Tarikh</th>
            <th className="px-6 py-4 border-b">Sebab</th>
            <th className="px-6 py-4 border-b text-center">Status</th>
            <th className="px-6 py-4 border-b text-right no-print">Tindakan</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {records.map((record) => (
            <tr key={record.id} className="hover:bg-blue-50/30 transition-colors group">
              <td className="px-6 py-4">
                <div className="font-bold text-gray-800">{record.studentName}</div>
              </td>
              <td className="px-6 py-4 text-gray-600 font-medium">{record.studentClass}</td>
              <td className="px-6 py-4 text-gray-600 font-mono text-sm">{record.arrivalTime}</td>
              <td className="px-6 py-4 text-gray-500 text-sm">{record.date}</td>
              <td className="px-6 py-4">
                <span className="text-sm text-gray-600 italic bg-gray-100 px-2 py-1 rounded">{record.reason}</span>
              </td>
              <td className="px-6 py-4 text-center">
                <span className="inline-block px-3 py-1 bg-red-100 text-red-700 text-xs font-black rounded-full uppercase">
                  {record.status}
                </span>
              </td>
              <td className="px-6 py-4 text-right no-print">
                <button
                  onClick={() => onDelete(record.id)}
                  className="text-gray-300 hover:text-red-500 transition-colors p-2"
                  title="Padam rekod"
                >
                  <i className="fas fa-trash-alt"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AttendanceTable;
