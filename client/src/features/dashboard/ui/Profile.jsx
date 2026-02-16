import React, { useMemo, useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { 
  Box, Container, Typography, Grid, Paper, Avatar, 
  Divider, CircularProgress 
} from "@mui/material";
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer 
} from "recharts";
import { Trophy, Zap, Calendar } from "lucide-react";

const Profile = ({ goals = [] }) => {
  const { user } = useContext(AuthContext);

  const stats = useMemo(() => {
    const completed = goals.filter(g => g.progress === 100);
    const totalCompletedCount = completed.length;
    
    const efficiencyRate = goals.length > 0 ? Math.round((totalCompletedCount / goals.length) * 100) : 0;

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const recentWins = completed.filter(g => new Date(g.updatedAt) > sevenDaysAgo).length;

    return { totalCompletedCount, efficiencyRate, recentWins };
  }, [goals]);

  const chartData = useMemo(() => {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const last6Months = [];
    
    for (let i = 5; i >= 0; i--) {
      const d = new Date();
      d.setMonth(d.getMonth() - i);
      const mName = monthNames[d.getMonth()];
      
      const count = goals.filter(g => {
        const goalDate = new Date(g.updatedAt);
        return g.progress === 100 && 
               goalDate.getMonth() === d.getMonth() && 
               goalDate.getFullYear() === d.getFullYear();
      }).length;

      last6Months.push({ name: mName, completed: count });
    }
    return last6Months;
  }, [goals]);

  if (!user) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', bgcolor: '#050505' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#050505', color: 'white', pt: 4, pb: 8 }}>
      <Container maxWidth="lg">
        
        <Box sx={{ mb: 6, display: 'flex', alignItems: 'center', gap: 3 }}>
          <Avatar 
            src={user.avatar || `https://api.dicebear.com/7.x/bottts/svg?seed=${user.name}`}
            sx={{ width: 100, height: 100, border: '3px solid #3b82f6', p: 0.5 }}
          />
          <Box>
            <Typography variant="h3" fontWeight={800} sx={{ letterSpacing: '-1px' }}>
              {user.name}
            </Typography>
            <Typography sx={{ color: '#cbd5e1', display: 'flex', alignItems: 'center', gap: 1 }}>
              <Calendar size={16} /> Member since {new Date(user.createdAt || Date.now()).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </Typography>
          </Box>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 4, bgcolor: '#111', borderRadius: '24px', border: '1px solid #222', height: '100%' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <Trophy color="#10b981" />
                <Typography fontWeight={600} sx={{ color: '#ECF4EF' }}>TOTAL COMPLETED</Typography>
              </Box>
              <Typography variant="h1" sx={{color : '#ECF4EF' , fontWeight: 800}}>{stats.totalCompletedCount}</Typography>
              <Typography sx={{ color: '#10b981', mt: 1, fontSize: '0.9rem', fontWeight: 600 }}>
                +{stats.recentWins} this week
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 4, bgcolor: '#111', borderRadius: '24px', border: '1px solid #222' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
                <Typography variant="h6" fontWeight={700} color='#ECF4EF'>Improvement Trend</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#3b82f6' }}>
                  <Zap size={18} fill="#3b82f6" />
                  <Typography variant="body2" fontWeight={600}>{stats.efficiencyRate}% Efficiency</Typography>
                </Box>
              </Box>

              <Box sx={{ width: '100%', height: 220 }}>
                <ResponsiveContainer>
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="colorFinish" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#222" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#666', fontSize: 12}} dy={10} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#111', border: '1px solid #333', borderRadius: '12px' }}
                      itemStyle={{ color: '#3b82f6', fontWeight: 'bold' }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="completed" 
                      stroke="#3b82f6" 
                      strokeWidth={3}
                      fillOpacity={1} 
                      fill="url(#colorFinish)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12}>
             <Paper sx={{ p: 3, bgcolor: '#111', borderRadius: '20px', border: '1px solid #222', display: 'flex', justifyContent: 'space-around', textAlign: 'center' }}>
                <Box>
                  <Typography variant="caption" sx={{ color: '#d4d4d8' }}>ACTIVE GOALS</Typography>
                  <Typography variant="h6" sx={{color : '#3b82f6', fontWeight : 600}} >{goals.length - stats.totalCompletedCount}</Typography>
                </Box>
                <Divider orientation="vertical" flexItem sx={{ bgcolor: '#222' }} />
                <Box>
                  <Typography variant="caption" sx={{ color: '#d4d4d8' }}>FOCUS SCORE</Typography>
                  <Typography variant="h6" fontWeight={700} color="#3b82f6">Excellent</Typography>
                </Box>
             </Paper>
          </Grid>
        </Grid>

      </Container>
    </Box>
  );
};

export default Profile;