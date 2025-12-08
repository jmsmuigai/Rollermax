'use client';

import { X } from 'lucide-react';
import { motion } from 'framer-motion';

interface LoginPopupProps {
  onClose: () => void;
}

const LoginPopup = ({ onClose }: LoginPopupProps) => {
  
  // This is a placeholder for Firebase authentication.
  // To implement this, you would need to set up Firebase in your project
  // and use the Firebase SDK to handle Google Sign-In.
  const handleGoogleSignIn = () => {
    alert('Signing in with Google... (Firebase integration needed)');
    // Example with firebase:
    // import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
    // const auth = getAuth();
    // const provider = new GoogleAuthProvider();
    // signInWithPopup(auth, provider)
    //   .then((result) => {
    //     // This gives you a Google Access Token. You can use it to access the Google API.
    //     const credential = GoogleAuthProvider.credentialFromResult(result);
    //     const token = credential.accessToken;
    //     // The signed-in user info.
    //     const user = result.user;
    //     console.log({ user, token });
    //     onClose();
    //   }).catch((error) => {
    //     // Handle Errors here.
    //     const errorCode = error.code;
    //     const errorMessage = error.message;
    //     // The email of the user's account used.
    //     const email = error.email;
    //     // The AuthCredential type that was used.
    //     const credential = GoogleAuthProvider.credentialFromError(error);
    //     console.error({ errorCode, errorMessage, email, credential });
    //   });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative glass-panel p-8 rounded-3xl w-full max-w-sm"
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-roller-red">
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold text-center mb-6 text-roller-blue">Client Login</h2>

        <div className="space-y-4">
          <input 
            type="email" 
            placeholder="Email Address"
            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-roller-blue"
          />
          <input 
            type="password" 
            placeholder="Password"
            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-roller-blue"
          />
          <button className="w-full py-3 bg-roller-blue text-white rounded-lg font-bold hover:bg-blue-700 transition-colors">
            Log In
          </button>
        </div>

        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="flex-shrink mx-4 text-gray-500">or</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        <button 
          onClick={handleGoogleSignIn}
          className="w-full py-3 border border-gray-300 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors"
        >
          <img src="https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png" alt="Google" className="w-5 h-5" />
          <span>Sign in with Google</span>
        </button>

        <p className="text-xs text-gray-500 text-center mt-6">
          Don't have an account? <a href="#" className="font-bold text-roller-blue">Sign Up</a>
        </p>

      </motion.div>
    </div>
  );
};

export default LoginPopup;
