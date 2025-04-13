// components/CrashReportsList.jsx
import { useState, useEffect } from "react";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { db } from "../firebase";
import { AlertTriangle, MapPin } from 'lucide-react';

export default function CrashReportsList() {
  const [crashes, setCrashes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCrashReports() {
      try {
        const crashesQuery = query(
          collection(db, "crash_reports"),
          orderBy("timestamp", "desc"),
          limit(10)
        );
        
        const snapshot = await getDocs(crashesQuery);
        const crashList = [];
        
        snapshot.forEach((doc) => {
          crashList.push({
            id: doc.id,
            ...doc.data()
          });
        });
        
        setCrashes(crashList);
      } catch (error) {
        console.error("Error fetching crash reports:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchCrashReports();
  }, []);

  // Format date for display
  const formatDate = (timestamp) => {
    if (!timestamp) return "Unknown date";
    const date = new Date(timestamp);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    }).format(date);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <h2 className="text-xl font-bold mb-4 flex items-center">
        <AlertTriangle className="mr-2 text-rose-600" />
        Recent Crash Reports
      </h2>
      
      {loading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-rose-600"></div>
        </div>
      ) : crashes.length === 0 ? (
        <p className="text-gray-500 text-center py-8">No crash reports available</p>
      ) : (
        <div className="space-y-4">
          {crashes.map((crash) => (
            <div key={crash.id} className="border rounded-lg p-4 hover:bg-gray-50">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-800">
                    {crash.crash_type || "Incident"} - {crash.severity || "Unknown"} Severity
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">{crash.description}</p>
                  
                  {crash.location && (
                    <div className="flex items-center text-xs text-gray-500 mt-2">
                      <MapPin className="h-3 w-3 mr-1" />
                      {crash.location}
                    </div>
                  )}
                </div>
                <span className="text-xs text-gray-500">
                  {formatDate(crash.timestamp)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}