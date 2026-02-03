import StatCard from "./StatCard";

const stats = [
  { label: "Total Goals", value: 12, meta: "+2 this week" },
  { label: "Completed Goals", value: 7, meta: "58% completion", progress: 58 },
  { label: "Streaks", value: 5, suffix: " days", meta: "Best: 12" },
  { label: "Weekly Progress", value: 65, suffix: "%", meta: "↑ 10%", progress: 65 },
];

const DashCard = () => (
  <div className="min-h-screen w-full bg-[#141414] px-6 pt-16">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, i) => (
          <StatCard key={i} {...stat} />
        ))}
      </div>
    </div>
  </div>
);

export default DashCard;
