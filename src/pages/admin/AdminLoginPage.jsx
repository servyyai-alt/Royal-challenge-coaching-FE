import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, LogIn } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import logo from '../../assets/logo.png';

export default function AdminLoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPwd, setShowPwd] = useState(false);
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(form.email, form.password);
    if (result.success) { toast.success('Welcome back!'); navigate('/admin'); }
    else toast.error(result.message);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-royal-950 via-royal-900 to-royal-800 flex items-center justify-center px-4">
      {/* BG */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-royal-400/20 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-2xl">
            <img
              src={logo}
              alt="Royal Coaching Centre logo"
              className="w-15 h-15 rounded-xl object-contain shadow-lg group-hover:scale-105 transition-transform bg-white"
            />
          </div>
          <h1 className="font-display text-2xl font-bold text-white">Admin Portal</h1>
          <p className="text-royal-300 text-sm mt-1">Royal Coaching Centre</p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="label">Email Address</label>
              <input type="email" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                placeholder="email..." className="input" required />
            </div>
            <div>
              <label className="label">Password</label>
              <div className="relative">
                <input type={showPwd ? 'text' : 'password'} value={form.password}
                  onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
                  placeholder="••••••••" className="input pr-11" required />
                <button type="button" onClick={() => setShowPwd(!showPwd)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showPwd ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* <div className="bg-royal-50 rounded-xl p-3 text-xs text-royal-700 border border-royal-100">
              <strong>Demo:</strong> admin@royalcoachingcentre.com / Admin@123
            </div> */}

            <button type="submit" disabled={loading}
              className="btn-primary w-full flex items-center justify-center gap-2 py-3.5 disabled:opacity-60">
              {loading ? <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                : <><LogIn size={16} /> Sign In</>}
            </button>
          </form>
        </div>

        <div className="text-center mt-4">
          <Link to="/" className="text-royal-300 text-sm hover:text-white transition-colors">← Back to Website</Link>
        </div>
      </div>
    </div>
  );
}
