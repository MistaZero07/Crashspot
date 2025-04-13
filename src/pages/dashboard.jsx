// import React from 'react';
// import { signOut } from 'firebase/auth';
// import { useNavigate } from 'react-router-dom';
// import { useAuthState } from 'react-firebase-hooks/auth';
// import { auth } from '../firebase';
// import './dashboard.css';
// import { useState } from 'react';
// import ReportCrashForm from '../components/ReportCrashForm'; // we'll create this next


// const Dashboard = () => {
//   const [user, loading] = useAuthState(auth);
//   const navigate = useNavigate();
//   const [showReportForm, setShowReportForm] = useState(false);

//   const handleLogout = async () => {
//     try {
//       await signOut(auth);
//       navigate('/'); // go to login
//     } catch (error) {
//       console.error('Logout error:', error.message);
//     }
//   };

//   if (loading) {
//     return <p style={{ color: '#fff', textAlign: 'center' }}>Loading dashboard...</p>;
//   }

//   return (
//     <div className="dashboard-wrapper">
//       <header className="dashboard-header">
//         <h1>🚦 CrashSpot Dashboard</h1>
//         <button className="logout-button" onClick={handleLogout}>
//           Logout
//         </button>
//       </header>

//       <section className="welcome-section">
//         <h2>Welcome back, <span>{user?.email}</span> 👋</h2>
//         <p>Here’s what’s happening on the roads today.</p>
//       </section>

//       <section className="stats-grid">
//         <div className="stat-card"><h3>🚧 Crash Reports</h3><p>12</p></div>
//         <div className="stat-card"><h3>🧑‍🤝‍🧑 Total Users</h3><p>18</p></div>
//         <div className="stat-card"><h3>🔥 Hotspots</h3><p>5</p></div>
//       </section>

//       <section className="dashboard-actions">
//         <button className="action-button" onClick={() => setShowReportForm(true)}>+ Report a Crash</button>
        

//         <button className="action-button secondary">View Heatmap (coming soon)</button>
//       </section>
//     </div>
//   );
// };

// export default Dashboard;
import React, { useState } from 'react';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import './dashboard.css';
import ReportCrashForm from '../components/ReportCrashForm';

const Dashboard = () => {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  const [showReportForm, setShowReportForm] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/'); // go to login
    } catch (error) {
      console.error('Logout error:', error.message);
    }
  };

  if (loading) {
    return <p style={{ color: '#fff', textAlign: 'center' }}>Loading dashboard...</p>;
  }

  return (
    <div className="dashboard-wrapper">
      <header className="dashboard-header">
        <h1>🚦 CrashSpot Dashboard</h1>
        {/* <button className="logout-button" onClick={handleLogout}>
          Logout
        </button> */}
      </header>

      <section className="welcome-section">
        <h2>Welcome back, <span>{user?.email}</span> 👋</h2>
        <p>Here’s what’s happening on the roads today.</p>
      </section>

      <section className="stats-grid">
        <div className="stat-card"><h3>🚧 Crash Reports</h3><p>12</p></div>
        <div className="stat-card"><h3>🧑‍🤝‍🧑 Total Users</h3><p>18</p></div>
        <div className="stat-card"><h3>🔥 Hotspots</h3><p>5</p></div>
      </section>

      <section className="dashboard-actions">
        <button className="action-button" onClick={() => setShowReportForm(true)}>+ Report a Crash</button>
        <button className="action-button secondary">View Heatmap (coming soon)</button>
      </section>

      {/* 🔽 Renders crash report form when button is clicked */}
      {showReportForm && (
        <div className="form-overlay">
          <ReportCrashForm onClose={() => setShowReportForm(false)} />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
