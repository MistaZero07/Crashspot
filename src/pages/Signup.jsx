// src/pages/Signup.jsx
import React, { useState } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase'
import { useNavigate } from 'react-router-dom'

function Signup({ styles }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const [message, setMessage] = useState('')

  const handleSignup = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password)
      navigate('/') // redirect to home
    } catch (err) {
      alert(err.message)
    }
  }

  return (
    <div style={styles.container}>
      <>
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} style={styles.input} />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} style={styles.input} />
        <button onClick={handleSignup} style={styles.button}>Create Account</button>
        <p>{message}</p>
      </>
    </div>
  )
}

export default Signup
