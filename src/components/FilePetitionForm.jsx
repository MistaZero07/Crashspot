import { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

export default function FilePetitionForm({ onClose }) {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('general');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const petition = {
      title,
      location,
      description,
      category,
      timestamp: serverTimestamp(),
      upvotes: 0,
    };

    await addDoc(collection(db, 'petitions'), petition);
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-white/10 backdrop-blur-sm flex items-center justify-center px-4">
        <div className="absolute inset-0 bg-black opacity-50" onClick={onClose}></div>
      <div className="bg-white text-black p-6 rounded-lg shadow-xl w-full max-w-md relative">
        <button onClick={onClose} className="absolute top-2 right-3 text-gray-500 hover:text-black text-xl font-bold">×</button>

        <h2 className="text-xl font-bold mb-4">📣 File a Petition</h2>

        {submitted ? (
          <div className="text-green-700 bg-green-100 p-3 rounded text-center">
            ✅ Petition submitted! Thank you for raising your voice.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Petition Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />

            <input
              type="text"
              placeholder="Location / Address"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />

            <textarea
              placeholder="Describe the issue and desired improvement..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              rows={4}
              required
            />

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="general">General</option>
              <option value="lighting">Lighting</option>
              <option value="pothole">Pothole</option>
              <option value="speed_bump">Speed Bump</option>
              <option value="crosswalk">Crosswalk</option>
            </select>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-1 text-sm text-gray-600 hover:underline"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
              >
                {loading ? 'Submitting...' : 'Submit Petition'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
