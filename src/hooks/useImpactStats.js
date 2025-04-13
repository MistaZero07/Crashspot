// src/hooks/useCrashStats.js
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

export function useCrashStats() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const ref = doc(db, 'city_crash_stats', 'monroe_scraped');
      const snapshot = await getDoc(ref);
      if (snapshot.exists()) {
        setData(snapshot.data());
      }
      setLoading(false);
    }

    fetchData();
  }, []);

  return { data, loading };
}
