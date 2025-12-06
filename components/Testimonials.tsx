'use client'

import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'

const testimonials = [
  {
    name: 'Ahmed Hassan',
    location: 'Nairobi, Kenya',
    rating: 5,
    text: 'Rollermax has been incredible! The AI tracking feature is amazing - I always know exactly where my packages are.',
    role: 'Business Owner',
    avatar: '/images/avatar1.png',
  },
  {
    name: 'Fatima Ali',
    location: 'Mombasa, Kenya',
    rating: 5,
    text: 'Fast, reliable, and professional. They understand our needs and deliver with excellence. Highly recommend for anyone looking for trustworthy courier services.',
    role: 'E-commerce Trader',
    avatar: '/images/avatar2.png',
  },
  {
    name: 'Omar Mohamed',
    location: 'Garissa, Kenya',
    rating: 5,
    text: 'The real-time updates and AI monitoring give me complete peace of mind. Rollermax truly cares about their customers and goes above and beyond.',
    role: 'Entrepreneur',
    avatar: '/images/avatar3.png',
  },
]

export default function Testimonials() {
  return (
    <section className="py-20 bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-primary-dark mb-4">
            What Our Customers Say
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
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
              className="bg-white p-8 rounded-lg shadow-md"
            >
              <div className="flex items-center mb-6">
                <img src={testimonial.avatar} alt={testimonial.name} className="w-16 h-16 rounded-full mr-4" />
                <div>
                  <p className="font-bold text-primary-dark text-lg">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
              <div className="flex space-x-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                ))}
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed">
                "{testimonial.text}"
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}