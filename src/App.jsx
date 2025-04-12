// src/App.jsx
import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";

function App() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showLogin, setShowLogin] = useState(true);

  return (
    <>
      <div className="background-slider">
        <img src="/images/crash1.jpg" alt="Crash 1" />
        <img src="/images/crash2.jpg" alt="Crash 2" />
        <img src="/images/crash3.jpg" alt="Crash 3" />
      </div>

      <Routes>
        {/* Support for both "/" and "/login" routes */}
        <Route
          path="/"
          element={
            <Login
              setLoading={setLoading}
              loading={loading}
              message={message}
              setMessage={setMessage}
              rememberMe={rememberMe}
              setRememberMe={setRememberMe}
              setShowLogin={setShowLogin}
            />
          }
        />
        <Route
          path="/login"
          element={
            <Login
              setLoading={setLoading}
              loading={loading}
              message={message}
              setMessage={setMessage}
              rememberMe={rememberMe}
              setRememberMe={setRememberMe}
              setShowLogin={setShowLogin}
            />
          }
        />
        <Route path="/signup" element={<Signup setShowLogin={setShowLogin} />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        {/* Redirect unknown paths to login */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
