import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Send } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../utils/api';

const INITIAL = {
  name: '',
  tutorCode: '',
  genderAge: '',
  interestedInTeaching: '',
  address: '',
  experienceOfTeaching: '',
  interestedInClass: '',
  interestedInSubjects: '',
  qualification: '',
  feesExpectation: '',
  phone: '',
  email: '',
};

const TEACHING = ['Home Tuition', 'Group Tuition'];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function TutorRegistrationPage() {
  const [form, setForm] = useState(INITIAL);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const required = ['name', 'phone', 'address', 'email'];
    if (required.some((k) => !String(form[k] || '').trim())) {
      toast.error('Please fill all required fields.');
      return;
    }
    if (!EMAIL_RE.test(String(form.email).trim())) {
      toast.error('Please enter a valid email address.');
      return;
    }
    setLoading(true);
    try {
      await api.post('/tutor-registrations', form);
      setSubmitted(true);
      toast.success('Tutor registration submitted successfully!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="pt-[88px] min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md text-center">
          <CheckCircle size={48} className="text-green-600 mx-auto mb-4" />
          <h1 className="font-display text-3xl font-bold text-royal-900 mb-3">Tutor Registration Received</h1>
          <p className="text-gray-600 mb-6">We have received your application and the admin team will review it shortly.</p>
          <Link to="/" className="btn-primary">Back to Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-[88px]">
      <section className="page-hero page-hero--contact py-16 h-[400px] text-center">
        <div className="max-w-3xl mx-auto px-4">
          <p className="text-gold-300 text-sm font-semibold uppercase tracking-wider mb-2 mt-20">Join Our Teaching Network</p>
          <h1 className="font-display text-4xl font-bold mb-3">Tutor Registration</h1>
          <p className="text-royal-200">Register as a tutor and our team will review your profile.</p>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <form onSubmit={handleSubmit} className="card p-8 space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <input name="name" value={form.name} onChange={handleChange} placeholder="Name *" className="input" />
              <input name="tutorCode" value={form.tutorCode} onChange={handleChange} placeholder="Tutor Code" className="input" />
              <input name="genderAge" value={form.genderAge} onChange={handleChange} placeholder="Gender / Age" className="input" />
              <select name="interestedInTeaching" value={form.interestedInTeaching} onChange={handleChange} className="input">
                <option value="">Interested in Teaching</option>
                {TEACHING.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
              <input name="address" value={form.address} onChange={handleChange} placeholder="Address *" className="input md:col-span-2" />
              <input name="experienceOfTeaching" value={form.experienceOfTeaching} onChange={handleChange} placeholder="Experience of Teaching" className="input" />
              <input name="interestedInClass" value={form.interestedInClass} onChange={handleChange} placeholder="Interested in Class" className="input" />
              <input name="interestedInSubjects" value={form.interestedInSubjects} onChange={handleChange} placeholder="Interested in Subjects" className="input" />
              <input name="qualification" value={form.qualification} onChange={handleChange} placeholder="Qualification" className="input" />
              <input name="feesExpectation" value={form.feesExpectation} onChange={handleChange} placeholder="Fees Expectation" className="input" />
              <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone Number *" className="input" />
              <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Email Address *" className="input" />
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full flex items-center justify-center gap-2 py-4 disabled:opacity-60">
              {loading ? 'Submitting...' : <><Send size={16} /> Submit Tutor Registration</>}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
