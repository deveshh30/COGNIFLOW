import DashHeader from './DashHeader'
import DashCard from './DashCard'
import StatCard from './StatCard'
import SkeletonStatCard from './SkeletonStatCard'
import EmptyState from './EmptyState'
import useDashboardData from '../../../hooks/useDashboard'

const Dashboard = () => {
  const { data, loading } = useDashboardData()
  
  const gridClassName = `grid grid-cols-1 md:grid-cols-2 gap-8 ${
    !loading && data.length === 2 ? "lg:grid-cols-2 lg:justify-center" : "lg:grid-cols-3"
  }`

  return (
    // We add min-h-screen and a dark background with subtle radial glows
    <div className="min-h-screen bg-[#050505] relative overflow-hidden pb-20">
      
      {/* Background Accent Glows for depth */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[40%] bg-purple-900/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 space-y-10">
        {/* Your header logic */}
        <DashHeader />

        {/* Main Banner / Welcome Area */}
        <div className="max-w-7xl mx-auto px-6">
           <DashCard />
        </div>

        {/* Stats Section with your dynamic grid */}
        <div className="max-w-7xl mx-auto px-6">
          <div className={gridClassName}>
            {loading &&
              Array.from({ length: 3 }).map((_, i) => (
                <SkeletonStatCard key={i} />
              ))}

            {!loading && data.length === 0 && (
              <div className="col-span-full py-10">
                <EmptyState />
              </div>
            )}

            {!loading &&
              data.map((item, i) => (
                // Applying the glass wrapper to your StatCard
                <div key={i} className="transition-all duration-300 hover:translate-y-[-5px]">
                   <StatCard {...item} />
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard