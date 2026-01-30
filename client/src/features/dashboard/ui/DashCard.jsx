import React from 'react';

const cardBase =
  "bg-[#1f1f1f] rounded-3xl border border-white/5 " +
  "shadow-[0_12px_40px_rgba(0,0,0,0.65)] " +
  "hover:shadow-[0_18px_60px_rgba(0,0,0,0.75)] " +
  "hover:-translate-y-1 transition-all duration-300 ease-out " +
  "h-[320px] w-full max-w-[240px] p-6";

const DashCard = () => {
  return (
    <div className="min-h-screen w-full bg-[#141414] px-12 pt-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7 justify-items-center">

        <div className={cardBase}>
          <h3 className="text-sm font-medium text-gray-400 tracking-wide uppercase">
            Total Goals
          </h3>
        </div>

        <div className={cardBase}>
          <h3 className="text-sm font-medium text-gray-400 tracking-wide uppercase">
            Completed Goals
          </h3>
        </div>

        <div className={cardBase}>
          <h3 className="text-sm font-medium text-gray-400 tracking-wide uppercase">
            Streaks
          </h3>
        </div>

        <div className={cardBase}>
          <h3 className="text-sm font-medium text-gray-400 tracking-wide uppercase">
            Weekly Progress
          </h3>
        </div>

      </div>
    </div>
  );
};

export default DashCard;
