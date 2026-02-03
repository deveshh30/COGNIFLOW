import ProgressBar from "./Bar"


const ActiveGoal = ({title, progress, value}) => {
  return (
    <div className=' rounded-2xl border border-white/5 bg-[#1a1a1a] p-5 mt-15'>
      <div className="flex justify-between items-center">
        <h3 className='text-white font-semibold'>{title}</h3>
        <span className="text-xs text-gray-400">{value}</span>
      </div>
      <ProgressBar value={progress}/>
    </div>
  )
}

export default ActiveGoal
