import React, { useState, useRef } from 'react';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase';
import { FcGoogle } from 'react-icons/fc';

function Login({ setShowLogin, loading, setLoading, message, setMessage, rememberMe, setRememberMe }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

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
    } catch (error) {
      setMessage(`❌ ${error.message}`);
    }
  };

  return (
    <>
      <h1>
        CrashSpot
        <div>Community-Powered Road Safety & Petition Platform</div>
      </h1>

      <div className="login-container">
        <h2 style={{ textAlign: 'center', marginBottom: '1.5rem', fontWeight: '600' }}>
          Welcome Back 👋
        </h2>

        <form onSubmit={handleLogin}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              ref={emailRef}
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {emailError && <div className="error">{emailError}</div>}
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                ref={passwordRef}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{ background: 'none', color: '#ccc', border: 'none', cursor: 'pointer' }}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            {passwordError && <div className="error">{passwordError}</div>}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
              Remember Me
            </label>
            <button type="button" style={{ background: 'none', border: 'none', color: '#a3bffa', cursor: 'pointer' }}>
              Forgot Password?
            </button>
          </div>

          <button type="submit">
            {loading ? 'Logging in...' : 'Log In'}
          </button>

          <p style={{ textAlign: 'center', fontSize: '0.9rem', marginTop: '0.5rem' }}>{message}</p>
        </form>

        <div style={{ textAlign: 'center', margin: '1.5rem 0', color: '#ccc' }}>OR</div>

        <button className="googleButton" onClick={handleGoogleSignIn}>
          <FcGoogle size={24} /> Sign in with Google
        </button>

        <button className="switchButton" onClick={() => setShowLogin(false)}>
          Don’t have an account? Sign Up
        </button>
      </div>
    </>
  );
}

export default Login;
