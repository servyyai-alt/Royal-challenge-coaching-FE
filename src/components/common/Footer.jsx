import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Globe, Facebook, Instagram, Youtube, MessageCircle, X } from 'lucide-react';
import logo from '../../assets/logo.png';

export default function Footer() {
  return (
    <footer className="bg-royal-950 text-white">
      <div className="max-w-7xl mx-auto px-4 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src={logo}
                alt="Royal Coaching Centre logo"
                className="w-10 h-10 rounded-xl object-contain shadow-lg bg-white"
              />
              <div>
                <p className="font-display font-bold text-lg leading-tight">Royal Coaching Centre</p>
                <p className="text-xs text-gray-400">Learn • Grow • Succeed</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Empowering students with quality education since years. Dedicated to academic excellence and holistic development.
            </p>
            <div className="flex gap-3">
              {[
                { Icon: Facebook, href: 'https://www.facebook.com/profile.php?id=61590686069413', color: 'hover:bg-blue-600' },
                { Icon: Instagram, href: 'https://www.instagram.com/velloreroyalcoaching/', color: 'hover:bg-pink-600' },
                { Icon: Youtube, href: 'https://www.youtube.com/@velloreroyalcoachingcentre', color: 'hover:bg-red-600' },
                { Icon: X, href: 'https://x.com/royal_coaching_', color: 'hover:bg-yellow-600' },
                { Icon: MessageCircle, href: 'https://wa.me/918667717266', color: 'hover:bg-green-600' },
              ].map(({ Icon, href, color }, i) => (
                <a key={i} href={href} target="_blank" rel="noreferrer"
                   className={`w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center transition-colors ${color}`}>
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { label: 'Home', to: '/' },
                { label: 'Courses', to: '/courses' },
                { label: 'Gallery', to: '/gallery' },
                { label: 'Contact Us', to: '/contact' },
                { label: 'Student Registration', to: '/enquiry' },
              ].map(({ label, to }) => (
                <li key={to}>
                  <Link to={to} className="text-gray-400 hover:text-gold-400 text-sm transition-colors flex items-center gap-1.5">
                    <span className="text-gold-500 text-xs">›</span> {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Courses */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4">Our Courses</h4>
            <ul className="space-y-2">
              {['Academic Tuition (6-12)', 'CBSE / ICSE / Matric', 'Abacus', 'Robotics', 'Spoken English', 'Hindi (Govt Exam)'].map(c => (
                <li key={c}>
                  <Link to="/courses" className="text-gray-400 hover:text-gold-400 text-sm transition-colors flex items-center gap-1.5">
                    <span className="text-gold-500 text-xs">›</span> {c}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex gap-3">
                <MapPin size={16} className="text-gold-400 flex-shrink-0 mt-0.5" />
                <p className="text-gray-400 text-sm leading-relaxed">
                  #25, Uthiramatha Koil Street,<br />Old Town, Vellore.<br />
                  <span className="text-gray-500 text-xs">Near Arulmigu Mariyamman And Padavettamman Thirukovil</span>
                </p>
              </div>
              <a href="tel:9486091662" className="flex gap-3 text-gray-400 hover:text-gold-400 transition-colors">
                <Phone size={16} className="text-gold-400 flex-shrink-0" />
                <span className="text-sm font-semibold">94860 91662</span>
              </a>
              <a href="mailto:velloreroyalcoaching@gmail.com" className="flex gap-3 text-gray-400 hover:text-gold-400 transition-colors">
                <Mail size={16} className="text-gold-400 flex-shrink-0" />
                <span className="text-sm">velloreroyalcoaching@gmail.com</span>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex flex-col items-center sm:items-start gap-2">
            <p className="text-gray-500 text-sm text-center sm:text-left">
              © 2026 Royal Coaching Centre. All rights reserved. Developed by Least Action Company
            </p>
            <div className="flex flex-wrap justify-center sm:justify-start gap-x-4 gap-y-2 text-xs">
              <Link to="/privacy-policy" className="text-gray-400 hover:text-gold-400 transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="text-gray-400 hover:text-gold-400 transition-colors">Terms & Conditions</Link>
              <Link to="/refund-policy" className="text-gray-400 hover:text-gold-400 transition-colors">Refund Policy</Link>
              <Link to="/disclaimer" className="text-gray-400 hover:text-gold-400 transition-colors">Disclaimer</Link>
            </div>
          </div>
          <Link to="/admin/login" className="hover:bg-orange-500 text-xs transition-colors px-2 bg-orange-400 text-white rounded-full font-bold py-2">
            Admin Portal
          </Link>
        </div>
      </div>
    </footer>
  );
}
