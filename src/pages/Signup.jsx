import React, { useState, useRef } from 'react';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
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
    <div className="relative z-10 mt-10 mx-auto w-full max-w-md bg-white bg-opacity-10 backdrop-blur-lg text-white p-8 rounded-2xl shadow-lg">
      <h2 className="text-center text-2xl font-semibold mb-6">Create Your Account 🚀</h2>

      <form onSubmit={handleSignup} className="space-y-4">
        <div>
          <label htmlFor="email" className="block mb-1 font-medium">Email</label>
          <input
            ref={emailRef}
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full px-4 py-2 rounded-lg bg-white bg-opacity-20 focus:bg-opacity-30 outline-none text-white placeholder-gray-300"
          />
        </div>

        <div>
          <label htmlFor="password" className="block mb-1 font-medium">Password</label>
          <input
            ref={passwordRef}
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Create a password"
            className="w-full px-4 py-2 rounded-lg bg-white bg-opacity-20 focus:bg-opacity-30 outline-none text-white placeholder-gray-300"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-800 text-white py-2 rounded-lg font-medium transition"
        >
          Sign Up
        </button>

        {message && <p className="text-center text-sm mt-2">{message}</p>}
      </form>

      <div className="text-center my-4 text-gray-300">OR</div>

      <button
        onClick={handleGoogleSignup}
        className="w-full flex items-center justify-center gap-2 bg-white text-black font-medium py-2 rounded-lg hover:bg-gray-200 transition"
      >
        <FcGoogle size={24} /> Sign up with Google
      </button>

      <button
        onClick={() => setShowLogin(true)}
        className="block w-full text-center mt-4 text-blue-300 hover:text-blue-500 text-sm"
      >
        Already have an account? Log In
      </button>
    </div>
  );
};

export default Signup;
