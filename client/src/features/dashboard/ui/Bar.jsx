import { useEffect, useState } from "react";

const BAR_COLORS = {
  "on track": "bg-green-500",
  "at risk": "bg-yellow-500",
  "off track": "bg-red-500",
};

const ProgressBar = ({ value, status }) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setWidth(value);
    }, 300);

    return () => clearTimeout(timeout);
  }, [value]);

  const normalizedStatus =
    typeof status === "string" ? status.trim().toLowerCase() : status;

  return (
    <div className="mt-4">
      <div className="w-full h-2 rounded-full bg-[#2a2a2a] overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ${
            BAR_COLORS["on track"] || "bg-gray-500"
          }`}
          style={{ width: `${width}%` }}
        />
      </div>

      <p className="text-xs text-gray-400 mt-2">{value}% completed</p>
    </div>
  );
};

export default ProgressBar;
