import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import UpvoteButton from './UpvoteButton';

export default function PetitionList() {
  const [petitions, setPetitions] = useState([]);

  useEffect(() => {
    const fetchPetitions = async () => {
      const querySnapshot = await getDocs(collection(db, 'petitions'));
      const fetched = [];
      querySnapshot.forEach((doc) => {
        fetched.push({ id: doc.id, ...doc.data() });
      });
      setPetitions(fetched);
    };
    fetchPetitions();
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">📋 Community Petitions</h2>

      {petitions.length === 0 ? (
        <p className="text-gray-600">No petitions found.</p>
      ) : (
        <div className="space-y-4">
          {petitions.map((petition) => (
            <div
              key={petition.id}
              className="bg-white p-4 rounded shadow border border-gray-200"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold">{petition.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">{petition.description}</p>
                  <p className="text-xs text-gray-500">
                    📍 {petition.location} &nbsp;|&nbsp; 🏷️ {petition.category}
                  </p>
                </div>

                <UpvoteButton petitionId={petition.id} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
