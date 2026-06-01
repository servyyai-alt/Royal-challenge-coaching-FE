import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ArrowRight } from 'lucide-react';
import api from '../utils/api';

export default function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/courses').then(res => { setCourses(res.data.data); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  const gradients = [
    'from-royal-800 to-royal-600',
    'from-amber-600 to-yellow-500',
    'from-teal-600 to-cyan-500',
    'from-purple-700 to-purple-500',
    'from-rose-700 to-pink-500',
  ];

  if (loading) return (
    <div className="pt-[88px] min-h-screen flex items-center justify-center">
      <div className="animate-spin w-10 h-10 border-4 border-royal-800 border-t-transparent rounded-full"></div>
    </div>
  );

  return (
    <div className="pt-[88px]">
      {/* Header */}
      <section className="page-hero page-hero--courses py-16 text-center">
        <div className="max-w-3xl mx-auto px-4 h-[200px] sm:h-[150px]">
          <p className="text-gold-300 text-sm font-semibold uppercase tracking-wider mb-2">Academics & Skills</p>
          <h1 className="font-display text-4xl font-bold mb-4">Our Courses & Programs</h1>
          <p className="text-royal-200">
            From academic tuition to skill development — everything your child needs to excel.
          </p>
        </div>
      </section>

      {/* Boards highlight */}
      <section className="bg-white border-b border-gray-100 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap gap-3 justify-center">
            {['CBSE', 'ICSE', 'Matric', 'Classes 6–12', 'Competitive Exams', 'Skill Development'].map((b) => (
              <span key={b} className="bg-royal-50 border border-royal-200 text-royal-800 px-4 py-1.5 rounded-full text-sm font-semibold">
                {b}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Courses grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course, i) => (
              <div key={course.id} className="card overflow-hidden group">
                <div className="relative h-44">
                  <img
                    src={course.imageUrl}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-br ${gradients[i % gradients.length]} opacity-70`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-royal-950/70 via-royal-950/10 to-transparent" />
                  <div className="absolute inset-0 p-6 text-white flex flex-col justify-end">
                    <h2 className="font-display text-xl font-bold">{course.title}</h2>
                    <p className="text-white/85 text-sm mt-1">{course.subtitle}</p>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">{course.description}</p>

                  {course.boards && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {course.boards.map(b => (
                        <span key={b} className="bg-royal-50 text-royal-700 text-xs font-semibold px-2.5 py-1 rounded-full border border-royal-100">{b}</span>
                      ))}
                    </div>
                  )}

                  <div className="space-y-1.5 mb-5">
                    {course.features.slice(0, 4).map((f, fi) => (
                      <div key={fi} className="flex items-center gap-2 text-xs text-gray-600">
                        <div className="w-1.5 h-1.5 rounded-full bg-gold-500 flex-shrink-0"></div>
                        {f}
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">📅 {course.timing}</span>
                    <Link to={`/courses/${course.id}`}
                      className="text-royal-800 text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all">
                      Details <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="section-title mb-4">Ready to Enroll?</h2>
          <p className="text-gray-500 mb-6">Fill out our enquiry form and our team will get back to you within 24 hours.</p>
          <Link to="/enquiry" className="btn-primary">Submit Enquiry</Link>
        </div>
      </section>
    </div>
  );
}
