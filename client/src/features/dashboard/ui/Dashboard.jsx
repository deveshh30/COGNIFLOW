import React, { useState } from "react";
import DashHeader from "./DashHeader";
import DashCard from "./DashCard";
import StatCard from "./StatCard";
import SkeletonStatCard from "./SkeletonStatCard";
import EmptyState from "./EmptyState";
import ActiveGoal from "./ActiveGoal";
import useDashboardData from "../../../hooks/useDashboard";
import { motion , AnimatePresence} from "framer-motion";

const Dashboard = () => {
  
  const [isModalOpen, setIsmodalOpen] = useState(false);
  const [goals, setGoals] = useState([]);

  
  const handleAddGoal = (name) => {
    if (!name || name.trim() === "") return;
    
    const newGoal = {
      title: name,
      progress: 0,
      status: "On Track",
    };

    setGoals([...goals, newGoal]); 
    setIsmodalOpen(false); 
  };

  const handleDeleteGoal = (indexToDelete) => {
    const updatedGoals = goals.filter((_, index) => index !== indexToDelete);
    setGoals(updatedGoals);
  }

  const { data, loading } = useDashboardData();

  const gridClassName = `grid grid-cols-1 md:grid-cols-2 gap-8 ${
    !loading && data.length === 2
      ? "lg:grid-cols-2 lg:justify-center"
      : "lg:grid-cols-3"
  }`;

  return (

    <div className="min-h-screen bg-[#050505] relative overflow-hidden pb-20">
      
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[40%] bg-purple-900/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 space-y-12">
        
        <DashHeader onOpenModal={() => setIsmodalOpen(true)} />

        <div className="max-w-7xl mx-auto px-6 space-y-12">


          <section>
            <DashCard />
          </section>


          <section>
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
          </section>


          <section className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-white text-2xl font-bold tracking-tight">Active Goals</h2>
              <span className="text-gray-500 text-sm font-medium bg-white/5 px-3 py-1 rounded-full border border-white/5">
                {goals.length} Ongoing
              </span>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              <AnimatePresence>
      {goals.map((goal, index) => (
        <motion.div
          key={goal.title} // IMPORTANT: Use a unique ID or title, NOT the index for animations
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 50, scale: 0.95 }}
          transition={{ duration: 0.5 }}
        >
          <ActiveGoal
            index={index}
            onDelete={handleDeleteGoal}
            {...goal}
          />
        </motion.div>
      ))}
    </AnimatePresence>
            </div>
          </section>
        </div>
      </div>


      {isModalOpen && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={() => setIsmodalOpen(false)}
        >
          <div 
            className="bg-[#141414]/90 backdrop-blur-2xl border border-white/10 p-8 md:p-10 rounded-[2.5rem] text-white w-full max-w-md shadow-2xl animate-in fade-in zoom-in duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-3xl font-bold mb-2">New Goal</h2>
            <p className="text-gray-400 text-sm mb-8">What is your next focus area?</p>

            <div className="space-y-6">
              <div>
                <label className="text-[10px] uppercase tracking-widest text-gray-500 mb-2 block ml-1">Title</label>
                <input 
                  autoFocus
                  id="goalInput"
                  type="text"
                  placeholder="e.g. Master React Hooks"
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
                  Create
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