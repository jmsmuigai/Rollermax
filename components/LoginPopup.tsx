"use client";

import { X, Eye, EyeOff } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { auth, db } from '../lib/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, sendPasswordResetEmail, signOut } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';

interface LoginPopupProps {
  onClose: () => void;
}

const LoginPopup = ({ onClose }: LoginPopupProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const captchaRef = useRef<HTMLDivElement | null>(null);
  const grecaptchaWidget = useRef<number | null>(null);

  // Load reCAPTCHA if site key is provided
  useEffect(() => {
    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
    if (!siteKey) return;

    const existing = document.getElementById('recaptcha-script');
    if (!existing) {
      const s = document.createElement('script');
      s.id = 'recaptcha-script';
      s.src = `https://www.google.com/recaptcha/api.js?render=explicit`;
      s.async = true;
      document.body.appendChild(s);
      s.onload = () => renderCaptcha(siteKey);
    } else {
      renderCaptcha(siteKey);
    }

    function renderCaptcha(siteKey: string) {
      try {
        // @ts-ignore
        if (window.grecaptcha && captchaRef.current) {
          // @ts-ignore
          grecaptchaWidget.current = window.grecaptcha.render(captchaRef.current, {
            sitekey: siteKey,
            theme: 'light'
          });
        }
      } catch (e) {
        console.warn('reCAPTCHA failed to render', e);
      }
    }
  }, []);

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

  const validateCaptcha = async () => {
    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
    if (!siteKey) return true; // skip if not configured
    try {
      // @ts-ignore
      const grecaptcha = window.grecaptcha;
      if (!grecaptcha || grecaptchaWidget.current === null) return true;
      // @ts-ignore
      const resp = grecaptcha.getResponse(grecaptchaWidget.current);
      return !!resp;
    } catch (e) {
      return true;
    }
  };

  const handleSignUp = async () => {
    setMessage(null);
    if (!email || !password) return setMessage('Enter email and password');
    setLoading(true);
    try {
      const ok = await validateCaptcha();
      if (!ok) return setMessage('Please complete the captcha');
      const res = await createUserWithEmailAndPassword(auth, email, password);
      await persistUser(res.user, 'password');
      setMessage('Registration successful');
      onClose();
    } catch (e) {
      console.error(e);
      setMessage('Sign up failed: ' + (e as any).message);
    } finally { setLoading(false); }
  };

  const handleSignIn = async () => {
    setMessage(null);
    setLoading(true);
    try {
      const ok = await validateCaptcha();
      if (!ok) return setMessage('Please complete the captcha');
      const res = await signInWithEmailAndPassword(auth, email, password);
      await persistUser(res.user, 'password');
      onClose();
    } catch (e) {
      console.error(e);
      setMessage('Sign in failed: ' + (e as any).message);
    } finally { setLoading(false); }
  };

  const handleGoogleSignIn = async () => {
    setMessage(null);
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const res = await signInWithPopup(auth, provider);
      await persistUser(res.user, 'google');
      onClose();
    } catch (e) {
      console.error(e);
      setMessage('Google sign-in failed');
    } finally { setLoading(false); }
  };

  const handleResetPassword = async () => {
    if (!email) return setMessage('Please enter your email to reset password');
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage('Password reset email sent');
    } catch (e) {
      console.error(e);
      setMessage('Reset failed: ' + (e as any).message);
    } finally { setLoading(false); }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setMessage('Signed out');
    } catch (e) {
      console.error(e);
    }
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
            aria-label="Email address"
            className="w-full p-3 bg-white/90 border border-gray-200 rounded-lg focus:ring-2 focus:ring-roller-blue"
          />
          <div className="relative">
            <input 
              value={password}
              onChange={e => setPassword(e.target.value)}
              type={showPassword ? 'text' : 'password'} 
              placeholder="Password"
              aria-label="Password"
              className="w-full p-3 bg-white/90 border border-gray-200 rounded-lg focus:ring-2 focus:ring-roller-blue pr-12"
            />
            <button type="button" onClick={() => setShowPassword(s => !s)} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500">
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          <div className="flex items-center justify-between text-sm">
            <button type="button" onClick={handleResetPassword} className="text-roller-blue hover:underline">Forgot password?</button>
          </div>
          <div className="flex gap-3">
            <button onClick={handleSignIn} disabled={loading} aria-busy={loading} className="flex-1 py-3 bg-roller-blue text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
              {loading && <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path></svg>}
              <span>Sign In</span>
            </button>
            <button onClick={handleSignUp} disabled={loading} aria-busy={loading} className="flex-1 py-3 bg-roller-red text-white rounded-lg font-semibold hover:opacity-90 flex items-center justify-center gap-2">
              {loading && <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path></svg>}
              <span>Register</span>
            </button>
          </div>
        </div>

        <div className="flex items-center my-4">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="flex-shrink mx-3 text-gray-500">or</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        <div ref={captchaRef} className="mb-2" />
        {message && <p className="text-sm text-center text-roller-red mb-2">{message}</p>}
        <button 
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="w-full py-3 border border-gray-300 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors"
        >
          <img src="https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png" alt="Google" className="w-5 h-5" />
          <span>Sign in with Google</span>
        </button>

        <div className="mt-4 text-center">
          <button onClick={handleSignOut} type="button" className="text-xs text-gray-500 hover:text-gray-700">Sign out</button>
        </div>

      </motion.div>
    </div>
  );
};

export default LoginPopup;
