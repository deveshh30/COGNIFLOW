import { useEffect, useRef } from "react";
import { animate } from "framer-motion";

const DashCard = ({ title, value, trend, color }) => {
  const countRef = useRef(null);

  useEffect(() => {
    
    const numericTarget = typeof value === "string" ? parseInt(value) : value;
    
    
    const currentVal = parseInt(countRef.current.textContent) || 0;

    
    const controls = animate(currentVal, numericTarget, {
      duration: 1.2,
      ease: "easeOut",
      onUpdate(latest) {
        if (countRef.current) {
          const suffix = typeof value === "string" && value.includes("%") ? "%" : "";
          countRef.current.textContent = Math.round(latest) + suffix;
        }
      },
    });

    return () => controls.stop();
  }, [value]); 

  const colorMap = {
    blue: "bg-blue-500",
    emerald: "bg-emerald-500",
    amber: "bg-amber-500",
  };

  const glowColorMap = {
    blue: "group-hover:shadow-[0_0_40px_rgba(59,130,246,0.15)]",
    emerald: "group-hover:shadow-[0_0_40px_rgba(16,185,129,0.15)]",
    amber: "group-hover:shadow-[0_0_40px_rgba(245,158,11,0.15)]",
  };

  return (
    <div className={`group bg-[#111] border border-white/5 p-8 rounded-[2rem] relative overflow-hidden transition-all duration-300 ease-out hover:border-white/10 hover:-translate-y-1 cursor-pointer ${glowColorMap[color]}`}>
      <div className="relative z-10">
        <p className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-4 transition-colors group-hover:text-gray-400">
          {title}
        </p>
        
        
        <h2 ref={countRef} className="text-5xl font-bold text-white mb-4 transition-transform group-hover:scale-105">
          0
        </h2>

        <div className="flex items-center gap-2">
          <span className={`w-1.5 h-1.5 rounded-full ${colorMap[color]} animate-pulse transition-transform group-hover:scale-125`} />
          <p className="text-gray-500 text-[10px] font-medium tracking-tight group-hover:text-gray-400 transition-colors">{trend}</p>
        </div>
      </div>
      
      {/* Subtle gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/0 group-hover:from-white/[0.02] group-hover:to-transparent transition-opacity duration-300 pointer-events-none" />
    </div>
  );
};

export default DashCard;