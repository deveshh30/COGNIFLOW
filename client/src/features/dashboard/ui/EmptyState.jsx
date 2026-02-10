import { PlusCircle } from "lucide-react";


const EmptyState = ({ onOpenModal }) => {
  return (
    <div className="col-span-full h-60 rounded-3xl 
      border border-white/5 bg-[#141414] 
      flex flex-col items-center justify-center text-center gap-3">

      <p className="text-lg font-semibold text-gray-200">
        No active goals yet
      </p>

      <p className="text-sm text-gray-400 max-w-xs">
        Start by creating your first goal and track progress here.
      </p>


      <button 
        onClick={onOpenModal} 
        className="flex items-center gap-2 px-4 py-2 rounded-xl 
        bg-[#ff6600] text-black font-medium hover:opacity-90 transition-all active:scale-95"
      >
        <PlusCircle size={16} />
        Create Goal
      </button>
    </div>
  );
};

export default EmptyState;