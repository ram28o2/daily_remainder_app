import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { AuthContext } from "./context/AuthContext";
import { useContext } from "react";

import Navbar from "./Components/Navbar";
import PrivateRoute from "./Components/PrivateRoute";

import Signup from "./Components/Signup";
import Login from "./Components/Login";
import Profile from "./Components/Profile";

import Home from "./pages/Home";
import Todo from "./pages/Todo";
import DailyTasks from "./pages/DailyTasks";
import Notes from "./pages/Notes";
const App = () => {
  const { isAuthenticated, loading } = useContext(AuthContext);

  if (loading) return <p>Loading...</p>;

  return (
    <Router>
      <div style={{ display: "flex" }}>
        {isAuthenticated && <Navbar />}
        <div style={{ flex: 1, marginLeft: isAuthenticated ? "220px" : "0", padding: "20px" }}>
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
            <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
            <Route path="/todo" element={<PrivateRoute><Todo /></PrivateRoute>} />
            <Route path="/daily" element={<PrivateRoute><DailyTasks /></PrivateRoute>} />
            <Route path="/notes" element={<PrivateRoute><Notes /></PrivateRoute>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
