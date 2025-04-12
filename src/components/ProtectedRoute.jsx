// src/components/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';

const ProtectedRoute = ({ children }) => {
  const [user, loading] = useAuthState(auth);

  if (loading) return <p style={{ color: '#fff', textAlign: 'center' }}>Checking access...</p>;
  if (!user) return <Navigate to="/" />;

  return children;
};

export default ProtectedRoute;
