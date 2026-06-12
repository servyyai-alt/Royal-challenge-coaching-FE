import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Send, Edit2, Save, X } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import api from '../../utils/api';
import toast from 'react-hot-toast';

const STATUSES = ['new', 'in-progress', 'replied', 'enrolled', 'closed'];
const PRIORITIES = ['low', 'medium', 'high'];

export default function AdminEnquiryDetail() {
  const { id } = useParams();
  const [enquiry, setEnquiry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reply, setReply] = useState('');
  const [replying, setReplying] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editData, setEditData] = useState({});

  const fetchEnquiry = async () => {
    try {
      const res = await api.get(`/enquiries/${id}`);
      setEnquiry(res.data.data);
      setEditData({ status: res.data.data.status, priority: res.data.data.priority, notes: res.data.data.notes || '' });
    } catch { toast.error('Failed to load.'); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchEnquiry(); }, [id]);

  const handleReply = async (e) => {
    e.preventDefault();
    if (!reply.trim()) return;
    setReplying(true);
    try {
      await api.post(`/enquiries/${id}/reply`, { message: reply });
      setReply('');
      toast.success('Reply added.');
      fetchEnquiry();
    } catch { toast.error('Failed to reply.'); }
    finally { setReplying(false); }
  };

  const handleSaveEdit = async () => {
    try {
      await api.put(`/enquiries/${id}`, editData);
      toast.success('Updated.');
      setEditing(false);
      fetchEnquiry();
    } catch { toast.error('Failed to update.'); }
  };

  if (loading) return (
    <AdminLayout title="Student Registration Detail">
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin w-10 h-10 border-4 border-royal-800 border-t-transparent rounded-full"></div>
      </div>
    </AdminLayout>
  );

  if (!enquiry) return (
    <AdminLayout title="Student Registration Detail">
      <p className="text-gray-500">Registration not found.</p>
    </AdminLayout>
  );

  return (
    <AdminLayout title="Student Registration Detail">
      <div className="mb-5">
          <Link to="/admin/enquiries" className="flex items-center gap-1.5 text-gray-500 hover:text-royal-800 text-sm transition-colors">
          <ArrowLeft size={16} /> Back to Registrations
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main */}
        <div className="lg:col-span-2 space-y-5">
          {/* Student info */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex justify-between items-start mb-5">
              <div>
                <h2 className="font-display text-xl font-bold text-royal-900">{enquiry.name}</h2>
                <p className="text-gray-500 text-sm mt-1">{enquiry.email} · {enquiry.phone}</p>
              </div>
              <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                enquiry.status === 'new' ? 'bg-green-100 text-green-700' :
                enquiry.status === 'enrolled' ? 'bg-green-100 text-green-800' :
                enquiry.status === 'replied' ? 'bg-purple-100 text-purple-700' :
                enquiry.status === 'in-progress' ? 'bg-blue-100 text-blue-700' :
                'bg-gray-100 text-gray-600'
              }`}>{enquiry.status}</span>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              {[
                { label: 'Course', value: enquiry.course },
                { label: 'Grade', value: enquiry.grade || '—' },
                { label: 'Board', value: enquiry.board || '—' },
                { label: 'Submitted', value: new Date(enquiry.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p className="text-gray-400 text-xs">{label}</p>
                  <p className="font-semibold text-gray-800 mt-0.5">{value}</p>
                </div>
              ))}
            </div>

            {enquiry.message && (
              <div className="mt-5 p-4 bg-gray-50 rounded-xl">
                <p className="text-xs text-gray-500 mb-1">Message</p>
                <p className="text-gray-700 text-sm">{enquiry.message}</p>
              </div>
            )}
          </div>

          {/* Replies */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h3 className="font-display font-bold text-royal-900 mb-4">Internal Notes ({enquiry.replies.length})</h3>

            {enquiry.replies.length === 0 ? (
              <p className="text-gray-400 text-sm text-center py-6">No notes yet. Add one below.</p>
            ) : (
              <div className="space-y-3 mb-5">
                {enquiry.replies.map((r, i) => (
                  <div key={i} className="bg-royal-50 border border-royal-100 rounded-xl p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-semibold text-royal-800">{r.repliedBy}</span>
                      <span className="text-xs text-gray-400">{new Date(r.repliedAt).toLocaleDateString('en-IN')}</span>
                    </div>
                    <p className="text-sm text-gray-700">{r.message}</p>
                  </div>
                ))}
              </div>
            )}

            <form onSubmit={handleReply} className="space-y-3">
              <textarea value={reply} onChange={e => setReply(e.target.value)}
                placeholder="Write a internal note..." rows={3} className="input resize-none text-sm" />
              <button type="submit" disabled={replying || !reply.trim()}
                className="btn-primary flex items-center gap-2 text-sm py-2.5 disabled:opacity-50">
                {replying ? <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                  : <><Send size={14} /> Add Notes</>}
              </button>
            </form>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-display font-bold text-royal-900">Details</h3>
              {editing ? (
                <div className="flex gap-2">
                  <button onClick={handleSaveEdit} className="p-1.5 bg-green-100 text-green-700 rounded-lg hover:bg-green-200">
                    <Save size={14} />
                  </button>
                  <button onClick={() => setEditing(false)} className="p-1.5 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200">
                    <X size={14} />
                  </button>
                </div>
              ) : (
                <button onClick={() => setEditing(true)} className="p-1.5 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200">
                  <Edit2 size={14} />
                </button>
              )}
            </div>

            <div className="space-y-4">
              <div>
                <label className="label text-xs">Status</label>
                {editing ? (
                  <select value={editData.status} onChange={e => setEditData(p => ({ ...p, status: e.target.value }))} className="input text-sm py-2">
                    {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                ) : <p className="text-sm font-semibold text-gray-800 capitalize">{enquiry.status}</p>}
              </div>

              <div>
                <label className="label text-xs">Priority</label>
                {editing ? (
                  <select value={editData.priority} onChange={e => setEditData(p => ({ ...p, priority: e.target.value }))} className="input text-sm py-2">
                    {PRIORITIES.map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                ) : <p className="text-sm font-semibold text-gray-800 capitalize">{enquiry.priority}</p>}
              </div>

              <div>
                <label className="label text-xs">Internal Notes</label>
                {editing ? (
                  <textarea value={editData.notes} onChange={e => setEditData(p => ({ ...p, notes: e.target.value }))}
                    rows={3} className="input text-sm resize-none" placeholder="Add internal notes..." />
                ) : <p className="text-sm text-gray-600">{enquiry.notes || 'No notes.'}</p>}
              </div>
            </div>
          </div>

          {/* Quick actions */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h3 className="font-display font-bold text-royal-900 mb-4">Quick Contact</h3>
            <div className="space-y-2">
              <a href={`tel:${enquiry.phone}`} className="btn-primary block text-center text-sm py-2.5">
                📞 Call {enquiry.name}
              </a>
              <a href={`mailto:${enquiry.email}`} className="btn-outline block text-center text-sm py-2.5">
                ✉️ Send Email
              </a>
              <a href={`https://wa.me/91${enquiry.phone.replace(/\s/g, '')}`} target="_blank" rel="noreferrer"
                className="block text-center border border-green-200 bg-green-50 text-green-700 px-5 py-2.5 rounded-full text-sm font-medium hover:bg-green-100 transition-colors">
                💬 WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
