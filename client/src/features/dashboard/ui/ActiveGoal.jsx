import React, { useState, useEffect, useCallback } from "react";
import debounce from "lodash/debounce";
import confetti from 'canvas-confetti';
import API from "../../../services/api";

const ActiveGoal = ({ id, title, progress: serverProgress, status, deadline, onDelete, setGoals }) => {
  
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
    "On Track": "#10b981", // Emerald 500
    "At Risk": "#f59e0b",  // Amber 500
    "Off Track": "#ef4444", // Red 500
  };

  const activeColor = BAR_COLORS[currentStatus];


  const getDeadlineInfo = (dateValue) => {
    if (!dateValue) return { formattedDate: null, daysLeft: null };
    const target = new Date(dateValue);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const diffTime = target - today;
    const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const formattedDate = target.toLocaleDateString("en-US", { month: "short", day: "numeric" });

    return { formattedDate, daysLeft };
  };

  const { formattedDate, daysLeft } = getDeadlineInfo(deadline);

  const getPriorityStyles = (p) => {
  switch (p) {
    case "High": return "bg-red-500/10 text-red-500 border-red-500/20";
    case "Medium": return "bg-amber-500/10 text-amber-500 border-amber-500/20";
    case "Low": return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
    default: return "bg-zinc-500/10 text-zinc-400 border-white/10";
  }
};

  
  const debouncedUpdate = useCallback(
    debounce(async (val) => {
      try {
        await API.patch(`/goals/progress/${id}`, { 
          progress: val,
          status: getDynamicStatus(val) 
        });
      } catch (err) {
        console.error("Database sync failed", err);
      }
    }, 500),
    [id]
  );

  const handleSliderChange = (e) => {
    const newProgress = parseInt(e.target.value);
    setLocalProgress(newProgress);
    
    if (newProgress === 100) {
      confetti({
        particleCount : 40,
        spread : 50,
        origin: { y: 0.8 },
        colors: ['#3b82f6', '#10b981', '#ffffff'],
        zIndex: 999
      })
    }
    
    // Update Dashboard stats immediately
    setGoals((prev) =>
      prev.map((g) => (g._id === id ? { ...g, progress: newProgress, status: getDynamicStatus(newProgress) } : g))
    );

    debouncedUpdate(newProgress);
  };

  return (
    <div className="group relative rounded-2xl bg-[#1b1b1b] border border-white/5 mb-6 p-6 transition-all hover:border-white/20 shadow-xl">
      
      
      <button 
        onClick={() => onDelete(id)}
        className="absolute -top-2 -right-2 z-20 bg-[#1b1b1b] border border-white/10 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500/20 hover:border-red-500/50"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 hover:text-red-500">
          <path d="M3 6h18m-2 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
        </svg>
      </button>


      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-sm font-semibold text-gray-100 group-hover:text-blue-400 transition-colors">
            {title}
          </h3>
          <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold border ${getPriorityStyles(priority)}`}>
            {priority}
          </span>
          {formattedDate && (
            <p className="text-[10px] text-gray-500 font-medium mt-1 uppercase tracking-wider">
              Due: {formattedDate}
            </p>
          )}
        </div>
        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border uppercase tracking-wider transition-all duration-300 ${STATUS_STYLES[currentStatus]}`}>
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
            background: `linear-gradient(to right, ${activeColor} ${localProgress}%, transparent ${localProgress}%)`,
          }}
        />
        <div className="absolute inset-0 w-full h-2 bg-white/5 rounded-full border border-white/5 z-0" />
      </div>


      <div className="flex justify-between items-center mt-3">
        {daysLeft !== null ? (
          <p className={`text-[10px] font-bold uppercase tracking-widest ${daysLeft <= 2 ? 'text-red-500 animate-pulse' : 'text-gray-500'}`}>
            {daysLeft > 0 ? `${daysLeft} Days Remaining` : daysLeft === 0 ? "Due Today" : "Overdue"}
          </p>
        ) : (
          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Ongoing Goal</p>
        )}
        
        <p className="text-[10px] font-bold tracking-tighter" style={{ color: activeColor }}>
          {localProgress}%
        </p>
      </div>
    </div>
  );
};

export default ActiveGoal;