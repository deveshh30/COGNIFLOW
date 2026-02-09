import ActiveGoal from "./ActiveGoal";
import StatCard from "./StatCard";

const stats = [
  { 
    label: "Total Goals", 
    value: 12, 
    meta: "+2 this week",
    trend : "up",
  },
  { 
    label: "Completed Goals", 
    value: 7, 
    meta: "58% completion", 
    progress: 58 ,
    trend : "up",
  },
  { 
    label: "Streaks", 
    value: 5, suffix: " days", 
    meta: "Best : 12",
    trend : "neutral",
  },
  {
    label: "Weekly Progress",
    value: 65,
    suffix: "%",
    meta: "↑ 10%",
    progress: 65,
    trend : "down",
  },
];

// const activeGoals = [
//   { title: "DSA Practice", progress: 40, status: "On Track" },
//   { title: "React Project", progress: 70, status: "At Risk" },
// ];

const DashCard = () => (
  <div className="w-full h-auto bg-[#1a1a1a] border border-white/5 rounded-[2.5rem] p-8 overflow-hidden rounded-4xl px-6 pt-16 py-30 justify-center">
    <div className="max-w-7xl  mx-auto">
      <div className="grid bg-black/10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, i) => (
          <StatCard key={i} {...stat} />
        ))}
      </div>
    </div>
  </div>
);

export default DashCard;
