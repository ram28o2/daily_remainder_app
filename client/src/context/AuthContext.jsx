import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const name = localStorage.getItem("name");
  
    if (token) {
      // Optional: Validate token from backend
      fetch("http://localhost:5000/api/auth/me", {
        credentials: "include"
      })
        .then(res => {
          if (res.ok) {
            setIsAuthenticated(true);
            setUserName(name || "");
          } else {
            logout(); // auto-logout on bad token
          }
        })
        .catch(() => logout());
    }
  }, []);
  

  const login = (token, name) => {
    localStorage.setItem("token", token);
    localStorage.setItem("name", name);
    setUserName(name);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    setUserName("");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userName, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};