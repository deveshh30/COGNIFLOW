import React from "react";
import ProgressBar from "./Bar.jsx";

const cardBase =
  "relative rounded-3xl border border-white/5 " +
  "bg-gradient-to-br from-[#1d1d1d] to-[#141414] " + // B: depth via gradient
  "shadow-[0_14px_45px_rgba(0,0,0,0.7)] " +
  "transition-all duration-300 ease-out " +
  "hover:-translate-y-1 hover:shadow-[0_22px_70px_rgba(0,0,0,0.85)] " + // D: micro-interaction
  "h-[240px] w-full p-6 flex flex-col justify-between";

const stats = [
  {
    label: "Total Goals",
    value: "12",
    meta: "+2 this week",
  },
  {
    label: "Completed Goals",
    value: "7",
    meta: "58% completion",
    progress: 58,
  },
  {
    label: "Streaks",
    value: "5 days",
    meta: "Best: 12",
  },
  {
    label: "Weekly Progress",
    value: "65%",
    meta: "↑ 10%",
    progress: 65,
  },
];

const Stat = ({ label, value, meta, progress }) => (
  <div className={cardBase}>
    <p className="text-[11px] uppercase tracking-[0.2em] text-gray-400">
      {label}
    </p>

    <div>
      <p className="text-4xl font-bold text-gray-100">{value}</p>
      <p className="text-sm text-gray-400 mt-1">{meta}</p>
    </div>

    {progress !== undefined && <ProgressBar value={progress} />}
  </div>
);

const DashCard = () => {
  return (
    <div className="min-h-screen w-full bg-[#141414] px-6 pt-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <Stat
              key={index}
              label={stat.label}
              value={stat.value}
              meta={stat.meta}
              progress={stat.progress}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashCard;
