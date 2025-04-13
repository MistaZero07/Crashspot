import { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase';
import { classifyCrash } from '../utils/classifyCrash';

export default function ReportCrashForm({ onClose }) {
  const [description, setDescription] = useState('');
//   const [lat, setLat] = useState('');
//   const [lng, setLng] = useState('');
  const [location, setLocation] = useState('');

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const aiResult = await classifyCrash(description);

    const report = {
      location,
      description,
      severity: aiResult.severity,
      crash_type: aiResult.crash_type,
      timestamp: new Date().toISOString(),
    };

    await addDoc(collection(db, 'crash_reports'), report);
    setResult(report);
    setLoading(false);
  };

  return (
    <div className="bg-white text-black p-6 rounded-lg shadow-lg max-w-md mx-auto mt-10">
      <h2 className="text-xl font-bold mb-4">📝 Report a Crash</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          className="w-full p-2 border mb-2 rounded"
          placeholder="Describe the incident..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        {/* <input
          className="w-full p-2 border mb-2 rounded"
          type="text"
          placeholder="Latitude"
          value={lat}
          onChange={(e) => setLat(e.target.value)}
          required
        />
        <input
          className="w-full p-2 border mb-4 rounded"
          type="text"
          placeholder="Longitude"
          value={lng}
          onChange={(e) => setLng(e.target.value)}
          required
        /> */}
        <input
          className="w-full p-2 border mb-4 rounded text-black"
          type="text"
          placeholder="Location or Address"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />


        <button className="bg-blue-600 text-white py-2 px-4 rounded" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit'}
        </button>
        <button onClick={onClose} className="ml-2 text-sm underline text-gray-500" type="button">
          Cancel
        </button>
      </form>

      {result && (
        <div className="mt-4 bg-green-100 text-green-800 p-2 rounded">
          ✅ Classified as <strong>{result.crash_type}</strong> | Severity: <strong>{result.severity}</strong>
        </div>
      )}
    </div>
  );
}
