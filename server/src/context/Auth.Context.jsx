import { createContext, useEffect, useState } from "react";
import API from '../service/api.js';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] useState(true);

    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        if(savedUser) setUser(JSON.parse(savedUser));
        setLoading(false);
    }, []);

    const login = async (email, password) => {
    const { data } = await API.post('/auth/login', { email, password });
    setUser(data.data.user);
    localStorage.setItem('token', data.data.token);
    localStorage.setItem('user', JSON.stringify(data.data.user));
  };

  const logout = () => {
    setUser(null);
    localStorage.clear();
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
