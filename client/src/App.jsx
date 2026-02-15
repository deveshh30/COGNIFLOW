import { AuthProvider } from './context/AuthContext';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Login from './features/auth/Login';
import SignUp from './features/auth/SignUp';
import Dashboard from './features/dashboard/ui/Dashboard';
import CompletedGoals from './features/dashboard/ui/CompletedGoal';

function App() {
  return (
    <AuthProvider> 
          <Router basename="/COGNIFLOW">
      
        <main className="min-h-screen bg-[#050505]">
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />

            <Route path="/dashboard" element={<Dashboard />} />

            <Route path="*" element={<Navigate to="/login" />} />
            <Route path="/archive" element={<CompletedGoals />} />
          </Routes>
        </main>
      
      </Router>
    </AuthProvider>
  );
}

export default App;