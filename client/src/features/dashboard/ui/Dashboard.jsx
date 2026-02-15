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
  const [deadlineInput, setDeadlineInput] = useState("");

  // 1. Calculate stats
  const stats = useMemo(() => {
    const totalGoals = goals.length;
    const avgProgress = totalGoals > 0 
      ? Math.round(goals.reduce((acc, goal) => acc + (goal.progress || 0), 0) / totalGoals) 
      : 0;
    const onTrackCount = goals.filter((g) => g.status === "On Track" || (g.progress || 0) > 0).length;

    return { totalGoals, avgProgress, onTrackCount };
  }, [goals]);

  // 2. Fetch Initial Data
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

  // 3. Socket Listeners
  useEffect(() => {
    socket.on("goal-added", (newGoal) => {
      setGoals((prev) => {
        const isDuplicate = prev.some((g) => g._id === newGoal._id);
        return isDuplicate ? prev : [newGoal, ...prev]; 
      });
    });

    socket.on("goal-progress-updated", ({ id, progress, status }) => {
      setGoals((prev) =>
        prev.map((g) => (g._id === id ? { ...g, progress, status } : g))
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

  const handleAddGoal = async () => {
    if (!goalInput.trim()) return;
    try {
      const payload = {
        title: goalInput.trim(),
        ...(deadlineInput && { deadline: deadlineInput })
      };
      const { data } = await API.post("/goals/add", payload);
      setGoals((prev) => {
        const isDuplicate = prev.some((g) => g._id === data._id);
        return isDuplicate ? prev : [data, ...prev];
      });
      setIsmodalOpen(false);
      setGoalInput("");
      setDeadlineInput("");
    } catch (err) {
      alert("Error adding goal");
    }
  };
  const completedCount = goals.filter(g => (g.progress || 0) === 100).length;

  const handleDeleteGoal = async (id) => {
    try {
      await API.delete(`/goals/${id}`);
      setGoals((prev) => prev.filter((g) => g._id !== id));
    } catch (err) {
      alert("Error deleting goal");
    }
  };

  // 4. Split Goals for the UI
  const activeGoals = goals.filter(g => (g.progress || 0) < 100);
  const completedGoals = goals.filter(g => (g.progress || 0) === 100);

  return (
    <div className="min-h-screen bg-[#050505] relative overflow-hidden pb-20 font-sans">
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-900/10 rounded-full blur-[30px] pointer-events-none" />
      
      <div className="relative z-10">
        <DashHeader onOpenModal={() => setIsmodalOpen(true)} completedCount={completedCount}/>

        <div className="max-w-7xl mx-auto px-6 mt-12 space-y-16">
          {/* STATS CARDS */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <DashCard title="Total Goals" value={stats.totalGoals} trend="+1 this week" color="blue" />
            <DashCard title="Avg. Progress" value={`${stats.avgProgress}%`} trend="Overall completion" color="emerald" />
            <DashCard title="On Track" value={stats.onTrackCount} trend="Active focus" color="amber" />
          </section>

          {/* MAIN LIST SECTION */}
          <section className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-24 rounded-2xl bg-white/5 animate-pulse" />
                ))}
              </div>
            ) : goals.length === 0 ? (
              <EmptyState onOpenModal={() => setIsmodalOpen(true)} />
            ) : (
              <div className="space-y-12">
                {/* ACTIVE GOALS */}
                <div>
                  <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-white">
                    Active Focus 
                    <span className="text-sm bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full">
                      {activeGoals.length}
                    </span>
                  </h2>
                  <div className="grid grid-cols-1 gap-4">
                    <AnimatePresence mode="popLayout">
                      {activeGoals.map((goal) => (
                        <motion.div
                          key={goal._id}
                          layout
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                        >
                          <ActiveGoal
                            {...goal}
                            id={goal._id}
                            onDelete={handleDeleteGoal}
                            setGoals={setGoals}
                          />
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>

                
              </div>
            )}
          </section>
        </div>
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            onClick={() => setIsmodalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-[#111] border border-white/10 p-10 rounded-[2.5rem] text-white w-full max-w-md shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-3xl font-bold mb-2">New Goal</h2>
              <p className="text-gray-400 text-sm mb-8">Set your next milestone</p>
              
              <div className="space-y-4">
                <input 
                  autoFocus
                  placeholder="e.g. Learn Backend"
                  value={goalInput}
                  onChange={(e) => setGoalInput(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 px-6 py-4 rounded-2xl focus:border-blue-500 outline-none transition-all"
                  onKeyDown={(e) => e.key === "Enter" && handleAddGoal()}
                />
                
                <input 
                  type="date"
                  value={deadlineInput} 
                  onChange={(e) => setDeadlineInput(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 px-6 py-4 rounded-2xl focus:border-blue-500 outline-none transition-all text-zinc-300"
                />
              </div>

              <div className="flex gap-4 mt-8">
                <button
                  onClick={handleAddGoal}
                  disabled={!goalInput.trim()}
                  className="flex-1 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 py-4 rounded-2xl font-bold transition-all"
                >
                  Create
                </button>
                <button
                  onClick={() => setIsmodalOpen(false)}
                  className="px-8 py-4 rounded-2xl bg-white/5 hover:bg-white/10 text-gray-300 transition-all"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dashboard;