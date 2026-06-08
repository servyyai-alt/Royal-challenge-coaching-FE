import { Link } from 'react-router-dom';
import { ChevronRight, ArrowRight } from 'lucide-react';
import { COURSES } from '../data/siteContent';

export default function CoursesPage() {
  const timetable = [
    {
      time: '7:00 – 8:00 AM',
      academic: 'Academic Tuition - Morning Batch',
      abacus: 'Abacus - Weekend Prep / Practice',
      robotics: 'Robotics - Weekday Lab Prep',
      spokenEnglish: 'Spoken English - Individual Session',
      hindi: 'Hindi - Revision / Support',
    },
    {
      time: '8:00 – 9:00 AM',
      academic: 'Academic Tuition - CBSE / ICSE / Matric',
      abacus: 'Abacus - Weekend Batch',
      robotics: 'Robotics - Coding Practice',
      spokenEnglish: 'Spoken English - Group Session',
      hindi: 'Hindi - Exam Coaching',
    },
    {
      time: '9:00 – 10:00 AM',
      academic: 'Academic Tuition - Doubt Clearing',
      abacus: 'Abacus - Memory & Speed Drills',
      robotics: 'Robotics - Electronics Basics',
      spokenEnglish: 'Spoken English - Fluency Practice',
      hindi: 'Hindi - Afternoon Batch Prep',
    },
    {
      time: '10:00 – 11:00 AM',
      academic: 'Academic Tuition - Weekly Tests',
      abacus: 'Abacus - Weekend Session',
      robotics: 'Robotics - Project Work',
      spokenEnglish: 'Spoken English - Confidence Building',
      hindi: 'Hindi - Government Exam Prep',
    },
    {
      time: '11:00 – 12:00 PM',
      academic: 'Academic Tuition - Evening Batch Prep',
      abacus: 'Abacus - Fast Calculation Practice',
      robotics: 'Robotics - Weekend Batch',
      spokenEnglish: 'Spoken English - Grammar & Speaking',
      hindi: 'Hindi - Afternoon Batch',
    },
    {
      time: '12:00 – 1:00 PM',
      academic: 'Academic Tuition - Evening Batch',
      abacus: 'Abacus - Weekend Revision',
      robotics: 'Robotics - Coding & Robotics Concepts',
      spokenEnglish: 'Spoken English - Personal Coaching',
      hindi: 'Hindi - Recap & Doubt Clearing',
    },
    {
      time: '4:00 – 5:00 PM',
      academic: 'Academic Tuition - Evening Batch',
      abacus: 'Abacus - Weekend Batch',
      robotics: 'Robotics - Weekday Batch',
      spokenEnglish: 'Spoken English - Group Session',
      hindi: 'Hindi - Afternoon Batch',
    },
    {
      time: '5:00 – 6:00 PM',
      academic: 'Academic Tuition - Doubt Clearing',
      abacus: 'Abacus - Concentration Training',
      robotics: 'Robotics - Project-Based Learning',
      spokenEnglish: 'Spoken English - Individual Session',
      hindi: 'Hindi - Exam Readiness',
    },
    {
      time: '6:00 – 7:00 PM',
      academic: 'Academic Tuition - Weekly Tests',
      abacus: 'Abacus - Weekend Batch',
      robotics: 'Robotics - Weekend Batch',
      spokenEnglish: 'Spoken English - Fluency Practice',
      hindi: 'Hindi - Afternoon Batch',
    },
  ];

  const gradients = [];

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
            {COURSES.map((course, i) => (
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

      {/* Timetable */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <p className="text-gold-600 font-semibold text-sm uppercase tracking-wider mb-2">Weekly Schedule</p>
            <h2 className="section-title mb-3">Course Timetable</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              A quick view of suggested time slots for each program, including tests, doubt-clearing, weekend batches, and specialized coaching.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-sm bg-white">
            <table className="min-w-[980px] w-full border-collapse">
              <thead>
                <tr className="bg-royal-950 text-white">
                  <th className="p-4 text-left text-sm font-semibold">Time Slot</th>
                  <th className="p-4 text-left text-sm font-semibold">Academic Tuition</th>
                  <th className="p-4 text-left text-sm font-semibold">Abacus</th>
                  <th className="p-4 text-left text-sm font-semibold">Robotics</th>
                  <th className="p-4 text-left text-sm font-semibold">Spoken English</th>
                  <th className="p-4 text-left text-sm font-semibold">Hindi</th>
                </tr>
              </thead>
              <tbody>
                {timetable.map((row, idx) => (
                  <tr key={row.time} className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="p-4 align-top font-semibold text-royal-900 text-sm whitespace-nowrap border-t border-gray-100">{row.time}</td>
                    <td className="p-4 align-top text-sm text-gray-700 border-t border-gray-100">{row.academic}</td>
                    <td className="p-4 align-top text-sm text-gray-700 border-t border-gray-100">{row.abacus}</td>
                    <td className="p-4 align-top text-sm text-gray-700 border-t border-gray-100">{row.robotics}</td>
                    <td className="p-4 align-top text-sm text-gray-700 border-t border-gray-100">{row.spokenEnglish}</td>
                    <td className="p-4 align-top text-sm text-gray-700 border-t border-gray-100">{row.hindi}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="section-title mb-4">Ready to Enroll?</h2>
          <p className="text-gray-500 mb-6">Fill out our student registration form and our team will get back to you within 24 hours.</p>
          <Link to="/enquiry" className="btn-primary">Student Registration</Link>
        </div>
      </section>
    </div>
  );
}
