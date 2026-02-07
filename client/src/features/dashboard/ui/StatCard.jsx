import ProgressBar from "./Bar.jsx";
import CountUp from "./CountUp.jsx";
import useInView from "../../../hooks/useInView";
import { TrendingUp, TrendingDown, TrendingUpDown } from "lucide-react";

// Optimized for GPU performance and Crystal aesthetics
const cardBase =
  "relative rounded-3xl border border-white/10 " +
  "backdrop-blur-md bg-white/[0.03] " + // The "Crystal" effect
  "shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] " +
  "transition-all duration-300 ease-out " +
  "hover:bg-white/[0.06] hover:border-white/20 " +
  "transform-gpu will-change-transform " + // GPU Acceleration
  "hover:-translate-y-1 " +
  "h-[220px] w-full p-6 flex flex-col justify-between overflow-hidden";

const TREND_ARROW = {
  up: { icon: TrendingUp, color: "text-emerald-400" },
  down: { icon: TrendingDown, color: "text-rose-400" },
  neutral: { icon: TrendingUpDown, color: "text-gray-400" },
};

const StatCard = ({
  label,
  value,
  meta,
  progress,
  trend = "neutral",
  status,
  suffix = "",
}) => {
  const { ref, isVisible } = useInView();
  const trendConfig = TREND_ARROW[trend] || TREND_ARROW.neutral;
  const Icon = trendConfig.icon;

  return (
    <div ref={ref} className={cardBase}>
      {/* Subtle top-light effect for crystal depth */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-semibold">
        {label}
      </p>

      <div className="relative z-10">
        <p className="text-5xl font-bold text-white tracking-tight">
          {isVisible && <CountUp value={value} />}
          <span className="text-2xl ml-1 text-gray-400">{suffix}</span>
        </p>

        <div className="text-sm mt-2 flex items-center gap-1.5">
          <div className={`p-1 rounded-md ${trendConfig.color} bg-current/10`}>
            <Icon className="w-3.5 h-3.5" />
          </div>
          <span className="text-gray-400 font-medium">{meta}</span>
        </div>
      </div>

      {progress !== undefined && isVisible && (
        <div className="pt-2">
          <ProgressBar value={progress} status={status} />
        </div>
      )}
    </div>
  );
};

export default StatCard;