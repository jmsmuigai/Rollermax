'use client'

import { motion } from 'framer-motion'
import { Wallet, Phone, CheckCircle, Lock } from 'lucide-react'

export default function MpesaIntegration() {
  const features = [
    { icon: Phone, text: 'Pay via M-Pesa' },
    { icon: Wallet, text: 'Instant Payment' },
    { icon: Lock, text: 'Secure Transactions' },
    { icon: CheckCircle, text: 'Verified Payment' },
  ]

  return (
    <section className="py-16 bg-gradient-to-br from-mpesa-dark via-mpesa-DEFAULT to-mpesa-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-white"
          >
            <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Wallet className="w-5 h-5" />
              <span className="text-sm font-semibold">M-Pesa Payment</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Pay Easily with <span className="text-accent">M-Pesa</span>
            </h2>
            <p className="text-xl mb-8 text-green-100 leading-relaxed">
              Fast, secure, and convenient payments using M-Pesa. Pay for your shipments instantly 
              from anywhere in Kenya. No need for credit cards or bank transfers.
            </p>
            
            <div className="grid grid-cols-2 gap-4 mb-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm p-4 rounded-lg"
                >
                  <feature.icon className="w-6 h-6 text-accent" />
                  <span className="font-medium">{feature.text}</span>
                </motion.div>
              ))}
            </div>

            <button className="bg-white text-mpesa-dark px-8 py-4 rounded-lg font-bold text-lg hover:bg-accent transition-colors shadow-xl">
              Pay with M-Pesa
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-2xl">
              {/* M-Pesa Phone Mockup */}
              <div className="bg-gradient-to-br from-mpesa-DEFAULT to-mpesa-dark rounded-2xl p-8 text-white">
                <div className="text-center mb-6">
                  <div className="text-5xl mb-4">📱</div>
                  <h3 className="text-2xl font-bold mb-2">M-Pesa STK Push</h3>
                  <p className="text-green-100">Enter your M-Pesa PIN</p>
                </div>
                
                <div className="space-y-4 mb-6">
                  <div className="bg-white/20 rounded-lg p-4">
                    <p className="text-sm text-green-100 mb-1">Amount</p>
                    <p className="text-2xl font-bold">KES 1,500.00</p>
                  </div>
                  <div className="bg-white/20 rounded-lg p-4">
                    <p className="text-sm text-green-100 mb-1">Pay To</p>
                    <p className="text-lg font-semibold">Rollermax Courier</p>
                  </div>
                  <div className="bg-white/20 rounded-lg p-4">
                    <p className="text-sm text-green-100 mb-1">Account</p>
                    <p className="text-lg font-semibold">RMX123456</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, '', 0, ''].map((num, index) => (
                    <button
                      key={index}
                      className="bg-white/20 hover:bg-white/30 rounded-lg py-4 text-xl font-bold transition-colors"
                    >
                      {num}
                    </button>
                  ))}
                </div>

                <button className="w-full bg-accent text-mpesa-dark rounded-lg py-4 font-bold text-lg mt-4 hover:bg-accent transition-colors">
                  Confirm Payment
                </button>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-accent/30 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

