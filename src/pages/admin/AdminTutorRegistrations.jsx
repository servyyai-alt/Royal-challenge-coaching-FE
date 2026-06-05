import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Eye, Trash2, RefreshCw, Save } from 'lucide-react';
import toast from 'react-hot-toast';
import AdminLayout from '../../components/admin/AdminLayout';
import api from '../../utils/api';

const STATUS_BADGES = {
  pending: 'badge-new',
  approved: 'badge-enrolled',
};

const EMPTY = {
  name: '',
  tutorCode: '',
  genderAge: '',
  interestedInTeaching: 'Home Tuition',
  city: '',
  area: '',
  subarea: '',
  preferredArea: '',
  experienceOfTeaching: '',
  interestedInClass: '',
  interestedInSubjects: '',
  qualification: '',
  feesExpectation: '',
  phone: '',
  email: '',
  status: 'pending',
  notes: '',
};

const FIELD_LABELS = {
  name: 'Name *',
  tutorCode: 'Tutor Code *',
  genderAge: 'Gender / Age *',
  interestedInTeaching: 'Interested in Teaching *',
  city: 'City *',
  area: 'Area *',
  subarea: 'Subarea *',
  preferredArea: 'Preferred Area *',
  experienceOfTeaching: 'Experience of Teaching *',
  interestedInClass: 'Interested in Class *',
  interestedInSubjects: 'Interested in Subjects *',
  qualification: 'Qualification *',
  feesExpectation: 'Fees Expectation *',
  phone: 'Phone',
  email: 'Email',
};

export default function AdminTutorRegistrations() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({ total: 0, pages: 1 });
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);
  const [searchInput, setSearchInput] = useState('');

  const load = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page, limit: 15 });
      if (search) params.append('search', search);
      if (status) params.append('status', status);
      const res = await api.get(`/tutor-registrations?${params}`);
      setItems(res.data.data);
      setPagination({ total: res.data.total, pages: res.data.pages });
    } catch {
      toast.error('Failed to load tutor registrations');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, [page, status]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(searchInput);
    setPage(1);
    load();
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.tutorCode || !form.interestedInTeaching) {
      toast.error('Please fill required fields.');
      return;
    }
    setSaving(true);
    try {
      await api.post('/tutor-registrations', form);
      toast.success('Tutor registration added.');
      setForm(EMPTY);
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add.');
    } finally {
      setSaving(false);
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      await api.put(`/tutor-registrations/${id}`, { status: newStatus });
      toast.success('Status updated.');
      load();
    } catch {
      toast.error('Failed to update status.');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this tutor registration?')) return;
    try {
      await api.delete(`/tutor-registrations/${id}`);
      toast.success('Tutor registration deleted.');
      load();
    } catch {
      toast.error('Failed to delete.');
    }
  };

  return (
    <AdminLayout title="Tutor Registrations">
      <div className="space-y-5">
        <form onSubmit={submit} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display font-bold text-royal-900">Add Tutor Registration</h2>
            <button type="submit" disabled={saving} className="btn-primary flex items-center gap-2 text-sm py-2.5">
              <Save size={14} /> {saving ? 'Saving...' : 'Save'}
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(EMPTY).map(([key]) => (
              key === 'status' || key === 'notes' ? null : (
                <input key={key} name={key} value={form[key]} onChange={(e) => setForm((p) => ({ ...p, [key]: e.target.value }))} placeholder={FIELD_LABELS[key] || key} className="input text-sm" />
              )
            ))}
          </div>
        </form>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <div className="flex flex-wrap gap-3">
            <form onSubmit={handleSearch} className="flex gap-2 flex-1 min-w-[220px]">
              <div className="relative flex-1">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input value={searchInput} onChange={(e) => setSearchInput(e.target.value)} placeholder="Search by name, code, city..." className="input pl-9 py-2.5 text-sm w-full" />
              </div>
              <button type="submit" className="btn-primary py-2.5 px-4 text-sm">Search</button>
            </form>
            <select value={status} onChange={(e) => { setStatus(e.target.value); setPage(1); }} className="input py-2.5 text-sm w-40">
              <option value="">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
            </select>
            <button type="button" onClick={() => { setSearch(''); setStatus(''); setPage(1); load(); }} className="p-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
              <RefreshCw size={16} className="text-gray-500" />
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
            <p className="font-semibold text-gray-700 text-sm">{pagination.total} registrations total</p>
          </div>
          {loading ? (
            <div className="flex items-center justify-center py-16"><div className="animate-spin w-8 h-8 border-4 border-royal-800 border-t-transparent rounded-full"></div></div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full admin-table">
                <thead>
                  <tr>
                    <th>Name</th><th>Code</th><th>City</th><th>Subject</th><th>Status</th><th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {items.length === 0 ? (
                    <tr><td colSpan={6} className="text-center text-gray-400 py-10">No tutor registrations found.</td></tr>
                  ) : items.map((t) => (
                    <tr key={t._id}>
                      <td><p className="font-semibold text-gray-800">{t.name}</p><p className="text-xs text-gray-400">{t.phone || t.email}</p></td>
                      <td>{t.tutorCode}</td>
                      <td>{t.city}</td>
                      <td>{t.interestedInSubjects}</td>
                      <td>
                        <select value={t.status} onChange={(e) => updateStatus(t._id, e.target.value)} className={`${STATUS_BADGES[t.status]} border-0 bg-transparent cursor-pointer text-xs font-semibold rounded-full px-2 py-0.5`}>
                          <option value="pending">Pending</option>
                          <option value="approved">Approved</option>
                        </select>
                      </td>
                      <td>
                        <div className="flex items-center gap-2">
                          <Link to={`/admin/tutor-registrations/${t._id}`} className="p-1.5 bg-royal-50 hover:bg-royal-100 text-royal-800 rounded-lg transition-colors"><Eye size={15} /></Link>
                          <button onClick={() => handleDelete(t._id)} className="p-1.5 bg-red-50 hover:bg-red-100 text-red-500 rounded-lg transition-colors"><Trash2 size={15} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
