import React, { useState, useEffect, useCallback } from "react";
import debounce from "lodash/debounce"; 
import API from "../../../services/api";
import { motion, useSpring, useTransform, animate } from "framer-motion";

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

export default ActiveGoal;