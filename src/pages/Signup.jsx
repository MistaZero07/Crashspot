import React, { useState, useRef } from 'react';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { FcGoogle } from 'react-icons/fc';

function Signup({ setShowLogin, setLoading, message, setMessage }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmRef = useRef(null);

  const validate = () => {
    const newErrors = {};
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      newErrors.email = 'Invalid email format';
    }
    if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        createdAt: serverTimestamp(),
      });

      setMessage('✅ Signup successful! You can now log in.');
      setShowLogin(true);
    } catch (error) {
      setMessage(`❌ ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        displayName: user.displayName,
        createdAt: serverTimestamp(),
      });

      setMessage('✅ Google Signup successful!');
      setShowLogin(true);
    } catch (error) {
      setMessage(`❌ ${error.message}`);
    }
  };

  return (
    <>
      <h1>
        CrashSpot
        <div>Create a new account to help improve road safety</div>
      </h1>

      <div className="login-container">
        <h2 style={{ textAlign: 'center', marginBottom: '1.5rem', fontWeight: '600' }}>
          Sign Up 🚀
        </h2>
        <form onSubmit={handleSignup}>
          <div>
            <label>Email</label>
            <input
              type="email"
              ref={emailRef}
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <div className="error">{errors.email}</div>}
          </div>

          <div>
            <label>Password</label>
            <input
              type="password"
              ref={passwordRef}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <div className="error">{errors.password}</div>}
          </div>

          <div>
            <label>Confirm Password</label>
            <input
              type="password"
              ref={confirmRef}
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {errors.confirmPassword && <div className="error">{errors.confirmPassword}</div>}
          </div>

          <button type="submit">
            {setLoading ? 'Signing up...' : 'Sign Up'}
          </button>

          <p
            style={{
              textAlign: 'center',
              fontSize: '0.9rem',
              marginTop: '0.5rem',
              color: message.startsWith('✅') ? '#4ade80' : '#f87171',
            }}
          >
            {message}
          </p>
        </form>

        <div style={{ textAlign: 'center', margin: '1.5rem 0', color: '#ccc' }}>OR</div>

        <button className="googleButton" onClick={handleGoogleSignup}>
          <FcGoogle size={24} /> Sign up with Google
        </button>

        <button className="switchButton" onClick={() => setShowLogin(true)}>
          Already have an account? Log In
        </button>
      </div>
    </>
  );
}

export default Signup;