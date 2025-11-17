'use client'

import { motion } from 'framer-motion'
import { Target, Eye, Heart, Sparkles } from 'lucide-react'

export default function About() {
  return (
    <section id="about" className="section-padding">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center space-x-2 bg-accent/20 text-accent px-4 py-2 rounded-full mb-6">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-semibold">About Us</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Delivering <span className="accent-gradient">Excellence</span> Since Day One
            </h2>
            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
              Rollermax Courier & Logistics Ltd is a leading courier and logistics company in Kenya, 
              dedicated to providing exceptional delivery services with a special focus on serving the 
              vibrant Somali community while welcoming customers from all backgrounds.
            </p>
            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
              We combine traditional values of trust and reliability with cutting-edge AI technology 
              to offer seamless, transparent, and efficient logistics solutions. Our commitment to 
              excellence and cultural understanding sets us apart in the industry.
            </p>
          </motion.div>

          {/* Right Side - Vision & Mission */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Vision */}
            <div className="card">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-accent to-accent-light rounded-xl flex items-center justify-center flex-shrink-0">
                  <Eye className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-3 flex items-center">
                    <Target className="w-5 h-5 mr-2 text-accent" />
                    Our Vision
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    To become the most trusted and technologically advanced courier service 
                    in East Africa, known for our cultural sensitivity, technological innovation, 
                    and unwavering commitment to customer satisfaction. We envision a future where 
                    logistics is seamless, transparent, and accessible to everyone.
                  </p>
                </div>
              </div>
            </div>

            {/* Mission */}
            <div className="card">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-3 flex items-center">
                    <Target className="w-5 h-5 mr-2 text-blue-400" />
                    Our Mission
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    To provide reliable, fast, and secure courier and logistics services that 
                    connect people and businesses across Kenya and beyond. We leverage advanced 
                    AI-powered monitoring systems to ensure real-time tracking and updates, 
                    while maintaining the highest standards of service quality. Our mission is 
                    to serve our community with integrity, respect, and excellence, bridging 
                    cultures and delivering smiles with every package.
                  </p>
                </div>
              </div>
            </div>

            {/* AI Feature Highlight */}
            <div className="card border-2 border-accent/50 bg-gradient-to-br from-accent/10 to-transparent">
              <div className="flex items-center space-x-3 mb-4">
                <Sparkles className="w-6 h-6 text-accent" />
                <h3 className="text-xl font-bold text-white">AI-Powered Monitoring</h3>
              </div>
              <p className="text-gray-300 leading-relaxed">
                Our intelligent AI system continuously monitors your shipments, providing 
                predictive analytics, automated updates, and proactive problem-solving. 
                Experience peace of mind knowing your goods are watched over by advanced 
                technology 24/7.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

