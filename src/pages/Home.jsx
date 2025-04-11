import { Link } from 'react-router-dom';
import { ExclamationTriangleIcon, MapIcon, MegaphoneIcon } from '@heroicons/react/24/outline';

export default function Home() {
  return (
    <div className="text-center mt-16">
      <h1 className="text-4xl font-bold mb-4">🚧 CrashSpot</h1>
      <p className="text-lg text-gray-600 mb-10">Real-time road hazard reporting & community action</p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
        <Link to="/report" className="bg-white hover:shadow-xl transition rounded-xl p-6 border text-left">
          <ExclamationTriangleIcon className="h-10 w-10 text-red-500 mb-2" />
          <h3 className="text-xl font-semibold">Report Hazard</h3>
          <p className="text-gray-500 text-sm">Submit potholes, poor lighting, or any danger zone.</p>
        </Link>

        <Link to="/map" className="bg-white hover:shadow-xl transition rounded-xl p-6 border text-left">
          <MapIcon className="h-10 w-10 text-blue-500 mb-2" />
          <h3 className="text-xl font-semibold">View Map</h3>
          <p className="text-gray-500 text-sm">See accident-prone areas and reports in real time.</p>
        </Link>

        <Link to="/petitions" className="bg-white hover:shadow-xl transition rounded-xl p-6 border text-left">
          <MegaphoneIcon className="h-10 w-10 text-green-500 mb-2" />
          <h3 className="text-xl font-semibold">Petitions</h3>
          <p className="text-gray-500 text-sm">Support safety improvement campaigns in your area.</p>
        </Link>
      </div>
    </div>
  );
}
