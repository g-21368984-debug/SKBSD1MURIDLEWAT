
import React, { useMemo } from 'react';
import { LateRecord } from '../types';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from 'recharts';

interface Props {
  records: LateRecord[];
}

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

const Dashboard: React.FC<Props> = ({ records }) => {
  const classData = useMemo(() => {
    const map: Record<string, number> = {};
    records.forEach(r => {
      map[r.studentClass] = (map[r.studentClass] || 0) + 1;
    });
    return Object.entries(map)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  }, [records]);

  const reasonData = useMemo(() => {
    const map: Record<string, number> = {};
    records.forEach(r => {
      map[r.reason] = (map[r.reason] || 0) + 1;
    });
    return Object.entries(map).map(([name, value]) => ({ name, value }));
  }, [records]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex flex-col items-center justify-center text-center">
        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Total Kelewatan</h4>
        <div className="text-5xl font-black text-red-600">{records.length}</div>
        <p className="text-xs text-gray-500 mt-2 font-medium">Kemaskini hari ini</p>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 col-span-1 md:col-span-2 overflow-hidden">
        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Ranking Kelas (Top 5)</h4>
        <div className="h-40 w-full">
          {classData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={classData} layout="vertical">
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" width={80} style={{ fontSize: '12px' }} />
                <Tooltip cursor={{ fill: '#f3f4f6' }} />
                <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                  {classData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-300 text-sm">Tiada data tersedia</div>
          )}
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 col-span-1 md:col-span-3">
        <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-full md:w-1/2 h-64">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Analisis Sebab</h4>
                {reasonData.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                        data={reasonData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                        >
                        {reasonData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                    </ResponsiveContainer>
                ) : (
                    <div className="h-full flex items-center justify-center text-gray-300 text-sm">Tiada data sebab</div>
                )}
            </div>
            <div className="w-full md:w-1/2">
                <ul className="space-y-3">
                    {reasonData.map((item, idx) => (
                        <li key={idx} className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-2">
                                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[idx % COLORS.length] }}></span>
                                <span className="text-gray-600 font-medium">{item.name}</span>
                            </div>
                            <span className="font-bold text-gray-800">{item.value}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
