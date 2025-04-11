import { Routes, Route, NavLink } from 'react-router-dom';
import Home from './pages/Home';
import Report from './pages/Report';
import Map from './pages/Map';
import Petitions from './pages/Petitions';

export default function App() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
        <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-blue-600">CrashSpot</h1>
          <div className="flex gap-6 text-sm font-medium">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `hover:text-blue-600 transition ${
                  isActive ? 'text-blue-600 font-semibold border-b-2 border-blue-600 pb-1' : 'text-gray-600'
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/report"
              className={({ isActive }) =>
                `hover:text-blue-600 transition ${
                  isActive ? 'text-blue-600 font-semibold border-b-2 border-blue-600 pb-1' : 'text-gray-600'
                }`
              }
            >
              Report
            </NavLink>
            <NavLink
              to="/map"
              className={({ isActive }) =>
                `hover:text-blue-600 transition ${
                  isActive ? 'text-blue-600 font-semibold border-b-2 border-blue-600 pb-1' : 'text-gray-600'
                }`
              }
            >
              Map
            </NavLink>
            <NavLink
              to="/petitions"
              className={({ isActive }) =>
                `hover:text-blue-600 transition ${
                  isActive ? 'text-blue-600 font-semibold border-b-2 border-blue-600 pb-1' : 'text-gray-600'
                }`
              }
            >
              Petitions
            </NavLink>
          </div>
        </nav>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/report" element={<Report />} />
          <Route path="/map" element={<Map />} />
          <Route path="/petitions" element={<Petitions />} />
        </Routes>
      </main>
    </div>
  );
}
