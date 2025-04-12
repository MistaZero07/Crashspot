// src/firebase.js
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyBkwsP7RKMPqUXjVA42g0fgCV4bXf87Q60",
  authDomain: "crashspot-3da19.firebaseapp.com",
  projectId: "crashspot-3da19",
  storageBucket: "crashspot-3da19.appspot.com",
  messagingSenderId: "1019145070307",
  appId: "1:1019145070307:web:0e79d1033ef1b5f0a407d6",
  measurementId: "G-09V04S40N3"
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

export { auth }
