import React from "react";


const DashCard = ({ title, value, trend, color }) => {
  
  
  const colorMap = {
    blue: "text-blue-500 bg-blue-500/10 border-blue-500/20",
    emerald: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
    amber: "text-amber-500 bg-amber-500/10 border-amber-500/20",
  };

  return (
    <div className="w-full bg-[#1a1a1a] border border-white/5 rounded-[2.5rem] p-8 flex flex-col justify-between hover:border-white/20 transition-all duration-300">
      <div>
        <p className="text-gray-500 text-[10px] uppercase tracking-[0.2em] font-bold mb-4">
          {title}
        </p>
        <h3 className="text-white text-5xl font-bold tracking-tighter">
          {value}
        </h3>
      </div>
      
      <div className="mt-6">
        <span className={`text-[10px] font-bold px-3 py-1 rounded-full border ${colorMap[color] || colorMap.blue}`}>
          {trend}
        </span>
      </div>
    </div>
  );
};

export default DashCard;