import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle2, Clock, GraduationCap, ArrowLeft } from 'lucide-react';
import api from '../utils/api';

export default function CourseDetailPage() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/courses/${id}`).then(res => { setCourse(res.data.data); setLoading(false); }).catch(() => setLoading(false));
  }, [id]);

  if (loading) return (
    <div className="pt-[88px] min-h-screen flex items-center justify-center">
      <div className="animate-spin w-10 h-10 border-4 border-royal-800 border-t-transparent rounded-full"></div>
    </div>
  );

  if (!course) return (
    <div className="pt-[88px] min-h-screen flex items-center justify-center text-center">
      <div>
        <p className="text-5xl mb-4">😕</p>
        <h2 className="font-display text-2xl font-bold mb-2">Course Not Found</h2>
        <Link to="/courses" className="btn-primary mt-4 inline-block">Back to Courses</Link>
      </div>
    </div>
  );

  return (
    <div className="pt-[88px]">
      <section className="page-hero page-hero--courses py-16">
        <div className="max-w-5xl mx-auto px-4">
          <Link to="/courses" className="flex items-center gap-1.5 text-royal-200 hover:text-white mb-6 text-sm transition-colors">
            <ArrowLeft size={16} /> Back to Courses
          </Link>
          <div className="flex items-start gap-6">
            <div className="text-5xl">{course.icon}</div>
            <div>
              <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">{course.title}</h1>
              <p className="text-gold-300 font-semibold">{course.subtitle}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div className="card p-6">
                <h2 className="font-display text-xl font-bold text-royal-900 mb-3">About This Course</h2>
                <p className="text-gray-600 leading-relaxed">{course.description}</p>

                {course.boards && (
                  <div className="mt-4">
                    <p className="text-sm font-semibold text-gray-700 mb-2">Boards Covered:</p>
                    <div className="flex gap-2">
                      {course.boards.map(b => (
                        <span key={b} className="bg-royal-50 text-royal-800 text-sm font-semibold px-3 py-1 rounded-full border border-royal-200">{b}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {course.subjects && (
                <div className="card p-6">
                  <h2 className="font-display text-xl font-bold text-royal-900 mb-4">Subjects Offered</h2>
                  <div className="flex flex-wrap gap-2">
                    {course.subjects.map(s => (
                      <span key={s} className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded-lg text-sm font-medium">{s}</span>
                    ))}
                  </div>
                </div>
              )}

              <div className="card p-6">
                <h2 className="font-display text-xl font-bold text-royal-900 mb-4">Key Features</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {course.features.map((f, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle2 size={18} className="text-royal-800 flex-shrink-0 mt-0.5" />
                      <p className="text-gray-700 text-sm">{f}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="card p-6 sticky top-24">
                <h3 className="font-display text-lg font-bold text-royal-900 mb-4">Course Info</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <GraduationCap size={18} className="text-gold-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-500">Grades</p>
                      <p className="font-semibold text-sm text-gray-800">{course.grades}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock size={18} className="text-gold-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-500">Timing</p>
                      <p className="font-semibold text-sm text-gray-800">{course.timing}</p>
                    </div>
                  </div>
                </div>
                <div className="mt-6 space-y-3">
                  <Link to="/enquiry" className="btn-primary block text-center text-sm py-3">Enquire Now</Link>
                  <a href="tel:9486091662" className="btn-outline block text-center text-sm py-3">Call: 94860 91662</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
