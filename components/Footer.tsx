import Link from 'next/link'
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-roller-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-extrabold mb-4">Rollermax</h3>
            <p className="text-gray-300 text-sm mb-4">
              Delivering excellence across Kenya with AI-powered logistics solutions.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-300 hover:text-white transition-colors text-sm">Home</Link></li>
              <li><Link href="/#services" className="text-gray-300 hover:text-white transition-colors text-sm">Services</Link></li>
              <li><Link href="/#about" className="text-gray-300 hover:text-white transition-colors text-sm">About Us</Link></li>
              <li><Link href="/track" className="text-gray-300 hover:text-white transition-colors text-sm">Track Shipment</Link></li>
              <li><Link href="/contact" className="text-gray-300 hover:text-white transition-colors text-sm">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-roller-red mt-0.5 flex-shrink-0" />
                <a href="tel:+254722227172" className="text-gray-300 hover:text-white transition-colors text-sm">0722 227 172</a>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-roller-red mt-0.5 flex-shrink-0" />
                <span className="text-gray-300 text-sm">Nairobi, Kenya</span>
              </li>
              <li className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-roller-red mt-0.5 flex-shrink-0" />
                <a href="mailto:info@rollermax.co.ke" className="text-gray-300 hover:text-white transition-colors text-sm">info@rollermax.co.ke</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">Newsletter</h3>
            <p className="text-gray-300 text-sm mb-4">Stay up to date with our latest news and offers.</p>
            <form>
              <div className="flex">
                <input type="email" placeholder="Enter your email" className="bg-white/5 text-white px-4 py-2 rounded-l-md focus:outline-none w-full" />
                <button type="submit" className="bg-roller-red hover:bg-red-600 text-white px-4 py-2 rounded-r-md font-semibold">Subscribe</button>
              </div>
            </form>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8">
          <p className="text-gray-300 text-sm text-center">
            © {new Date().getFullYear()} Rollermax Courier & Logistics Ltd. All rights reserved.
          </p>
        </div>

        {/* Mobile CTA */}
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 sm:hidden z-50">
          <a href="/quote" className="inline-flex items-center gap-3 bg-gradient-to-r from-roller-blue to-roller-red text-white px-6 py-3 rounded-full shadow-xl font-bold">
            Ship Now
          </a>
        </div>
      </div>
    </footer>
  )
}