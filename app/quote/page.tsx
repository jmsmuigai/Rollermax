'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Package, MapPin, Scale, ArrowRight, Check, Ship, Truck, Plane, CreditCard } from 'lucide-react';
import MpesaPayment from '@/components/MpesaPayment';

const steps = [
  { id: 1, title: 'Package Details', icon: Package },
  { id: 2, title: 'Route', icon: MapPin },
  { id: 3, title: 'Payment', icon: CreditCard },
];

export default function QuotePage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    weight: '',
    length: '',
    width: '',
    height: '',
    origin: '',
    destination: '',
    service: 'road',
  });
  const [isPaymentComplete, setIsPaymentComplete] = useState(false);

  const calculateQuote = () => {
    const basePrice = formData.service === 'air' ? 1500 : formData.service === 'ocean' ? 800 : 500;
    const weightFactor = parseFloat(formData.weight || '0') * 150;
    return basePrice + weightFactor;
  };

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 3));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  return (
    <div className="min-h-screen bg-roller-dark pt-12 pb-24 islamic-pattern">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Get a <span className="accent-gradient">Quote</span>
          </h1>
          <p className="text-gray-400">Instant shipping estimates and easy booking</p>
        </div>

        {/* Multi-step indicator */}
        <div className="flex justify-between items-center mb-12 relative">
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-white/5 -translate-y-1/2 z-0" />
          {steps.map((step) => (
            <div key={step.id} className="relative z-10 flex flex-col items-center gap-3">
              <div 
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                  currentStep >= step.id ? 'bg-roller-red text-white shadow-lg shadow-roller-red/30' : 'bg-white/10 text-gray-500'
                }`}
              >
                {currentStep > step.id ? <Check size={20} /> : <step.icon size={20} />}
              </div>
              <span className={`text-xs font-bold uppercase tracking-wider ${currentStep >= step.id ? 'text-white' : 'text-gray-600'}`}>
                {step.title}
              </span>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Main Form Area */}
          <div className="md:col-span-2">
            <motion.div 
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass-panel p-8 rounded-3xl min-h-[400px]"
            >
              {currentStep === 1 && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                    <Package className="text-roller-red" /> Package Details
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm text-gray-400">Weight (kg)</label>
                      <input 
                        type="number" 
                        className="input-field" 
                        placeholder="0.0" 
                        value={formData.weight}
                        onChange={(e) => setFormData({...formData, weight: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-gray-400">Quantity</label>
                      <input type="number" className="input-field" placeholder="1" />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm text-gray-400">L (cm)</label>
                      <input type="number" className="input-field" placeholder="10" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-gray-400">W (cm)</label>
                      <input type="number" className="input-field" placeholder="10" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-gray-400">H (cm)</label>
                      <input type="number" className="input-field" placeholder="10" />
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                    <MapPin className="text-roller-red" /> Route & Service
                  </h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm text-gray-400">Origin City</label>
                      <input 
                        className="input-field" 
                        placeholder="Nairobi, Kenya" 
                        value={formData.origin}
                        onChange={(e) => setFormData({...formData, origin: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-gray-400">Destination City</label>
                      <input 
                        className="input-field" 
                        placeholder="Mombasa, Kenya" 
                        value={formData.destination}
                        onChange={(e) => setFormData({...formData, destination: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 mt-8">
                    {['road', 'air', 'ocean'].map((type) => (
                      <button
                        key={type}
                        onClick={() => setFormData({...formData, service: type})}
                        className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${
                          formData.service === type ? 'bg-roller-red/10 border-roller-red text-white' : 'bg-white/5 border-white/10 text-gray-500'
                        }`}
                      >
                        {type === 'road' && <Truck size={24} />}
                        {type === 'air' && <Plane size={24} />}
                        {type === 'ocean' && <Ship size={24} />}
                        <span className="text-xs font-bold uppercase">{type}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="flex flex-col items-center justify-center py-8">
                  <AnimatePresence mode="wait">
                    {!isPaymentComplete ? (
                      <MpesaPayment 
                        amount={calculateQuote()} 
                        onSuccess={(tid) => setIsPaymentComplete(true)}
                        onCancel={prevStep}
                      />
                    ) : (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center space-y-6"
                      >
                        <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto shadow-xl shadow-green-500/20">
                          <Check size={40} className="text-white" />
                        </div>
                        <h3 className="text-3xl font-bold text-white">All Set!</h3>
                        <p className="text-gray-400">Your shipment has been scheduled. Tracking ID: RMX998234</p>
                        <button className="btn-primary" onClick={() => window.location.href = '/'}>
                          Back to Home
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}

              <div className="mt-12 flex justify-between items-center pt-8 border-t border-white/5">
                {currentStep > 1 && !isPaymentComplete && (
                  <button onClick={prevStep} className="text-gray-400 font-bold hover:text-white transition-colors">
                    Back
                  </button>
                )}
                {currentStep < 3 && (
                  <button onClick={nextStep} className="btn-primary ml-auto flex items-center gap-2">
                    Next Step <ArrowRight size={18} />
                  </button>
                )}
              </div>
            </motion.div>
          </div>

          {/* Shipment Summary Sidebar */}
          <div className="space-y-6">
            <div className="glass-panel p-6 rounded-3xl">
              <h4 className="font-bold text-white mb-6 pb-4 border-b border-white/5 flex items-center gap-2">
                <Scale size={18} className="text-roller-red" /> Summary
              </h4>
              <div className="space-y-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Service</span>
                  <span className="text-white font-bold capitalize">{formData.service}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Weight</span>
                  <span className="text-white font-bold">{formData.weight || '0'} kg</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">From</span>
                  <span className="text-white font-bold">{formData.origin || 'Not set'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">To</span>
                  <span className="text-white font-bold">{formData.destination || 'Not set'}</span>
                </div>
                <div className="pt-6 mt-6 border-t border-white/5">
                  <div className="flex justify-between items-end">
                    <span className="text-gray-400 text-xs">Estimated Cost</span>
                    <span className="text-2xl font-bold text-roller-red">KES {calculateQuote().toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-roller-red/10 p-6 rounded-3xl border border-roller-red/20">
              <p className="text-xs text-roller-red font-bold uppercase tracking-widest mb-2">Notice</p>
              <p className="text-sm text-gray-300">Final price may vary based on exact volume and package dimensions verified during pickup.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
