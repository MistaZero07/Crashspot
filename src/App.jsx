// src/App.jsx
import React, { useState } from "react";
import Login from "./pages/Login";
import "./App.css"; // ✅ Import the global CSS file

function App() {
  const [showLogin, setShowLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <>
      {showLogin ? (
        <Login
          setShowLogin={setShowLogin}
          setLoading={setLoading}
          message={message}
          setMessage={setMessage}
          rememberMe={rememberMe}
          setRememberMe={setRememberMe}
        />
      ) : (
        <p style={{ color: '#fff', textAlign: 'center', marginTop: '20vh' }}>Signup component goes here...</p>
      )}
    </>
  );
}

export default App;
