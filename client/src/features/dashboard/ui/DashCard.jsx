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

  return (
    <div className="bg-[#111] border border-white/5 p-8 rounded-[2rem] relative overflow-hidden">
      <div className="relative z-10">
        <p className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-4">
          {title}
        </p>
        
        
        <h2 ref={countRef} className="text-5xl font-bold text-white mb-4">
          0
        </h2>

        <div className="flex items-center gap-2">
          <span className={`w-1.5 h-1.5 rounded-full ${colorMap[color]} animate-pulse`} />
          <p className="text-gray-500 text-[10px] font-medium tracking-tight">{trend}</p>
        </div>
      </div>
    </div>
  );
};

export default DashCard;