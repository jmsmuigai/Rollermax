'use client'

import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'
import SectionBackground from './SectionBackground'

const testimonials = [
  {
    name: 'Ahmed Hassan',
    location: 'Nairobi, Kenya',
    rating: 5,
    text: 'Rollermax has been incredible! The AI tracking feature is amazing - I always know exactly where my packages are. Their service to the Somali community is unmatched.',
    role: 'Business Owner',
  },
  {
    name: 'Fatima Ali',
    location: 'Mombasa, Kenya',
    rating: 5,
    text: 'Fast, reliable, and professional. They understand our needs and deliver with excellence. Highly recommend for anyone looking for trustworthy courier services.',
    role: 'E-commerce Trader',
  },
  {
    name: 'Omar Mohamed',
    location: 'Garissa, Kenya',
    rating: 5,
    text: 'The real-time updates and AI monitoring give me complete peace of mind. Rollermax truly cares about their customers and goes above and beyond.',
    role: 'Entrepreneur',
  },
]

export default function Testimonials() {
  return (
    <SectionBackground imageSrc="/images/Screenshot 2025-11-11 at 12.28.08.png">
      <section className="section-padding bg-primary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            What Our <span className="accent-gradient">Customers Say</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Don't just take our word for it - hear from our satisfied customers
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="card relative"
            >
              <Quote className="absolute top-6 right-6 w-12 h-12 text-accent/20" />
              <div className="flex space-x-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                ))}
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed relative z-10">
                "{testimonial.text}"
              </p>
              <div className="border-t border-accent/20 pt-4">
                <p className="font-bold text-white">{testimonial.name}</p>
                <p className="text-sm text-gray-400">{testimonial.role}</p>
                <p className="text-xs text-gray-500 mt-1">{testimonial.location}</p>
              </div>
            </motion.div>
          ))}
        </div>
        </div>
      </section>
    </SectionBackground>
  )
}

