'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, CheckCircle2, Loader2, AlertCircle, Smartphone } from 'lucide-react';
import Image from 'next/image';

interface MpesaPaymentProps {
  amount: number;
  onSuccess: (transactionId: string) => void;
  onCancel: () => void;
}

const MpesaPayment: React.FC<MpesaPaymentProps> = ({ amount, onSuccess, onCancel }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [status, setStatus] = useState<'idle' | 'initiating' | 'pending' | 'success' | 'error'>('idle');
  const [countdown, setCountdown] = useState(60);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (status === 'pending' && countdown > 0) {
      timer = setInterval(() => setCountdown(c => c - 1), 1000);
    } else if (countdown === 0 && status === 'pending') {
      setStatus('error');
    }
    return () => clearInterval(timer);
  }, [status, countdown]);

  const handleInitiate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber.match(/^(?:254|\+254|0)?(7|1)(?:(?:[0-9][0-9])|(?:[0-9][0-9]))[0-9]{6}$/)) {
      alert('Please enter a valid M-Pesa phone number');
      return;
    }

    setStatus('initiating');
    
    // Simulate API Call to M-Pesa STK Push
    setTimeout(() => {
      setStatus('pending');
      // Simulate confirmation after some time
      setTimeout(() => {
        if (status !== 'error') {
          setStatus('success');
          setTimeout(() => onSuccess('TH789XYZ'), 2000);
        }
      }, 5000);
    }, 2000);
  };

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 max-w-md w-full shadow-2xl overflow-hidden relative">
      {/* Background Glow */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-green-500/10 blur-3xl rounded-full" />
      
      <div className="relative z-10 text-center">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-green-500/10 rounded-2xl flex items-center justify-center border border-green-500/20">
            <Image 
              src="/logos/mpesa.webp" 
              alt="M-Pesa" 
              width={60} 
              height={60} 
              className="object-contain"
              onError={(e) => {
                // Fallback icon if image doesn't exist
                (e.target as any).style.display = 'none';
              }}
            />
            <Smartphone className="text-green-500 w-10 h-10" />
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-2 text-white">M-Pesa Payment</h2>
        <p className="text-gray-400 mb-8">Pay securely via M-Pesa STK Push</p>

        <AnimatePresence mode="wait">
          {status === 'idle' || status === 'initiating' ? (
            <motion.form
              key="idle"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              onSubmit={handleInitiate}
              className="space-y-6"
            >
              <div className="text-left">
                <label className="block text-sm font-medium text-gray-400 mb-2">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="07XX XXX XXX"
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:ring-2 focus:ring-green-500 outline-none transition-all"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    disabled={status === 'initiating'}
                  />
                </div>
              </div>

              <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-300">Amount to pay</span>
                  <span className="text-green-400 font-bold text-lg">KES {amount.toLocaleString()}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={status === 'initiating'}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-3"
              >
                {status === 'initiating' ? (
                  <>
                    <Loader2 className="animate-spin w-5 h-5" /> Initiating...
                  </>
                ) : (
                  'Pay Now'
                )}
              </button>
              
              <button 
                type="button"
                onClick={onCancel}
                className="text-gray-500 hover:text-white transition-colors text-sm font-medium"
              >
                Cancel Transaction
              </button>
            </motion.form>
          ) : status === 'pending' ? (
            <motion.div
              key="pending"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-6 py-8"
            >
              <div className="flex justify-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-green-500/20 blur-xl animate-pulse rounded-full" />
                  <Loader2 className="w-16 h-16 text-green-500 animate-spin relative z-10" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Check Your Phone</h3>
                <p className="text-gray-400 leading-relaxed">
                  A payment prompt has been sent to <span className="text-green-400 font-bold">{phoneNumber}</span>. <br />
                  Please enter your M-Pesa PIN to complete the transaction.
                </p>
              </div>
              <div className="text-sm font-mono text-gray-500 bg-white/5 py-2 rounded-lg">
                Waiting for confirmation... {countdown}s
              </div>
            </motion.div>
          ) : status === 'success' ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-6 py-8"
            >
              <div className="flex justify-center">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center shadow-lg shadow-green-500/40">
                  <CheckCircle2 className="w-10 h-10 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white">Payment Received!</h3>
              <p className="text-gray-400">
                Transaction successful. Your delivery is being processed.
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="error"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-6 py-8"
            >
              <div className="flex justify-center">
                <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center">
                  <AlertCircle className="w-10 h-10 text-red-500" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-white">Transaction Failed</h3>
              <p className="text-gray-400 mb-6">
                The transaction timed out or was cancelled. Please try again.
              </p>
              <button 
                onClick={() => setStatus('idle')}
                className="btn-primary w-full bg-red-500 hover:bg-red-600"
              >
                Try Again
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer Info */}
      <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-center gap-2 text-xs text-gray-500">
        <Smartphone size={14} />
        Secure SSL Encrypted Payment
      </div>
    </div>
  );
};

export default MpesaPayment;
