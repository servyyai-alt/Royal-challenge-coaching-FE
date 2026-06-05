import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import toast from 'react-hot-toast';
import AdminLayout from '../../components/admin/AdminLayout';
import api from '../../utils/api';

export default function AdminTutorRegistrationDetail() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editData, setEditData] = useState({ status: 'pending', notes: '' });

  const load = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/tutor-registrations/${id}`);
      setItem(res.data.data);
      setEditData({ status: res.data.data.status, notes: res.data.data.notes || '' });
    } catch {
      toast.error('Failed to load tutor registration.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, [id]);

  const save = async () => {
    try {
      await api.put(`/tutor-registrations/${id}`, editData);
      toast.success('Tutor registration updated.');
      load();
    } catch {
      toast.error('Failed to update.');
    }
  };

  if (loading) return <AdminLayout title="Tutor Registration Detail"><div className="py-20 text-center">Loading...</div></AdminLayout>;
  if (!item) return <AdminLayout title="Tutor Registration Detail"><p className="text-gray-500">Tutor registration not found.</p></AdminLayout>;

  return (
    <AdminLayout title="Tutor Registration Detail">
      <div className="mb-5">
        <Link to="/admin/tutor-registrations" className="flex items-center gap-1.5 text-gray-500 hover:text-royal-800 text-sm transition-colors">
          <ArrowLeft size={16} /> Back to Tutor Registrations
        </Link>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-5">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="font-display text-xl font-bold text-royal-900">{item.name}</h2>
            <p className="text-gray-500 text-sm mt-1">{item.tutorCode} · {item.city}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm mt-5">
              {[
                ['Gender/Age', item.genderAge],
                ['Teaching', item.interestedInTeaching],
                ['Area', item.area],
                ['Subarea', item.subarea],
                ['Preferred Area', item.preferredArea],
                ['Experience', item.experienceOfTeaching],
                ['Class', item.interestedInClass],
                ['Subjects', item.interestedInSubjects],
                ['Qualification', item.qualification],
                ['Fees', item.feesExpectation],
                ['Phone', item.phone || '—'],
                ['Email', item.email || '—'],
              ].map(([label, value]) => (
                <div key={label}><p className="text-gray-400 text-xs">{label}</p><p className="font-semibold text-gray-800 mt-0.5">{value}</p></div>
              ))}
            </div>
          </div>
        </div>
        <div className="space-y-5">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
            <div>
              <label className="label text-xs">Status</label>
              <select value={editData.status} onChange={(e) => setEditData((p) => ({ ...p, status: e.target.value }))} className="input text-sm py-2">
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
              </select>
            </div>
            <div>
              <label className="label text-xs">Notes</label>
              <textarea value={editData.notes} onChange={(e) => setEditData((p) => ({ ...p, notes: e.target.value }))} rows={4} className="input text-sm resize-none" />
            </div>
            <button onClick={save} className="btn-primary flex items-center gap-2 text-sm py-2.5 w-full">
              <Save size={14} /> Save Changes
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
