import { Phone, Mail, MapPin, Globe, Clock, Facebook, Instagram, Youtube, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const HOURS = [
  { day: 'Monday – Friday', time: '7:00 AM – 8:00 PM' },
  { day: 'Saturday', time: '7:00 AM – 6:00 PM' },
  { day: 'Sunday', time: '9:00 AM – 1:00 PM' },
];

export default function ContactPage() {
  return (
    <div className="pt-[88px]">
      <section className="page-hero page-hero--contact1 py-20  text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h1 className="font-display text-4xl font-bold mb-3">Contact Us</h1>
          <p className="text-royal-200">We'd love to hear from you. Get in touch with us today.</p>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Contact info */}
            <div className="space-y-6">
              <div className="card p-6">
                <h2 className="font-display text-xl font-bold text-royal-900 mb-5">Get In Touch</h2>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="w-11 h-11 gradient-royal rounded-xl flex items-center justify-center flex-shrink-0 shadow">
                      <MapPin size={18} className="text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-gray-800">Address</p>
                      <p className="text-gray-600 text-sm leading-relaxed mt-0.5">
                        #25, Uthiramatha Koil Street, Old Town, Vellore.<br />
                        <span className="text-gray-500 text-xs">Near Arulmigu Mariyamman And Padavettamman Thirukovil</span>
                      </p>
                    </div>
                  </div>

                  <a href="tel:9486091662" className="flex gap-4 hover:bg-gray-50 -mx-2 px-2 py-2 rounded-xl transition-colors group">
                    <div className="w-11 h-11 bg-gradient-to-br from-gold-500 to-gold-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow">
                      <Phone size={18} className="text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-gray-800">Phone</p>
                      <p className="text-royal-800 font-bold group-hover:text-royal-600 transition-colors">94860 91662</p>
                    </div>
                  </a>

                  <a href="mailto:info@royalcoachingcenter.com" className="flex gap-4 hover:bg-gray-50 -mx-2 px-2 py-2 rounded-xl transition-colors">
                    <div className="w-11 h-11 bg-gradient-to-br from-purple-600 to-purple-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow">
                      <Mail size={18} className="text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-gray-800">Email</p>
                      <p className="text-gray-600 text-sm">info@royalcoachingcenter.com</p>
                    </div>
                  </a>

                  <a href="https://www.royalcoachingcenter.com" target="_blank" rel="noreferrer" className="flex gap-4 hover:bg-gray-50 -mx-2 px-2 py-2 rounded-xl transition-colors">
                    <div className="w-11 h-11 bg-gradient-to-br from-teal-600 to-cyan-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow">
                      <Globe size={18} className="text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-gray-800">Website</p>
                      <p className="text-gray-600 text-sm">www.royalcoachingcenter.com</p>
                    </div>
                  </a>
                </div>
              </div>

              <div className="card p-6">
                <h2 className="font-display text-xl font-bold text-royal-900 mb-4 flex items-center gap-2">
                  <Clock size={20} className="text-gold-500" /> Working Hours
                </h2>
                <div className="space-y-3">
                  {HOURS.map(({ day, time }) => (
                    <div key={day} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                      <span className="text-sm text-gray-600">{day}</span>
                      <span className="text-sm font-semibold text-royal-800">{time}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card p-6">
                <h2 className="font-display text-xl font-bold text-royal-900 mb-4">Follow Us</h2>
                <div className="flex gap-3">
                  {[
                    { Icon: Facebook, label: 'Facebook', color: 'bg-blue-600', href: '#' },
                    { Icon: Instagram, label: 'Instagram', color: 'bg-pink-600', href: '#' },
                    { Icon: Youtube, label: 'YouTube', color: 'bg-red-600', href: '#' },
                    { Icon: MessageCircle, label: 'WhatsApp', color: 'bg-green-600', href: 'https://wa.me/919486091662' },
                  ].map(({ Icon, label, color, href }) => (
                    <a key={label} href={href} target="_blank" rel="noreferrer"
                       className={`${color} text-white rounded-xl p-3 hover:scale-110 transition-transform shadow`}>
                      <Icon size={20} />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="space-y-6">
              <div className="card overflow-hidden">
                <div className="bg-gray-100 h-80 flex items-center justify-center relative">
                  <iframe
                    title="Royal Coaching Centre Location"
                    src="https://maps.google.com/maps?q=Vellore+Old+Town&t=&z=14&ie=UTF8&iwloc=&output=embed"
                    className="w-full h-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
                <div className="p-5">
                  <p className="font-semibold text-gray-800 mb-1">Royal Coaching Centre</p>
                  <p className="text-gray-500 text-sm">#25, Uthiramatha Koil Street, Old Town, Vellore.</p>
                  <a
                    href="https://maps.google.com/?q=Vellore+Old+Town"
                    target="_blank"
                    rel="noreferrer"
                    className="text-royal-800 text-sm font-semibold mt-2 inline-flex items-center gap-1 hover:underline"
                  >
                    Open in Google Maps →
                  </a>
                </div>
              </div>

              <div className="card p-6 gradient-royal text-white">
                <h3 className="font-display text-xl font-bold mb-2">Ready to Enroll?</h3>
                <p className="text-royal-200 text-sm mb-5">Submit a student registration and our team will call you back within 24 hours.</p>
                <Link to="/enquiry" className="bg-gold-500 hover:bg-gold-600 text-white px-6 py-3 rounded-full font-semibold text-sm inline-block transition-colors">
                  Student Registration
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
