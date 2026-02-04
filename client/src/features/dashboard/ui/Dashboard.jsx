import DashHeader from './DashHeader'
import DashCard from './DashCard'
import StatCard from './StatCard'
import SkeletonStatCard from './SkeletonStatCard'
import EmptyState from './EmptyState'
import useDashboardData from '../../../hooks/useDashboard'

const Dashboard = () => {
  const { data, loading } = useDashboardData()

  return (
    <div className="space-y-6">
      <DashHeader />
      <DashCard />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading &&
          Array.from({ length: 3 }).map((_, i) => (
            <SkeletonStatCard key={i} />
          ))}

        {!loading && data.length === 0 && <EmptyState />}

        {!loading &&
          data.map((item, i) => (
            <StatCard key={i} {...item} />
          ))}
      </div>
    </div>
  )
}

export default Dashboard
