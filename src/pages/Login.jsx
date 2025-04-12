import React, { useState, useRef } from 'react';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase';
import { FcGoogle } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';

function Login({ setShowLogin, loading, setLoading, message, setMessage, rememberMe, setRememberMe }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = (password) => password.length >= 6;

  const handleLogin = async (e) => {
    e.preventDefault();
    setEmailError('');
    setPasswordError('');

    if (!validateEmail(email)) {
      setEmailError('Invalid email format');
      emailRef.current.focus();
      return;
    }

    if (!validatePassword(password)) {
      setPasswordError('Password must be at least 6 characters');
      passwordRef.current.focus();
      return;
    }

    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setMessage('✅ Login successful!');
      rememberMe
        ? (localStorage.setItem('rememberMe', 'true'), localStorage.setItem('email', email))
        : (localStorage.removeItem('rememberMe'), localStorage.removeItem('email'));
      navigate('/dashboard');
    } catch (error) {
      setMessage(`❌ ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      setMessage('✅ Google Login successful!');
      navigate('/dashboard');
    } catch (error) {
      setMessage(`❌ ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-white text-black px-4">
      <h1 className="text-4xl font-bold text-center mb-2">CrashSpot</h1>
      <p className="text-sm text-gray-600 text-center mb-6">
        Community-Powered Road Safety & Petition Platform
      </p>

      <div className="w-full max-w-md bg-gray-100 p-8 rounded-2xl shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Welcome Back 👋</h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block font-medium mb-1">Email</label>
            <input
              type="email"
              id="email"
              ref={emailRef}
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
          </div>

          <div>
            <label htmlFor="password" className="block font-medium mb-1">Password</label>
            <div className="flex items-center gap-2">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                ref={passwordRef}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-sm text-indigo-500 hover:underline"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
          </div>

          <div className="flex justify-between items-center text-sm">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
              Remember Me
            </label>
            <button type="button" className="text-indigo-500 hover:underline">
              Forgot Password?
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-medium transition"
          >
            {loading ? 'Logging in...' : 'Log In'}
          </button>

          {message && <p className="text-center text-sm mt-2 text-gray-700">{message}</p>}
        </form>

        <div className="text-center my-4 text-gray-400">OR</div>

        <button
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 text-black font-medium py-2 rounded-lg hover:bg-gray-100 transition"
        >
          <FcGoogle size={24} /> Sign in with Google
        </button>

        <button
          onClick={() => setShowLogin(false)}
          className="block w-full text-center mt-4 text-indigo-500 hover:underline text-sm"
        >
          Don’t have an account? Sign Up
        </button>
      </div>
    </div>
  );
}

export default Login;
