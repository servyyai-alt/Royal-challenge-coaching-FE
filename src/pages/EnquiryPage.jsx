import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Send, CheckCircle, Phone, Mail } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../utils/api';

const COURSES = ['Tuition (6th-12th)', 'Abacus', 'Robotics', 'Spoken English', 'Hindi (Govt Exam)', 'Other'];
const BOARDS = ['CBSE', 'ICSE', 'Matric', 'Not Applicable'];
const GRADES = ['6th', '7th', '8th', '9th', '10th', '11th', '12th', 'Other'];

export default function EnquiryPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', grade: '', course: '', board: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.course || !form.grade) {
      toast.error('Please fill all required fields.');
      return;
    }
    setLoading(true);
    try {
      await api.post('/enquiries', form);
      setSubmitted(true);
      toast.success('Registration submitted! We\'ll contact you shortly.');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) return (
    <div className="pt-[88px] min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={40} className="text-green-600" />
        </div>
        <h2 className="font-display text-3xl font-bold text-royal-900 mb-3">Registration Received!</h2>
        <p className="text-gray-600 mb-6">Thank you for your interest. Our team will contact you within 24 hours.</p>
        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow text-left mb-6">
          <p className="text-sm font-semibold text-gray-700 mb-3">What happens next?</p>
          {['Our counsellor will call you', 'Discuss your requirements', 'Schedule a free demo class', 'Complete your enrolment'].map((s, i) => (
            <div key={i} className="flex items-center gap-3 py-2">
              <div className="w-6 h-6 rounded-full gradient-royal text-white text-xs flex items-center justify-center font-bold flex-shrink-0">{i + 1}</div>
              <p className="text-sm text-gray-600">{s}</p>
            </div>
          ))}
        </div>
        <Link to="/" className="btn-primary">Back to Home</Link>
      </div>
    </div>
  );

  return (
    <div className="pt-[88px]">
      <section className="page-hero page-hero--enquiry py-16 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h1 className="font-display text-4xl font-bold mb-3">Student Registration</h1>
          <p className="text-royal-200">Fill in the form and we'll get back to you within 24 hours.</p>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4">
          <div className="card p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="label">Student / Parent Name *</label>
                  <input name="name" value={form.name} onChange={handleChange} placeholder="Full Name" className="input" required />
                </div>
                <div>
                  <label className="label">Phone Number *</label>
                  <input name="phone" value={form.phone} onChange={handleChange} placeholder="9999999999" className="input" required />
                </div>
              </div>

              <div>
                <label className="label">Email Address</label>
                <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="yourmail@example.com" className="input" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="label">Course Interested In *</label>
                  <select name="course" value={form.course} onChange={handleChange} className="input" required>
                    <option value="">Select Course</option>
                    {COURSES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="label">Grade / Standard *</label>
                  <select name="grade" value={form.grade} onChange={handleChange} className="input" required>
                    <option value="">Select Grade</option>
                    {GRADES.map(g => <option key={g} value={g}>{g}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="label">Board Preference</label>
                <select name="board" value={form.board} onChange={handleChange} className="input">
                  <option value="">Select Board</option>
                  {BOARDS.map(b => <option key={b} value={b}>{b}</option>)}
                </select>
              </div>

              <div>
                <label className="label">Message (Optional)</label>
                <textarea name="message" value={form.message} onChange={handleChange} rows={4}
                  placeholder="Any specific requirements or questions?" className="input resize-none" />
              </div>

              <button type="submit" disabled={loading}
                className="btn-primary w-full flex items-center justify-center gap-2 py-4 disabled:opacity-60 disabled:cursor-not-allowed">
                {loading ? (
                  <><div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div> Submitting...</>
                ) : (
                  <><Send size={16} /> Submit Registration</>
                )}
              </button>
            </form>
          </div>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <a href="tel:9486091662" className="card p-5 flex items-center gap-4 hover:border-royal-200 group">
              <div className="w-12 h-12 gradient-royal rounded-xl flex items-center justify-center flex-shrink-0">
                <Phone size={20} className="text-white" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Call Us Directly</p>
                <p className="font-bold text-royal-900 group-hover:text-royal-700">94860 91662</p>
              </div>
            </a>
            <a href="mailto:velloreroyalcoachingcentre@gmail.com" className="card p-5 flex items-center gap-4 hover:border-royal-200 group">
              <div className="w-12 h-12 bg-gradient-to-br from-gold-500 to-gold-600 rounded-xl flex items-center justify-center flex-shrink-0">
                <Mail size={20} className="text-white" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Email Us</p>
                <p className="font-bold text-royal-900 group-hover:text-royal-700 text-xs">velloreroyalcoachingcentre@gmail.com</p>
              </div>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
