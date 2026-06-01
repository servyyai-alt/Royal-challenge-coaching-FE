import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Eye, Trash2, RefreshCw, ChevronLeft, ChevronRight } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import api from '../../utils/api';
import toast from 'react-hot-toast';

const STATUS_BADGES = {
  'new': 'badge-new',
  'in-progress': 'badge-progress',
  'replied': 'badge-replied',
  'enrolled': 'badge-enrolled',
  'closed': 'badge-closed',
};

const COURSES = ['', 'Tuition (6th-12th)', 'Abacus', 'Robotics', 'Spoken English', 'Hindi (Govt Exam)', 'Other'];
const STATUSES = ['', 'new', 'in-progress', 'replied', 'enrolled', 'closed'];

export default function AdminEnquiries() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [course, setCourse] = useState('');
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({ total: 0, pages: 1 });

  const fetchEnquiries = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page, limit: 15 });
      if (search) params.append('search', search);
      if (status) params.append('status', status);
      if (course) params.append('course', course);
      const res = await api.get(`/enquiries?${params}`);
      setEnquiries(res.data.data);
      setPagination({ total: res.data.total, pages: res.data.pages });
    } catch (err) {
      toast.error('Failed to load enquiries');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchEnquiries(); }, [page, status, course]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    fetchEnquiries();
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this enquiry?')) return;
    try {
      await api.delete(`/enquiries/${id}`);
      toast.success('Enquiry deleted.');
      fetchEnquiries();
    } catch { toast.error('Failed to delete.'); }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await api.put(`/enquiries/${id}`, { status: newStatus });
      toast.success('Status updated.');
      fetchEnquiries();
    } catch { toast.error('Failed to update.'); }
  };

  return (
    <AdminLayout title="Enquiries">
      <div className="space-y-5">
        {/* Filters */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <div className="flex flex-wrap gap-3">
            <form onSubmit={handleSearch} className="flex gap-2 flex-1 min-w-[200px]">
              <div className="relative flex-1">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input value={search} onChange={e => setSearch(e.target.value)}
                  placeholder="Search by name, email, phone..." className="input pl-9 py-2.5 text-sm" />
              </div>
              <button type="submit" className="btn-primary py-2.5 px-4 text-sm">Search</button>
            </form>

            <select value={status} onChange={e => { setStatus(e.target.value); setPage(1); }} className="input py-2.5 text-sm w-40">
              <option value="">All Status</option>
              {STATUSES.slice(1).map(s => <option key={s} value={s}>{s}</option>)}
            </select>

            <select value={course} onChange={e => { setCourse(e.target.value); setPage(1); }} className="input py-2.5 text-sm w-48">
              <option value="">All Courses</option>
              {COURSES.slice(1).map(c => <option key={c} value={c}>{c}</option>)}
            </select>

            <button onClick={() => { setSearch(''); setStatus(''); setCourse(''); setPage(1); fetchEnquiries(); }}
              className="p-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
              <RefreshCw size={16} className="text-gray-500" />
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
            <p className="font-semibold text-gray-700 text-sm">{pagination.total} enquiries total</p>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-16">
              <div className="animate-spin w-8 h-8 border-4 border-royal-800 border-t-transparent rounded-full"></div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full admin-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Course</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {enquiries.length === 0 ? (
                    <tr><td colSpan={6} className="text-center text-gray-400 py-10">No enquiries found.</td></tr>
                  ) : enquiries.map(enq => (
                    <tr key={enq._id}>
                      <td>
                        <p className="font-semibold text-gray-800">{enq.name}</p>
                        <p className="text-gray-400 text-xs">{enq.email}</p>
                      </td>
                      <td className="font-medium">{enq.phone}</td>
                      <td>
                        <p className="text-sm">{enq.course}</p>
                        {enq.grade && <p className="text-xs text-gray-400">Grade: {enq.grade}</p>}
                      </td>
                      <td>
                        <select
                          value={enq.status}
                          onChange={e => handleStatusChange(enq._id, e.target.value)}
                          className={`${STATUS_BADGES[enq.status]} border-0 bg-transparent cursor-pointer text-xs font-semibold rounded-full px-2 py-0.5`}
                        >
                          {STATUSES.slice(1).map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </td>
                      <td className="text-gray-500 text-xs">{new Date(enq.createdAt).toLocaleDateString('en-IN')}</td>
                      <td>
                        <div className="flex items-center gap-2">
                          <Link to={`/admin/enquiries/${enq._id}`}
                            className="p-1.5 bg-royal-50 hover:bg-royal-100 text-royal-800 rounded-lg transition-colors">
                            <Eye size={15} />
                          </Link>
                          <button onClick={() => handleDelete(enq._id)}
                            className="p-1.5 bg-red-50 hover:bg-red-100 text-red-500 rounded-lg transition-colors">
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          {pagination.pages > 1 && (
            <div className="px-5 py-4 border-t border-gray-100 flex items-center justify-between">
              <p className="text-sm text-gray-500">Page {page} of {pagination.pages}</p>
              <div className="flex gap-2">
                <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
                  className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-40 transition-colors">
                  <ChevronLeft size={16} />
                </button>
                <button onClick={() => setPage(p => Math.min(pagination.pages, p + 1))} disabled={page === pagination.pages}
                  className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-40 transition-colors">
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
