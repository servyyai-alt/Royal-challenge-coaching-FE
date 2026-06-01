import { useState, useEffect } from 'react';
import { Plus, Trash2, Edit2, X, Check, Image } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import api from '../../utils/api';
import toast from 'react-hot-toast';

const CATEGORIES = ['Events', 'Competitions', 'Achievements', 'Classroom', 'Activities'];

const EMPTY = { title: '', description: '', imageUrl: '', category: 'Events', featured: false };

export default function AdminGallery() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(EMPTY);
  const [editId, setEditId] = useState(null);
  const [saving, setSaving] = useState(false);

  const fetchItems = async () => {
    try {
      const res = await api.get('/gallery');
      setItems(res.data.data);
    } catch { toast.error('Failed to load gallery.'); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchItems(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.imageUrl) { toast.error('Title and image URL required.'); return; }
    setSaving(true);
    try {
      if (editId) {
        await api.put(`/gallery/${editId}`, form);
        toast.success('Updated.');
      } else {
        await api.post('/gallery', form);
        toast.success('Added to gallery.');
      }
      setForm(EMPTY);
      setEditId(null);
      setShowForm(false);
      fetchItems();
    } catch { toast.error('Failed to save.'); }
    finally { setSaving(false); }
  };

  const handleEdit = (item) => {
    setForm({ title: item.title, description: item.description || '', imageUrl: item.imageUrl, category: item.category, featured: item.featured });
    setEditId(item._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this photo?')) return;
    try {
      await api.delete(`/gallery/${id}`);
      toast.success('Deleted.');
      fetchItems();
    } catch { toast.error('Failed to delete.'); }
  };

  return (
    <AdminLayout title="Gallery">
      <div className="space-y-5">
        {/* Header */}
        <div className="flex justify-between items-center">
          <p className="text-gray-500 text-sm">{items.length} photos in gallery</p>
          <button onClick={() => { setForm(EMPTY); setEditId(null); setShowForm(true); }}
            className="btn-primary flex items-center gap-2 text-sm py-2.5">
            <Plus size={16} /> Add Photo
          </button>
        </div>

        {/* Form */}
        {showForm && (
          <div className="bg-white rounded-2xl border border-royal-200 shadow-sm p-6">
            <div className="flex justify-between items-center mb-5">
              <h3 className="font-display font-bold text-royal-900">{editId ? 'Edit Photo' : 'Add New Photo'}</h3>
              <button onClick={() => setShowForm(false)} className="p-1.5 hover:bg-gray-100 rounded-lg">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="label">Title *</label>
                  <input value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))}
                    placeholder="Photo title" className="input" required />
                </div>
                <div>
                  <label className="label">Category</label>
                  <select value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))} className="input">
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="label">Image URL *</label>
                <input value={form.imageUrl} onChange={e => setForm(p => ({ ...p, imageUrl: e.target.value }))}
                  placeholder="https://example.com/image.jpg" className="input" required />
              </div>

              {form.imageUrl && (
                <div className="rounded-xl overflow-hidden h-40 bg-gray-100">
                  <img src={form.imageUrl} alt="Preview" className="w-full h-full object-cover" onError={e => e.target.style.display='none'} />
                </div>
              )}

              <div>
                <label className="label">Description</label>
                <input value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
                  placeholder="Short description (optional)" className="input" />
              </div>

              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" checked={form.featured} onChange={e => setForm(p => ({ ...p, featured: e.target.checked }))}
                  className="w-4 h-4 accent-royal-800" />
                <span className="text-sm font-medium text-gray-700">Featured (show on homepage)</span>
              </label>

              <div className="flex gap-3">
                <button type="submit" disabled={saving}
                  className="btn-primary flex items-center gap-2 text-sm py-2.5 disabled:opacity-50">
                  {saving ? <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                    : <><Check size={16} /> {editId ? 'Save Changes' : 'Add Photo'}</>}
                </button>
                <button type="button" onClick={() => setShowForm(false)} className="btn-outline text-sm py-2.5">Cancel</button>
              </div>
            </form>
          </div>
        )}

        {/* Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin w-8 h-8 border-4 border-royal-800 border-t-transparent rounded-full"></div>
          </div>
        ) : items.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm py-20 text-center">
            <Image size={48} className="text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No photos yet. Add your first one!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {items.map(item => (
              <div key={item._id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden group">
                <div className="relative h-44 bg-gray-100">
                  <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                  {item.featured && (
                    <span className="absolute top-2 left-2 bg-gold-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full">★ Featured</span>
                  )}
                  <div className="absolute top-2 right-2 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => handleEdit(item)} className="p-1.5 bg-white rounded-lg shadow hover:bg-gray-50">
                      <Edit2 size={14} className="text-royal-800" />
                    </button>
                    <button onClick={() => handleDelete(item._id)} className="p-1.5 bg-white rounded-lg shadow hover:bg-gray-50">
                      <Trash2 size={14} className="text-red-500" />
                    </button>
                  </div>
                </div>
                <div className="p-3">
                  <p className="font-semibold text-sm text-gray-800 truncate">{item.title}</p>
                  <span className="text-xs text-royal-700 bg-royal-50 px-2 py-0.5 rounded-full mt-1 inline-block">{item.category}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
