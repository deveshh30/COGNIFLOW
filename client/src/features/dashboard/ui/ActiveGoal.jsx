import ProgressBar from "./Bar";

const ActiveGoal = ({ id, title, progress, status, onDelete }) => {
  const STATUS_STYLES = {
    "On Track": "bg-green-500/10 text-green-400 border-green-500/20",
    "At Risk": "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    "Off Track": "bg-red-500/10 text-red-400 border-red-500/20",
  };

  return (
    
    <div className="group relative rounded-2xl bg-[#1b1b1b] border border-white/5 mb-6 p-5 shadow transition-all hover:border-white/10">

      <button 
        onClick={() => onDelete(id)}
        /* The opacity-0 will now change to 100 when you hover the card */
        className="absolute -top-2 -right-2 z-20 bg-[#1b1b1b] border border-white/10 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500/20 hover:border-red-500/50 text-gray-400 hover:text-red-500"
        title="Delete Goal"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="16"
          height="16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-gray-400 group-hover:text-red-500"
          aria-hidden="true"
        >
          <path d="M3 6h18" />
          <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
          <path d="M6 6l1 14a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-14" />
          <path d="M10 11v6" />
          <path d="M14 11v6" />
        </svg>
      </button>

      <div className="flex items-center justify-between mb-4">
        
        <h3 className="text-sm font-medium text-gray-100 group-hover:text-blue-400 transition-colors">
          {title}
        </h3>

        <span
          className={`text-xs px-2 py-1 rounded-md border ${
            STATUS_STYLES[status] ||
            "bg-gray-500/10 text-gray-400 border-gray-500/20"
          }`}
        >
          {status}
        </span>
      </div>

      <ProgressBar value={progress} status={status} />
    </div>
  );
};

export default ActiveGoal;