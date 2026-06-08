import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Phone, ChevronDown } from 'lucide-react';
import logo from '../../assets/logo.png';

const NAV_ITEMS = [
  { label: 'Home', to: '/' },
  { label: 'Courses', to: '/courses' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Contact', to: '/contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [location]);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white shadow-lg' : 'bg-white/95 backdrop-blur-sm'
    }`}>
      {/* Top bar */}
      <div className="bg-royal-900 text-white text-xs py-1.5">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <span className="opacity-80">🎓 Admissions Open 2026-27 | 6th to 12th Std</span>
          <a href="tel:9486091662" className="flex items-center gap-1 font-semibold hover:text-gold-400 transition-colors">
            <Phone size={12} />
            94860 91662
          </a>
        </div>
      </div>

      <nav className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <img
            src={logo}
            alt="Royal Coaching Centre logo"
            className="w-10 h-10 rounded-xl object-contain shadow-lg group-hover:scale-105 transition-transform bg-white"
          />
          <div className="">
            <p className="font-display font-bold text-royal-900 text-sm leading-tight">Royal Coaching Centre</p>
            <p className="text-[10px] text-gray-500 font-body">Learn • Grow • Succeed</p>
          </div>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map(({ label, to }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `nav-link text-sm ${isActive ? 'text-royal-800 font-semibold after:w-full' : ''}`
              }
            >
              {label}
            </NavLink>
          ))}
           <Link to="/tutor-registration" className="border border-royal-200 text-royal-800 hover:bg-royal-50 text-sm py-2 px-5 rounded-full font-semibold transition-colors">
            Tutor Registration
          </Link>
          <Link to="/enquiry" className="btn-gold text-sm py-2 px-5">
            Student Registration
          </Link>
         
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          aria-label="Toggle menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-xl">
          <div className="px-4 py-4 space-y-1">
            {NAV_ITEMS.map(({ label, to }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `block px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                    isActive ? 'bg-royal-50 text-royal-800 font-semibold' : 'text-gray-700 hover:bg-gray-50'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}

             <Link to="/tutor-registration" className="block border border-royal-200 text-royal-800 text-center mt-3 text-sm py-3 rounded-full font-semibold">
              Tutor Registration
            </Link>
            <Link to="/enquiry" className="block btn-gold text-center mt-3 text-sm py-3">
              Student Registration
            </Link>
           
          </div>
        </div>
      )}
    </header>
  );
}
