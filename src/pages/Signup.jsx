// src/pages/Signup.jsx
import React, { useState, useRef } from 'react';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth, db } from '../firebase';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { FcGoogle } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';

const Signup = ({ setShowLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = (password) => password.length >= 6;

  const handleSignup = async (e) => {
    e.preventDefault();
    setMessage('');

    if (!validateEmail(email)) {
      setMessage('❌ Invalid email format');
      emailRef.current.focus();
      return;
    }
    if (!validatePassword(password)) {
      setMessage('❌ Password must be at least 6 characters');
      passwordRef.current.focus();
      return;
    }

    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, 'users', result.user.uid), {
        email: result.user.email,
        createdAt: serverTimestamp(),
      });

      setMessage('✅ Signup successful!');
      navigate('/dashboard');
    } catch (error) {
      setMessage(`❌ ${error.message}`);
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
      navigate('/dashboard');
    } catch (error) {
      setMessage(`❌ ${error.message}`);
    }
  };

  return (
    <div className="login-container">
      <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>Create Your Account 🚀</h2>

      <form onSubmit={handleSignup}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            ref={emailRef}
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            ref={passwordRef}
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Create a password"
          />
        </div>

        <button type="submit">Sign Up</button>
        <p style={{ fontSize: '0.9rem', textAlign: 'center', marginTop: '0.5rem' }}>{message}</p>
      </form>

      <div style={{ textAlign: 'center', margin: '1.5rem 0', color: '#ccc' }}>OR</div>

      <button className="googleButton" onClick={handleGoogleSignup}>
        <FcGoogle size={24} /> Sign up with Google
      </button>

      <button className="switchButton" onClick={() => setShowLogin(true)}>
        Already have an account? Log In
      </button>
    </div>
  );
};

export default Signup;
