
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="text-center py-6 bg-white rounded-2xl shadow-sm border border-gray-200">
      <div className="flex flex-col items-center">
        <div className="w-24 h-24 mb-4 bg-white rounded-full flex items-center justify-center border-2 border-blue-600 overflow-hidden p-1 shadow-inner">
          <img 
            src="https://i.postimg.cc/zv714vFL/LOGO-SKBSD1.png" 
            alt="Logo SKBSD1"
            className="w-full h-full object-contain"
          />
        </div>
        <h1 className="text-2xl md:text-3xl font-black text-blue-700 uppercase tracking-tight">
          Sistem Rekod Kehadiran Murid Lewat
        </h1>
        <p className="text-lg md:text-xl font-bold text-gray-600 mt-2">
          Sekolah Kebangsaan Bandar Sri Damansara 1
        </p>
        <div className="mt-4 flex gap-4 text-sm text-gray-500 font-medium">
          <span className="flex items-center gap-1">
            <i className="fas fa-calendar-alt text-blue-500"></i> {new Date().toLocaleDateString('ms-MY', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </span>
          <span className="flex items-center gap-1">
            <i className="fas fa-clock text-blue-500"></i> <Clock />
          </span>
        </div>
      </div>
    </header>
  );
};

const Clock: React.FC = () => {
  const [time, setTime] = React.useState(new Date().toLocaleTimeString());
  
  React.useEffect(() => {
    const timer = setInterval(() => setTime(new Date().toLocaleTimeString()), 1000);
    return () => clearInterval(timer);
  }, []);

  return <span>{time}</span>;
}

export default Header;
