import { useState, useEffect } from 'react';
import { doc, updateDoc, arrayUnion, getDoc } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { db, auth } from '../firebase';

export default function UpvoteButton({ petitionId }) {
  const [user] = useAuthState(auth);
  const [hasVoted, setHasVoted] = useState(false);
  const [votes, setVotes] = useState(0);

  useEffect(() => {
    const fetch = async () => {
      const docRef = doc(db, 'petitions', petitionId);
      const snap = await getDoc(docRef);
      if (snap.exists()) {
        const data = snap.data();
        setVotes(data.upvotes || 0);
        setHasVoted(data.voters?.includes(user?.uid));
      }
    };
    if (user) fetch();
  }, [user, petitionId]);

  const handleUpvote = async () => {
    if (!user || hasVoted) return;
    const docRef = doc(db, 'petitions', petitionId);
    await updateDoc(docRef, {
      upvotes: votes + 1,
      voters: arrayUnion(user.uid)
    });
    setVotes(votes + 1);
    setHasVoted(true);
  };

  return (
    <button
      onClick={handleUpvote}
      disabled={hasVoted}
      className={`px-3 py-1 rounded-full text-sm ${
        hasVoted ? 'bg-gray-300 text-gray-600' : 'bg-green-500 text-white hover:bg-green-600'
      }`}
    >
      👍 {votes}
    </button>
  );
}
