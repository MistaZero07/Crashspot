import React, { useState, useRef } from 'react';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase';
import { FcGoogle } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';


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
    <>
      {/* Background Image Slider */}
      <AuthLayout>
    <h1 className="text-black text-4xl font-bold text-center z-10 relative mt-6">
      CrashSpot
      <div className="text-sm font-light text-gray-300">
        Community-Powered Road Safety & Petition Platform
      </div>
    </h1>

    <div className="relative z-10 mt-6 mx-auto w-full max-w-md bg-white bg-opacity-10 backdrop-blur-lg text-white p-8 rounded-2xl shadow-lg">

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              id="email"
              ref={emailRef}
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-white bg-opacity-20 focus:bg-opacity-30 outline-none text-white placeholder-gray-300"
            />
            {emailError && <p className="text-red-400 text-sm mt-1">{emailError}</p>}
          </div>

          <div>
            <label htmlFor="password" className="block mb-1 font-medium">Password</label>
            <div className="flex items-center gap-2">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                ref={passwordRef}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-white bg-opacity-20 focus:bg-opacity-30 outline-none text-black placeholder-gray-300"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-sm text-blue-300 hover:text-blue-500"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            {passwordError && <p className="text-red-400 text-sm mt-1">{passwordError}</p>}
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
            <button type="button" className="text-blue-300 hover:text-blue-500">
              Forgot Password?
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-800 text-white py-2 rounded-lg font-medium transition"
          >
            {loading ? 'Logging in...' : 'Log In'}
          </button>

          {message && <p className="text-center text-sm mt-2">{message}</p>}
        </form>

        <div className="text-center my-4 text-gray-300">OR</div>

        <button
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center gap-2 bg-white text-black font-medium py-2 rounded-lg hover:bg-gray-200 transition"
        >
          <FcGoogle size={24} /> Sign in with Google
        </button>

        <button
          onClick={() => setShowLogin(false)}
          className="block w-full text-center mt-4 text-blue-300 hover:text-blue-500 text-sm"
        >
          Don’t have an account? Sign Up
        </button>
      </div>
      </AuthLayout>
    </>
  );
}

export default Login;
