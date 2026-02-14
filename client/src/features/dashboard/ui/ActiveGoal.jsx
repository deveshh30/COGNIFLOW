import React from "react";
import API from "../../../services/api";

const ActiveGoal = ({ id, title, progress, onDelete, setGoals }) => {
  // 1. Threshold logic
  const getDynamicStatus = (val) => {
    if (val >= 60) return "On Track";
    if (val >= 30) return "At Risk";
    return "Off Track";
  };

  const currentStatus = getDynamicStatus(progress);

  // 2. Mapping for the Status Tag (Tailwind Classes)
  const STATUS_STYLES = {
    "On Track": "bg-green-500/10 text-green-400 border-green-500/20",
    "At Risk": "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    "Off Track": "bg-red-500/10 text-red-400 border-red-500/20",
  };

  // 3. Mapping for the Slider Fill (Hex Codes)
  const BAR_COLORS = {
    "On Track": "#10b981", // Emerald 500
    "At Risk": "#f59e0b",  // Amber 500
    "Off Track": "#ef4444", // Red 500
  };

  const activeColor = BAR_COLORS[currentStatus];

  const handleSliderChange = async (e) => {
    const newProgress = parseInt(e.target.value);
    const newStatus = getDynamicStatus(newProgress);

    // Optimistic UI Update
    setGoals((prev) =>
      prev.map((g) => (g._id === id ? { ...g, progress: newProgress, status: newStatus } : g))
    );

    try {
      await API.patch(`/goals/progress/${id}`, { 
        progress: newProgress,
        status: newStatus 
      });
    } catch (err) {
      console.error("Sync failed", err);
    }
  };

  return (
    <div className="group relative rounded-2xl bg-[#1b1b1b] border border-white/5 mb-6 p-6 transition-all hover:border-white/20">
      
      {/* Hover Delete Button */}
      <button 
        onClick={() => onDelete(id)} 
        className="absolute -top-2 -right-2 z-20 bg-[#1b1b1b] border border-white/10 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500/20"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 hover:text-red-500">
            <path d="M3 6h18m-2 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
        </svg>
      </button>

      <div className="flex items-center justify-between mb-6">
        <h3 className="text-sm font-semibold text-gray-100 group-hover:text-blue-400 transition-colors">
          {title}
        </h3>
        {/* Dynamic Status Tag */}
        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border uppercase tracking-wider transition-all duration-500 ${STATUS_STYLES[currentStatus]}`}>
          {currentStatus}
        </span>
      </div>

      {/* Unified Slider */}
      <div className="relative w-full h-2 mt-4">
        <input
          type="range"
          min="0"
          max="100"
          value={progress}
          onChange={handleSliderChange}
          className="absolute inset-0 w-full h-2 bg-white/5 rounded-full appearance-none cursor-pointer z-10 accent-white outline-none"
          style={{
            // The magic line: using the Hex color for the gradient fill
            background: `linear-gradient(to right, ${activeColor} ${progress}%, transparent ${progress}%)`,
          }}
        />
        {/* Visual Background Track */}
        <div className="absolute inset-0 w-full h-2 bg-white/5 rounded-full border border-white/5 -z-0" />
      </div>

      <div className="flex justify-between items-center mt-3">
        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-tighter">Progress</p>
        <p className={`text-[10px] font-bold tracking-tighter transition-colors duration-500`} style={{ color: activeColor }}>
            {progress}%
        </p>
      </div>
    </div>
  );
};

export default ActiveGoal;