import React, { useState } from "react";
import DashHeader from "./DashHeader";
import DashCard from "./DashCard";
import StatCard from "./StatCard";
import SkeletonStatCard from "./SkeletonStatCard";
import EmptyState from "./EmptyState";
import ActiveGoal from "./ActiveGoal";
import useDashboardData from "../../../hooks/useDashboard";

const Dashboard = () => {
  // 1. STATE MANAGEMENT
  const [isModalOpen, setIsmodalOpen] = useState(false);
  const [goals, setGoals] = useState([
    { title: "DSA Practice", progress: 40, status: "On Track" },
    { title: "React Project", progress: 70, status: "At Risk" },
  ]);

  // 2. LOGIC: ADDING A NEW GOAL
  const handleAddGoal = (name) => {
    if (!name || name.trim() === "") return;
    
    const newGoal = {
      title: name,
      progress: 0,
      status: "On Track",
    };

    setGoals([...goals, newGoal]); // Updates the list instantly
    setIsmodalOpen(false); // Closes the modal
  };

  // 3. FETCHING DATA (Stat Cards)
  const { data, loading } = useDashboardData();

  const gridClassName = `grid grid-cols-1 md:grid-cols-2 gap-8 ${
    !loading && data.length === 2
      ? "lg:grid-cols-2 lg:justify-center"
      : "lg:grid-cols-3"
  }`;

  return (
    <div className="min-h-screen bg-[#050505] relative overflow-hidden pb-20">
      {/* BACKGROUND AMBIENCE */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[40%] bg-purple-900/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 space-y-10">
        {/* HEADER: Passing the open function as a prop */}
        <DashHeader onOpenModal={() => setIsmodalOpen(true)} />

        {/* HERO SECTION */}
        <div className="max-w-7xl mx-auto px-6">
          <DashCard />
        </div>

        {/* ACTIVE GOALS SECTION: The Dynamic List */}
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-white text-xl font-semibold mb-6">Active Goals</h2>
          <div className="space-y-4">
            {goals.map((goal, index) => (
              <ActiveGoal
                key={index}
                title={goal.title}
                progress={goal.progress}
                status={goal.status}
              />
            ))}
          </div>
        </div>

        {/* STATS GRID SECTION */}
        <div className="max-w-7xl mx-auto px-6">
          <div className={gridClassName}>
            {loading &&
              Array.from({ length: 3 }).map((_, i) => (
                <SkeletonStatCard key={i} />
              ))}

            {!loading && data.length === 0 && (
              <div className="col-span-full py-10">
                <EmptyState />
              </div>
            )}

            {!loading &&
              data.map((item, i) => (
                <div
                  key={i}
                  className="transition-all duration-300 hover:translate-y-[-5px]"
                >
                  <StatCard {...item} />
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* 4. THE CRYSTAL MODAL */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={() => setIsmodalOpen(false)}
        >
          <div 
            className="bg-[#141414]/90 backdrop-blur-2xl border border-white/10 p-8 md:p-10 rounded-[2.5rem] text-white w-full max-w-md shadow-2xl animate-in fade-in zoom-in duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-3xl font-bold mb-2">Create Goal</h2>
            <p className="text-gray-400 text-sm mb-8">Set a new milestone for your journey.</p>

            <div className="space-y-6">
              <div>
                <label className="text-[10px] uppercase tracking-widest text-gray-500 mb-2 block ml-1">Goal Title</label>
                <input 
                  autoFocus
                  id="goalInput"
                  type="text"
                  placeholder="e.g. Master Backend Node.js"
                  className="w-full bg-white/5 border border-white/10 px-5 py-4 rounded-2xl focus:outline-none focus:border-blue-500/50 transition-all text-white placeholder:text-gray-600"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleAddGoal(e.target.value);
                  }}
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button 
                  onClick={() => {
                    const val = document.getElementById('goalInput').value;
                    handleAddGoal(val);
                  }}
                  className="flex-1 bg-blue-600 hover:bg-blue-500 py-4 rounded-2xl font-bold transition-all shadow-lg shadow-blue-600/20"
                >
                  Create Goal
                </button>
                <button 
                  onClick={() => setIsmodalOpen(false)}
                  className="px-6 py-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-all border border-white/5 text-gray-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;