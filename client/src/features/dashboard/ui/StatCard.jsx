import ProgressBar from "./Bar.jsx";
import CountUp from "./CountUp.jsx";
import useInView from "../../../hooks/useInView";
import { TrendingUp, TrendingDown, TrendingUpDown } from "lucide-react";

const cardBase =
  "relative rounded-3xl border border-white/5 " +
  "bg-gradient-to-br from-[#1d1d1d] to-[#141414] " +
  "shadow-[0_14px_45px_rgba(0,0,0,0.7)] " +
  "transition-all duration-300 ease-out " +
  "hover:-translate-y-1 hover:shadow-[0_22px_70px_rgba(0,0,0,0.85)] " +
  "h-[240px] w-full p-6 flex flex-col justify-between";

const TREND_ARROW = {
  up: {
    icon: TrendingUp,
    color: "text-green-400",
  },
  down: {
    icon: TrendingDown,
    color: "text-red-400",
  },
  neutral: {
    icon: TrendingUpDown,
    color: "text-gray-400",
  },
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
      <p className="text-[11px] uppercase tracking-[0.2em] text-gray-400">
        {label}
      </p>

      <div>
        <p className="text-4xl font-bold text-gray-100">
          {isVisible && <CountUp value={value} />}
          {suffix}
        </p>

        <p className="text-sm mt-1 flex items-center gap-1">
          <Icon className={`w-4 h-4 ${trendConfig.color}`} />
          <span className="text-gray-400">{meta}</span>
        </p>
      </div>

      {progress !== undefined && isVisible && (
        <ProgressBar value={progress} status={status} />
      )}
    </div>
  );
};

export default StatCard;
