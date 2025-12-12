"use client";

import { X } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { auth, db } from '../lib/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';

interface LoginPopupProps {
  onClose: () => void;
}

const LoginPopup = ({ onClose }: LoginPopupProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const persistUser = async (user: any, provider = 'password') => {
    if (!user || !user.uid) return;
    try {
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        email: user.email || null,
        name: user.displayName || null,
        provider,
        updatedAt: serverTimestamp(),
        createdAt: serverTimestamp()
      }, { merge: true });
    } catch (e) {
      console.error('Error writing user profile', e);
    }
  };

  const handleSignUp = async () => {
    setLoading(true);
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      await persistUser(res.user, 'password');
      onClose();
    } catch (e) {
      console.error(e);
      alert('Sign up failed: ' + (e as any).message);
    } finally { setLoading(false); }
  };

  const handleSignIn = async () => {
    setLoading(true);
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      await persistUser(res.user, 'password');
      onClose();
    } catch (e) {
      console.error(e);
      alert('Sign in failed: ' + (e as any).message);
    } finally { setLoading(false); }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const res = await signInWithPopup(auth, provider);
      await persistUser(res.user, 'google');
      onClose();
    } catch (e) {
      console.error(e);
      alert('Google sign-in failed');
    } finally { setLoading(false); }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center">
      <motion.div 
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative glass-panel p-6 rounded-3xl w-full max-w-md"
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-roller-red">
          <X size={22} />
        </button>

        <h2 className="text-2xl font-bold text-center mb-4 text-roller-blue">Client Login</h2>

        <div className="space-y-3">
          <input 
            value={email}
            onChange={e => setEmail(e.target.value)}
            type="email" 
            placeholder="Email Address"
            className="w-full p-3 bg-white/90 border border-gray-200 rounded-lg focus:ring-2 focus:ring-roller-blue"
          />
          <input 
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password" 
            placeholder="Password"
            className="w-full p-3 bg-white/90 border border-gray-200 rounded-lg focus:ring-2 focus:ring-roller-blue"
          />
          <div className="flex gap-3">
            <button onClick={handleSignIn} disabled={loading} className="flex-1 py-3 bg-roller-blue text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              Sign In
            </button>
            <button onClick={handleSignUp} disabled={loading} className="flex-1 py-3 bg-roller-red text-white rounded-lg font-semibold hover:opacity-90">
              Register
            </button>
          </div>
        </div>

        <div className="flex items-center my-4">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="flex-shrink mx-3 text-gray-500">or</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        <button 
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="w-full py-3 border border-gray-300 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors"
        >
          <img src="https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png" alt="Google" className="w-5 h-5" />
          <span>Sign in with Google</span>
        </button>

      </motion.div>
    </div>
  );
};

export default LoginPopup;
