import React, { useState } from 'react';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import './dashboard.css';
import { useCrashStats } from '../hooks/useImpactStats';
import BackgroundSlider from '../components/BackgroundSlider';

const Dashboard = () => {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  const [showReportForm, setShowReportForm] = useState(false);
  const { data, loading: dataLoading } = useCrashStats();
  const sortedStats = Array.isArray(data?.crash_stats)
    ? [...data.crash_stats].sort((a, b) => Number(a.year) - Number(b.year))
    : [];
    console.log("🔥 Crash Stats:", data?.crash_stats);

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
    <div className="dashboard-wrapper relative overflow-hidden text-black">
    <BackgroundSlider />
    <div className="relative z-10"/>
      <header className="dashboard-header">
        <h1>🚦 CrashSpot Dashboard</h1>
        {/* <button className="logout-button" onClick={handleLogout}>
          Logout
        </button> */}
      </header>

      <section className="welcome-section">
        <h2>
          Welcome back, <span>{user?.email}</span> 👋
        </h2>
        <p>Here’s what’s happening on the roads today.</p>
      </section>

      {/* 🔒 Static Stat Cards with Live Value for Crash Reports */}
      <section className="stats-grid">
      <div className="stat-card group relative">
  <h3>🚧 Crash Reports</h3>
  <p>{data?.crash_stats?.length || '–'}</p>

  <div className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 w-40 bg-white text-black text-[10px] rounded-sm shadow-sm p-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-150 z-10 pointer-events-none leading-tight">


    <p><strong> Timeframe:</strong> 2019 – 2022</p>
    <p><strong> Location:</strong> Monroe, LA</p>
    <p><strong> Reports:</strong> {data?.crash_stats?.length || 'N/A'}</p>
    <p><strong> Source:</strong> city-data.com</p>
  </div>
</div>

        <div className="stat-card">
          <h3>🧑‍🤝‍🧑 Total Users</h3>
          <p>18</p>
        </div>
        <div className="stat-card">
          <h3>🔥 Hotspots</h3>
          <p>5</p>
        </div>
      </section>

      {/* 📊 Dynamic Stats */}
      {!dataLoading && data && (
        <section className="stats-grid">
          <div className="stat-card">
  <h3>📉 Time Range</h3>
  <p>2019 – 2022</p>
</div>

          <div className="stat-card">
            <h3>🚑 EMS Avg (Monroe)</h3>
            <p>{data.ems.monroe_response_time_min} min</p>
          </div>
          <div className="stat-card">
            <h3>🌤️ Clear Days</h3>
            <p>{data.conditions.weather.clear}</p>
          </div>
        </section>
      )}
      //just to commit on github

      <section className="dashboard-actions">
      <button className="action-button" onClick={() => setShowReportForm(true)}>
  + Report a Crash
</button>
        <button className="action-button secondary">View Heatmap (coming soon)</button>
      </section>
    </div>
  );
};

export default Dashboard;
