import ProgressBar from "./Bar";

const ActiveGoal = ({ title, progress, status }) => {
  const STATUS_STYLES = {
    "On Track": "bg-green-500/10 text-green-400 border-green-500/20",
    "At Risk": "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    "Off Track": "bg-red-500/10 text-red-400 border-red-500/20",
  };

  return (
    <div className="rounded-2xl bg-[#1b1b1b] border border-white/5 mb-6 p-5 shadow transition-all hover:border-white/10">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-100">
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