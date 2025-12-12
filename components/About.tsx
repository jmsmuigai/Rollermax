import { motion } from 'framer-motion'
import { Target, Eye, Heart } from 'lucide-react'
import Image from 'next/image' // Added import

export default function About() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="pr-8"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold text-primary-dark mb-6">
              Delivering Excellence Since Day One
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Rollermax Courier & Logistics Ltd is a leading courier and logistics company in Kenya, 
              dedicated to providing exceptional delivery services.
            </p>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              We combine traditional values of trust and reliability with cutting-edge technology 
              to offer seamless, transparent, and efficient logistics solutions.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <Image // Changed img to Image
              src="/images/camel.webp" // Changed to webp
              alt="About Us"
              className="rounded-lg shadow-lg w-full h-auto"
              width={500} // Added width
              height={300} // Added height
            />
          </motion.div>
        </div>

        <div className="mt-20 grid md:grid-grid-cols-2 gap-12">
          <div className="flex items-start space-x-4">
            <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
              <Eye className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-primary-dark mb-3">Our Vision</h3>
              <p className="text-gray-600 leading-relaxed">
                To become the most trusted and technologically advanced courier service 
                in East Africa, known for our innovation and unwavering commitment to customer satisfaction.
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <div className="w-16 h-16 bg-primary-light rounded-full flex items-center justify-center flex-shrink-0">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-primary-dark mb-3">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed">
                To provide reliable, fast, and secure courier and logistics services that 
                connect people and businesses across Kenya and beyond.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}