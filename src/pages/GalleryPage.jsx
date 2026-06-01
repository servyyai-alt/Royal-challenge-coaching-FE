import { useEffect, useMemo, useState } from 'react';
import { Image } from 'lucide-react';

import api from '../utils/api';

const CATEGORIES = [
  { key: 'All', label: 'All' },
  { key: 'Courses', label: 'Courses' },
  { key: 'Programs', label: 'Programs' },
  { key: 'Achievements', label: 'Achievements' },
  { key: 'Competitions', label: 'Competitions' },
  { key: 'Classrooms', label: 'Classrooms' },
  { key: 'Activities', label: 'Activities' },
  { key: 'Faculty', label: 'Faculty' },
];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0].key);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    api.get('/gallery')
      .then((res) => { if (mounted) setItems(res.data.data || []); })
      .catch(() => { if (mounted) setItems([]); })
      .finally(() => { if (mounted) setLoading(false); });
    return () => { mounted = false; };
  }, []);

  const filtered = useMemo(
    () => (activeCategory === 'All' ? items : items.filter(i => i.category === activeCategory)),
    [items, activeCategory]
  );

  return (
    <div className="pt-[88px]">
      <section className="page-hero page-hero--gallery py-16 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h1 className="font-display text-4xl font-bold mb-3">Gallery</h1>
          <p className="text-royal-200">Explore courses, programs, achievements, classrooms, activities and faculty.</p>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          {/* Category filter */}
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            {CATEGORIES.map(({ key, label }) => (
              <button key={key} onClick={() => setActiveCategory(key)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                  activeCategory === key ? 'bg-royal-800 text-white shadow-lg' : 'bg-white text-gray-600 border border-gray-200 hover:border-royal-300'
                }`}>
                {label}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin w-8 h-8 border-4 border-royal-800 border-t-transparent rounded-full"></div>
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <Image size={48} className="text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No photos in this category yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((item) => (
                <div key={item._id} className="card overflow-hidden cursor-pointer group" onClick={() => setSelected(item)}>
                  <div className="relative overflow-hidden h-52">
                    <img src={item.imageUrl} alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-royal-950/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="absolute bottom-4 left-4 text-white">
                        <p className="font-semibold text-sm">{item.title}</p>
                      </div>
                    </div>
                    <span className="absolute top-3 right-3 bg-white/90 text-royal-800 text-xs font-semibold px-2 py-1 rounded-full">
                      {item.category}
                    </span>
                  </div>
                  <div className="p-4">
                    <h3 className="font-display font-bold text-gray-800">{item.title}</h3>
                    {item.description && <p className="text-gray-500 text-sm mt-1">{item.description}</p>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {selected && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <div className="max-w-3xl w-full" onClick={e => e.stopPropagation()}>
            <img src={selected.imageUrl} alt={selected.title} className="w-full rounded-2xl shadow-2xl" />
            <div className="text-center mt-4">
              <h3 className="text-white font-display font-bold text-xl">{selected.title}</h3>
              {selected.description && <p className="text-gray-400 text-sm mt-1">{selected.description}</p>}
            </div>
            <button onClick={() => setSelected(null)} className="absolute top-4 right-4 text-white bg-white/20 rounded-full w-10 h-10 flex items-center justify-center hover:bg-white/40 transition-colors text-xl">✕</button>
          </div>
        </div>
      )}
    </div>
  );
}
