import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import API from "../../../services/api";
import { CheckCircle, Trash2, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CompletedGoals = () => {
  const [completedGoals, setCompletedGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCompleted = async () => {
      try {
        const { data } = await API.get("/goals/all");
        
        setCompletedGoals(data.filter(g => g.progress === 100));
      } catch (err) {
        console.error("Error fetching archive:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCompleted();
  }, []);

  const handleDelete = async (id) => {
    try {
      await API.delete(`/goals/${id}`);
      setCompletedGoals(prev => prev.filter(g => g._id !== id));
    } catch (err) {
      alert("Failed to delete record");
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white p-8">
      <div className="max-w-4xl mx-auto">
        
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors mb-10 group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          Back to Dashboard
        </button>

        <header className="mb-12">
          <h1 className="text-4xl font-bold mb-2">Goal Archive</h1>
          <p className="text-zinc-500">A timeline of everything you've conquered.</p>
        </header>

        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map(i => <div key={i} className="h-20 bg-white/5 rounded-2xl animate-pulse" />)}
          </div>
        ) : completedGoals.length === 0 ? (
          <div className="text-center py-20 bg-white/5 rounded-[2.5rem] border border-dashed border-white/10">
            <p className="text-zinc-500">No completed goals yet. Keep pushing!</p>
          </div>
        ) : (
          <div className="grid gap-4">
            <AnimatePresence>
              {completedGoals.map((goal) => (
                <motion.div
                  key={goal._id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-zinc-900/40 border border-white/5 p-6 rounded-2xl flex justify-between items-center group hover:border-emerald-500/30 transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-emerald-500/10 rounded-full text-emerald-500">
                      <CheckCircle size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{goal.title}</h3>
                      <p className="text-xs text-zinc-500">
                        Finished on {new Date(goal.updatedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <button 
                    onClick={() => handleDelete(goal._id)}
                    className="opacity-0 group-hover:opacity-100 p-2 text-zinc-500 hover:text-red-400 transition-all"
                  >
                    <Trash2 size={18} />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompletedGoals;