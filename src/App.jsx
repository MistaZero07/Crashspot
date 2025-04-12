// src/App.jsx
import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import { Sagar } from "./pages/Sagar";
import Navbar  from "./components/NavBar";
// App.jsx
import Footer from "./components/Footer";

import "./App.css";

function App() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showLogin, setShowLogin] = useState(true);

  return (
    <>
      <Navbar />

      <Routes>
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
        <Route path="/rough" element={<Sagar />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
