import React from 'react';
import { signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error.message);
    }
  };

  if (loading) {
    return <p style={{ color: '#fff', textAlign: 'center' }}>Loading dashboard...</p>;
  }

  return (
    <div className="login-container" style={{ textAlign: 'center' }}>
      <h2 style={{ marginBottom: '1rem' }}>🚦 Welcome to CrashSpot Dashboard</h2>
      <p style={{ marginBottom: '1.5rem' }}>
        You are logged in as: <strong>{user?.email}</strong>
      </p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
