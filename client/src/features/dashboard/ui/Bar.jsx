import React from 'react'

const ProgressBar = ({value}) => {
  return (
    <div className="mt-4">

      <div className="w-full h-2 rounded-full bg-[#2a2a2a] overflow-hidden">

        <div
          className="h-full rounded-full bg-gradient-to-r from-blue-500 to-blue-400 transition-all duration-700 ease-out"
          style={{ width: `${value}%` }}
        />
      </div>


      <p className="text-xs text-gray-400 mt-2">{value}% completed</p>
    </div>
  )
}

export default ProgressBar
