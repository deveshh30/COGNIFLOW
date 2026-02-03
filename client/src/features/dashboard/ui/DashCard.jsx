import ActiveGoal from "./ActiveGoal";
import StatCard from "./StatCard";

const stats = [
  { label: "Total Goals", value: 12, meta: "+2 this week" },
  { label: "Completed Goals", value: 7, meta: "58% completion", progress: 58 },
  { label: "Streaks", value: 5, suffix: " days", meta: "Best: 12" },
  { label: "Weekly Progress", value: 65, suffix: "%", meta: "↑ 10%", progress: 65 },
];

const activeGoals = [
  { title: "DSA Practice", progress: 40, status: "On Track" },
  { title: "React Project", progress: 70, status: "At Risk" },
  ]

const DashCard = () => (
  <div className="min-h-screen w-full bg-[#141414] px-6 pt-16">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, i) => (
          <StatCard key={i} {...stat} />
        ))}
      </div>

      <h2 className="mt-14 mb-6 ml-2 text-xl font-semibold text-gray-200">
        Active Goals
      </h2>
      
      {activeGoals.map((goal,index) => (  

      <ActiveGoal
      key={index}
      title={goal.title}
      progress={goal.progress}
      status={goal.status}
      />

      ))};

    
    
    </div>
  </div>
);

export default DashCard;
