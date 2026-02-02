import React, { useEffect, useState } from 'react'

const ProgressBar = ({value}) => {

    const getColor = (value) => {
    if (value < 40) return "bg-red-500";
    if (value < 70) return "bg-yellow-400";
    return "bg-emerald-500";
  };


  const [width, setWidth] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setWidth(value);
    }, 300); //100 is to add delay

    return () => clearTimeout(timeout);
  }, [value]);
  return (
    <div className="mt-4">

      <div className="w-full h-2 rounded-full bg-[#2a2a2a] overflow-hidden">

        <div
          className={`h-full rounded-full transition-all duration-700 ease-out ${getColor(value)}`}
          style={{ width: `${width}%` }}
        />
      </div>


      <p className="text-xs text-gray-400 mt-2">{value}% completed</p>
    </div>
  )
}

export default ProgressBar
