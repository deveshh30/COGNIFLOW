
import ProgressBar from "./Bar.jsx";
import CountUp from "./CountUp.jsx";
import useInView from "../../../hooks/useInView";

const cardBase =
  "relative rounded-3xl border border-white/5 " +
  "bg-gradient-to-br from-[#1d1d1d] to-[#141414] " +
  "shadow-[0_14px_45px_rgba(0,0,0,0.7)] " +
  "transition-all duration-300 ease-out " +
  "hover:-translate-y-1 hover:shadow-[0_22px_70px_rgba(0,0,0,0.85)] " +
  "h-[240px] w-full p-6 flex flex-col justify-between";

const StatCard = ({ label, value, meta, progress, suffix = "" }) => {
  const { ref, isVisible } = useInView();

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
        <p className="text-sm text-gray-400 mt-1">{meta}</p>
      </div>

      {progress !== undefined && isVisible && (
        <ProgressBar value={progress} />
      )}
    </div>
  );
};

export default StatCard;
