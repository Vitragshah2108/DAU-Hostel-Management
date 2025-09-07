import React, { createContext, useContext, useMemo, useState, useEffect } from 'react';

export const AuthContext = createContext({
  user: null,
  token: null,
  isAuthenticated: false,
  role: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const t = localStorage.getItem('token');
    const u = localStorage.getItem('user');
    if (t) setToken(t);
    if (u) try { setUser(JSON.parse(u)); } catch {}
  }, []);

  const login = (nextUser, nextToken) => {
    setUser(nextUser);
    setToken(nextToken);
    if (nextToken) localStorage.setItem('token', nextToken);
    if (nextUser) localStorage.setItem('user', JSON.stringify(nextUser));
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const value = useMemo(() => ({
    user,
    token,
    isAuthenticated: Boolean(token),
    role: user?.role || null,
    login,
    logout,
  }), [user, token]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);


