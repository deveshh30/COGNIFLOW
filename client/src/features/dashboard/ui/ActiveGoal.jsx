import React, { useState, useEffect, useCallback, memo } from "react";
import API from "../../../services/api";

// Lightweight debounce implementation
const debounce = (func, wait) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

const ActiveGoal = ({ id, title, progress: serverProgress, onDelete, setGoals }) => {
  
  
  const [localProgress, setLocalProgress] = useState(serverProgress);

  
  useEffect(() => {
    setLocalProgress(serverProgress);
  }, [serverProgress]);

  const getDynamicStatus = (val) => {
    if (val >= 60) return "On Track";
    if (val >= 30) return "At Risk";
    return "Off Track";
  };

  const currentStatus = getDynamicStatus(localProgress);

  const STATUS_STYLES = {
    "On Track": "bg-green-500/10 text-green-400 border-green-500/20",
    "At Risk": "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    "Off Track": "bg-red-500/10 text-red-400 border-red-500/20",
  };

  const BAR_COLORS = {
    "On Track": "#10b981",
    "At Risk": "#f59e0b",
    "Off Track": "#ef4444",
  };

  
  const debouncedUpdate = useCallback(
    debounce(async (val) => {
      try {
        await API.patch(`/goals/progress/${id}`, { 
          progress: val,
          status: getDynamicStatus(val)
        });
      } catch (err) {
        console.error("Background sync failed", err);
      }
    }, 500),
    [id]
  );

  const handleSliderChange = (e) => {
    const newProgress = parseInt(e.target.value);
    
    setLocalProgress(newProgress);
    
    setGoals((prev) =>
      prev.map((g) => (g._id === id ? { ...g, progress: newProgress } : g))
    );

    debouncedUpdate(newProgress);
  };

  return (
    <div className="group relative rounded-2xl bg-[#1b1b1b] border border-white/5 mb-6 p-6 transition-all">
      <button
        type="button"
        onClick={() => onDelete(id)}
        className="absolute -top-2 -right-2 z-20 rounded-full border border-white/10 bg-[#1b1b1b] p-2 text-gray-400 opacity-0 transition-all duration-200 group-hover:opacity-100 hover:border-red-500/50 hover:bg-red-500/20 hover:text-red-500"
        aria-label="Delete goal"
        title="Delete goal"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="16"
          height="16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M3 6h18" />
          <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
          <path d="M6 6l1 14a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-14" />
          <path d="M10 11v6" />
          <path d="M14 11v6" />
        </svg>
      </button>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-sm font-semibold text-gray-100">{title}</h3>
        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border transition-colors duration-200 ${STATUS_STYLES[currentStatus]}`}>
          {currentStatus}
        </span>
      </div>

      <div className="relative w-full h-2 mt-4">
        <input
          type="range"
          min="0"
          max="100"
          value={localProgress}
          onChange={handleSliderChange}
          className="absolute inset-0 w-full h-2 bg-white/5 rounded-full appearance-none cursor-pointer z-10 accent-white outline-none"
          style={{
            background: `linear-gradient(to right, ${BAR_COLORS[currentStatus]} ${localProgress}%, transparent ${localProgress}%)`,
          }}
        />
        <div className="absolute inset-0 w-full h-2 bg-white/5 rounded-full border border-white/5 -z-0" />
      </div>

      <div className="flex justify-between items-center mt-3">
        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-tighter">Progress</p>
        <p className="text-[10px] font-bold" style={{ color: BAR_COLORS[currentStatus] }}>{localProgress}%</p>
      </div>
    </div>
  );
};

export default memo(ActiveGoal);