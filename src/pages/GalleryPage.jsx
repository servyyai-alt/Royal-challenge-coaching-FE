import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Image } from 'lucide-react';
import api from '../utils/api';

const CATEGORIES = ['All', 'Events', 'Competitions', 'Achievements', 'Classroom', 'Activities'];

// Placeholder gallery data for demo
const DEMO_ITEMS = [
  { _id: '1', title: 'Annual Day Celebration', category: 'Events', imageUrl: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&h=300&fit=crop', description: 'Students performing at Annual Day' },
  { _id: '2', title: 'Science Exhibition', category: 'Competitions', imageUrl: 'https://images.unsplash.com/photo-1567168544813-cc03465b4fa8?w=400&h=300&fit=crop', description: 'Science projects showcase' },
  { _id: '3', title: 'Academic Excellence Award', category: 'Achievements', imageUrl: 'https://images.unsplash.com/photo-1567168544813-cc03465b4fa8?w=400&h=300&fit=crop', description: 'Top performers recognized' },
  { _id: '4', title: 'Classroom Learning', category: 'Classroom', imageUrl: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400&h=300&fit=crop', description: 'Interactive classroom sessions' },
  { _id: '5', title: 'Robotics Workshop', category: 'Activities', imageUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=300&fit=crop', description: 'Students building robots' },
  { _id: '6', title: 'Sports Day', category: 'Events', imageUrl: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=400&h=300&fit=crop', description: 'Annual sports day activities' },
  { _id: '7', title: 'Math Olympiad Winners', category: 'Achievements', imageUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400&h=300&fit=crop', description: 'State-level math winners' },
  { _id: '8', title: 'Abacus Competition', category: 'Competitions', imageUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=300&fit=crop', description: 'Inter-school abacus contest' },
  { _id: '9', title: 'Drawing Competition', category: 'Activities', imageUrl: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&h=300&fit=crop', description: 'Creative arts competition' },
];

export default function GalleryPage() {
  const [items, setItems] = useState(DEMO_ITEMS);
  const [activeCategory, setActiveCategory] = useState('All');
  const [selected, setSelected] = useState(null);

  const filtered = activeCategory === 'All' ? items : items.filter(i => i.category === activeCategory);

  return (
    <div className="pt-[88px]">
      <section className="page-hero page-hero--gallery py-16 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h1 className="font-display text-4xl font-bold mb-3">Gallery</h1>
          <p className="text-royal-200">Memories, achievements, and moments from Royal Coaching Centre.</p>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          {/* Category filter */}
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            {CATEGORIES.map(cat => (
              <button key={cat} onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                  activeCategory === cat ? 'bg-royal-800 text-white shadow-lg' : 'bg-white text-gray-600 border border-gray-200 hover:border-royal-300'
                }`}>
                {cat}
              </button>
            ))}
          </div>

          {filtered.length === 0 ? (
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
