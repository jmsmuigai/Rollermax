import Link from 'next/link'
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'
import Logo3D from './Logo3D'

export default function Footer() {
  return (
    <footer className="bg-primary-dark border-t border-accent/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <Link href="/" className="flex items-center space-x-3 mb-4 group">
              <div className="scale-75">
                <Logo3D />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold">
                  <span className="text-white">Roller</span>
                  <span className="text-accent">max</span>
                </span>
                <span className="text-xs text-primary dark:text-white/70 uppercase group-hover:text-accent transition-colors">Courier</span>
              </div>
            </Link>
            <p className="text-primary dark:text-white/70 text-sm mb-4">
              Delivering excellence across Kenya with AI-powered logistics solutions.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-primary dark:text-white/70 hover:text-accent transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-primary dark:text-white/70 hover:text-accent transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-primary dark:text-white/70 hover:text-accent transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-primary dark:text-white/70 hover:text-accent transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-primary dark:text-white/70 hover:text-accent transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/#services" className="text-primary dark:text-white/70 hover:text-accent transition-colors text-sm">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/#about" className="text-primary dark:text-white/70 hover:text-accent transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/track" className="text-primary dark:text-white/70 hover:text-accent transition-colors text-sm">
                  Track Shipment
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-primary dark:text-white/70 hover:text-accent transition-colors text-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-bold mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/#services" className="text-primary dark:text-white/70 hover:text-accent transition-colors text-sm">
                  Local Shipping
                </Link>
              </li>
              <li>
                <Link href="/#services" className="text-primary dark:text-white/70 hover:text-accent transition-colors text-sm">
                  International Shipping
                </Link>
              </li>
              <li>
                <Link href="/#services" className="text-primary dark:text-white/70 hover:text-accent transition-colors text-sm">
                  Freight Forwarding
                </Link>
              </li>
              <li>
                <Link href="/#services" className="text-primary dark:text-white/70 hover:text-accent transition-colors text-sm">
                  Customs Clearance
                </Link>
              </li>
              <li>
                <Link href="/#services" className="text-primary dark:text-white/70 hover:text-accent transition-colors text-sm">
                  Door to Door Delivery
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                <div>
                  <a href="tel:+254722227172" className="text-primary dark:text-white/70 hover:text-accent transition-colors text-sm block">
                    0722 227 172
                  </a>
                  <a href="tel:+254714848821" className="text-primary dark:text-white/70 hover:text-accent transition-colors text-sm block">
                    0714 848 821
                  </a>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                <span className="text-primary dark:text-white/70 text-sm">
                  8th Street Eastleigh<br />
                  Al Hamdu Plaza<br />
                  Nairobi, Kenya
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                <a href="mailto:info@rollermax.co.ke" className="text-primary dark:text-white/70 hover:text-accent transition-colors text-sm">
                  info@rollermax.co.ke
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-accent/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-primary dark:text-white/70 text-sm text-center md:text-left">
              © {new Date().getFullYear()} Rollermax Courier & Logistics Ltd. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link href="#" className="text-primary dark:text-white/70 hover:text-accent transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="text-primary dark:text-white/70 hover:text-accent transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

