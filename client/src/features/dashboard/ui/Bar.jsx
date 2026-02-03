import { useEffect, useState } from "react";

const BAR_COLORS = {
  "On Track": "bg-green-500",
  "At Risk": "bg-yellow-500",
  "Off Track": "bg-red-500",
};

const ProgressBar = ({ value, status }) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setWidth(value);
    }, 300);

    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <div className="mt-4">
      <div className="w-full h-2 rounded-full bg-[#2a2a2a] overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ${
            BAR_COLORS[status] || "bg-gray-500"
          }`}
          style={{ width: `${width}%` }}
        />
      </div>

      <p className="text-xs text-gray-400 mt-2">{value}% completed</p>
    </div>
  );
};

export default ProgressBar;
