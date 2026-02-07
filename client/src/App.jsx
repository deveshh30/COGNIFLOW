import { AuthProvider } from './context/AuthContext';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Login from './features/auth/Login';
import SignUp from './features/auth/SignUp';
import Dashboard from './features/dashboard/ui/Dashboard';

function App() {
  return (
    <AuthProvider> 
      <Router>
        <main className="min-h-screen bg-[#050505]">
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />

            <Route path="/dashboard" element={<Dashboard />} />

            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </main>
      </Router>
    </AuthProvider>
  );
}

export default App;