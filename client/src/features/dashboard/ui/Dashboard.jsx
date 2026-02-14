import { useEffect, useMemo, useState } from "react";
import { socket } from "../../../services/Socket";
import DashHeader from "./DashHeader";
import DashCard from "./DashCard";
import EmptyState from "./EmptyState";
import ActiveGoal from "./ActiveGoal";
import { motion, AnimatePresence } from "framer-motion";
import API from "../../../services/api";

const Dashboard = () => {
  const [isModalOpen, setIsmodalOpen] = useState(false);
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [goalInput, setGoalInput] = useState("");

  // 1. Calculate real stats from your database goals
  const stats = useMemo(() => {
    const totalGoals = goals.length;
    const avgProgress = totalGoals > 0 
      ? Math.round(goals.reduce((acc, goal) => acc + (goal.progress || 0), 0) / totalGoals) 
      : 0;
    const onTrackCount = goals.filter((g) => g.status === "On Track" || (g.progress || 0) > 0).length;

    return { totalGoals, avgProgress, onTrackCount };
  }, [goals]);

  // 2. Load data from Backend
  useEffect(() => {
    const fetchGoals = async () => {
      try {
        setLoading(true);
        const { data } = await API.get("/goals/all");
        setGoals(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchGoals();
  }, []);

  useEffect(() => {
    socket.on("goal-added", (newGoal) => {
      setGoals((prev) => {
        const isDuplicate = prev.some((g) => g._id === newGoal._id);
        if (isDuplicate) {
          return prev; 
        }
        return [newGoal, ...prev]; 
      });
    });

    socket.on("goal-progress-updated", ({ id, progress }) => {
      setGoals((prev) =>
        prev.map((g) => (g._id === id ? { ...g, progress } : g))
      );
    });

    socket.on("goal-deleted", (deletedId) => {
      setGoals((prev) => prev.filter((g) => g._id !== deletedId));
    });

    return () => {
      socket.off("goal-added");
      socket.off("goal-progress-updated");
      socket.off("goal-deleted");
    };
  }, []);

  


  


  const handleAddGoal = async (name) => {
    const value = (name ?? goalInput).trim();
    if (!value) return;
    try {
      const { data } = await API.post("/goals/add", { title: value });
      setGoals((prev) => [data, ...prev]);
      setIsmodalOpen(false);
      setGoalInput("");
    } catch (err) {
      alert("Error adding goal");
    }
  };

  const handleDeleteGoal = async (id) => {
    try {
      await API.delete(`/goals/${id}`);
      setGoals((prev) => prev.filter((g) => g._id !== id));
    } catch (err) {
      alert("Error deleting goal");
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] relative overflow-hidden pb-20 font-sans">
      {/* Background Lighting */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[40%] bg-purple-900/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10">
        <DashHeader
          onOpenModal={() => {
            setGoalInput("");
            setIsmodalOpen(true);
          }}
        />

        <div className="max-w-7xl mx-auto px-6 mt-12 space-y-16">
          
          {/* TOP STATS  */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <DashCard 
              title="Total Goals" 
              value={stats.totalGoals} 
              trend="+1 this week" 
              color="blue"
            />
            <DashCard 
              title="Avg. Progress" 
              value={`${stats.avgProgress}%`} 
              trend="Overall completion" 
              color="emerald"
            />
            <DashCard 
              title="On Track" 
              value={stats.onTrackCount} 
              trend="Active focus" 
              color="amber"
            />
          </section>

          {/*  SECTION 2: ACTIVE GOALS LIST */}
          <section className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-white text-2xl font-bold tracking-tight">Active Goals</h2>
              <div className="text-gray-500 text-xs font-semibold bg-white/5 px-4 py-1.5 rounded-full border border-white/5 uppercase tracking-wider">
                {goals.length} Ongoing
              </div>
            </div>
            
            {loading && (
              <div className="grid grid-cols-1 gap-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div
                    key={`goal-skel-${i}`}
                    className="h-22 rounded-2xl border border-white/10 bg-white/5 animate-pulse"
                  />
                ))}
              </div>
            )}

            {!loading && goals.length === 0 && (
              <EmptyState onOpenModal={() => setIsmodalOpen(true)} />
            )}

            {!loading && (
              <div className="grid grid-cols-1 gap-4">
                <AnimatePresence mode="popLayout">
                  {goals.map((goal) => (
                    <motion.div
                      key={goal._id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: 30, scale: 0.98 }}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    >
                      <ActiveGoal
                        key={goal._id}
                        id={goal._id}
                        onDelete={handleDeleteGoal}
                        setGoals={setGoals} 
                        {...goal}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </section>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-100 flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
          onClick={() => {
            setIsmodalOpen(false);
            setGoalInput("");
          }}
        >
          <div
            className="bg-[#111] border border-white/10 p-10 rounded-[2.5rem] text-white w-full max-w-md shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-3xl font-bold mb-2">New Goal</h2>
            <p className="text-gray-400 text-sm mb-8">Set your next milestone</p>
            <input 
              autoFocus
              id="goalInput"
              type="text"
              placeholder="e.g. Learn Backend"
              value={goalInput}
              onChange={(e) => setGoalInput(e.target.value)}
              className="w-full bg-white/5 border border-white/10 px-6 py-4 rounded-2xl focus:border-blue-500 outline-none transition-all mb-6"
              onKeyDown={(e) => e.key === "Enter" && handleAddGoal()}
            />
            <div className="flex gap-4">
              <button
                onClick={() => handleAddGoal()}
                disabled={!goalInput.trim()}
                className="flex-1 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed py-4 rounded-2xl font-bold transition-all"
              >
                Create
              </button>
              <button
                onClick={() => {
                  setIsmodalOpen(false);
                  setGoalInput("");
                }}
                className="px-8 py-4 rounded-2xl bg-white/5 hover:bg-white/10 text-gray-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;