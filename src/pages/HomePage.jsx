import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import {
  ChevronRight,
  Star,
  Users,
  BookOpen,
  Trophy,
  Phone,
  ArrowRight,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

const STATS = [
  { value: "500+", label: "Students Enrolled", icon: Users },
  { value: "15+", label: "Expert Teachers", icon: BookOpen },
  { value: "95%", label: "Success Rate", icon: Trophy },
  { value: "10+", label: "Years Experience", icon: Star },
];

const COURSES = [
  {
    title: "Academic Tuition",
    sub: "6th – 12th Std",
    desc: "CBSE, ICSE & Matric boards",
    id: "tuition",
    imageUrl:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Abacus",
    sub: "Mental Arithmetic",
    desc: "Speed maths for kids",
    id: "abacus",
    imageUrl:
      "https://copilot.microsoft.com/th/id/BCO.b713a16f-386f-4ff1-b9a6-6b433974154b.png",
  },
  {
    title: "Robotics",
    sub: "STEM Education",
    desc: "Hands-on tech learning",
    id: "robotics",
    imageUrl:
      "https://copilot.microsoft.com/th/id/BCO.576d7bcb-2c34-483d-a4ed-aa6a2d6270dd.png",
  },
  {
    title: "Spoken English",
    sub: "Communication Skills",
    desc: "Fluency & confidence",
    id: "spoken-english",
    imageUrl:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Hindi",
    sub: "Govt Exam Prep",
    desc: "Government exam coaching",
    id: "hindi",
    imageUrl:
      "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=1200&q=80",
  },
];

const FEATURES = [
  "Experienced & dedicated teachers",
  "Expert faculty with proven results",
  "Personalized attention per student",
  "Regular doubt-clearing sessions",
  "Weekly tests & progress reports",
  "Boards & competitive exam prep",
];

export default function HomePage() {
  const observerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
        }),
      { threshold: 0.1 },
    );
    document
      .querySelectorAll(".animate-on-scroll")
      .forEach((el) => observer.observe(el));
    observerRef.current = observer;
    return () => observer.disconnect();
  }, []);

  return (
    <div className="pt-[88px]">
      {/* Hero */}
      <section className="page-hero page-hero--home1 lg:page-hero--home min-h-[600px] flex items-center">
        {/* BG pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-gold-400 blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-royal-400 blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 py-20 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              {/* Admission badge */}
              <div className="inline-flex items-center gap-2 bg-gold-500/20 border border-gold-500/40 rounded-full px-4 py-1.5 mb-6">
                <Sparkles size={14} className="text-gold-400 animate-pulse" />
                <span className="text-gold-300 text-sm font-semibold">
                  🎉 Admissions Open 2026-27
                </span>
              </div>

              <h1 className="font-display text-4xl md:text-5xl xl:text-6xl font-bold leading-tight mb-6">
                Royal <span className="text-gold-400">Coaching</span>
                <br />
                Centre
              </h1>
              <p className="text-royal-200 text-lg mb-3 font-semibold">
                6<sup>th</sup> to 12<sup>th</sup> Standard Tuition
              </p>
              <p className="text-gray-300 text-base leading-relaxed mb-8 max-w-md">
                Empowering students with quality education, expert guidance, and
                personalized attention to achieve academic excellence.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  to="/enquiry"
                  className="btn-gold flex items-center gap-2"
                >
                  Enquire Now <ArrowRight size={16} />
                </Link>
                <Link
                  to="/courses"
                  className="btn-outline border-white text-white hover:bg-white hover:text-royal-900 flex items-center gap-2"
                >
                  Explore Courses <ChevronRight size={16} />
                </Link>
              </div>

              <div className="flex items-center gap-3 mt-8 text-sm text-gray-300">
                <Phone size={14} className="text-gold-400" />
                <span>Call us: </span>
                <a
                  href="tel:9486091662"
                  className="text-gold-400 font-bold hover:text-gold-300 transition-colors text-base"
                >
                  94860 91662
                </a>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 justify-center">
              {[
                "CBSE",
                "ICSE",
                "Matric",
                "Abacus",
                "Robotics",
                "Spoken English",
                "Hindi",
                "Grades 6–12",
              ].map((tag, i) => (
                <div
                  key={tag}
                  className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-5 py-3 text-center hover:bg-white/20 transition-all duration-300 hover:-translate-y-1"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <p className="font-semibold text-sm">{tag}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white py-12 shadow-inner">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {STATS.map(({ value, label, icon: Icon }) => (
              <div key={label} className="text-center animate-on-scroll">
                <div className="w-12 h-12 gradient-royal rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                  <Icon size={20} className="text-white" />
                </div>
                <p className="font-display text-3xl font-bold text-royal-900">
                  {value}
                </p>
                <p className="text-gray-500 text-sm mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Courses */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12 animate-on-scroll">
            <p className="text-gold-600 font-semibold text-sm uppercase tracking-wider mb-2">
              What We Offer
            </p>
            <h2 className="section-title mb-4">Our Courses & Programs</h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Comprehensive academic coaching and skill development programs
              designed for every student's growth.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
            {COURSES.map((c, i) => (
              <Link
                key={c.id}
                to={`/courses/${c.id}`}
                className="card text-center group animate-on-scroll relative overflow-hidden"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="absolute inset-0">
                  <img
                    src={c.imageUrl}
                    alt={c.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  {/* <div className="absolute inset-0 bg-gradient-to-b from-royal-950/20 via-royal-950/55 to-royal-950/85" /> */}
                  {/* <div className="absolute inset-0 bg-gradient-to-br from-gold-500/10 via-transparent to-royal-700/10" /> */}
                </div>

                <div className="relative z-10 p-6 min-h-[220px] flex flex-col">
                  <div className="flex-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-5 py-3 text-center hover:bg-white/20 transition-all duration-300 hover:-translate-y-1 p-4 flex flex-col justify-end opacity-90 group-hover:opacity-100 mt-5">
                    <h3 className="font-display mt-10 font-bold text-white text-2xl mb-1 drop-shadow">
                      {c.title}
                    </h3>
                    <p className="text-white/90 text-xs font-semibold mb-2 drop-shadow">
                      {c.sub}
                    </p>
                    <p className="text-white/85 text-xs leading-relaxed drop-shadow">
                      {c.desc}
                    </p>
                  </div>
                  <div className="mt-4 text-white text-xs font-semibold flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    Learn more <ChevronRight size={12} />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link to="/courses" className="btn-outline">
              View All Courses
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="animate-on-scroll">
              <p className="text-gold-600 font-semibold text-sm uppercase tracking-wider mb-2">
                Why Choose Us
              </p>
              <h2 className="section-title mb-6">
                Excellence in Every
                <br />
                Aspect of Education
              </h2>
              <p className="text-gray-500 mb-8 leading-relaxed">
                At Royal Coaching Centre, we believe every student has the
                potential to excel. Our unique approach combines expert
                teaching, personalized attention, and rigorous preparation.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {FEATURES.map((f) => (
                  <div key={f} className="flex items-start gap-3">
                    <CheckCircle2
                      size={18}
                      className="text-royal-800 flex-shrink-0 mt-0.5"
                    />
                    <p className="text-gray-700 text-sm font-medium">{f}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="animate-on-scroll grid grid-cols-2 gap-4">
              {[
                {
                  label: "CBSE",
                  desc: "Central Board",
                  color: "bg-royal-50 border-royal-200",
                },
                {
                  label: "ICSE",
                  desc: "Indian Certificate",
                  color: "bg-gold-50 border-yellow-200",
                },
                {
                  label: "Matric",
                  desc: "Tamil Nadu Board",
                  color: "bg-green-50 border-green-200",
                },
                {
                  label: "Competitive",
                  desc: "Entrance Exams",
                  color: "bg-purple-50 border-purple-200",
                },
              ].map(({ label, desc, color }) => (
                <div
                  key={label}
                  className={`${color} border-2 rounded-2xl p-5 text-center hover:scale-105 transition-transform`}
                >
                  <p className="font-display font-bold text-xl text-royal-900">
                    {label}
                  </p>
                  <p className="text-gray-600 text-xs mt-1">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-white text-center relative overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src="https://assets.thehansindia.com/h-upload/2023/03/29/1344176-exams.jpg"
            alt=""
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-royal-950/90 via-royal-900/75 to-royal-800/65" />
          <div className="absolute inset-0 bg-gradient-to-t from-royal-950/70 via-transparent to-transparent" />
        </div>

        {/* Accent glow */}
        <div className="absolute inset-0 opacity-15">
          <div className="absolute top-0 left-1/4 w-64 h-64 rounded-full bg-gold-400 blur-3xl" />
        </div>
        <div className="max-w-3xl mx-auto px-4 relative z-10">
          <div className="inline-flex items-center gap-2 bg-gold-500/20 border border-gold-400/40 rounded-full px-4 py-1.5 mb-6">
            <Sparkles size={14} className="text-gold-400" />
            <span className="text-gold-300 text-sm font-semibold">
              Limited Seats Available
            </span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-royal-200 mb-8">
            Join hundreds of successful students. Enrol now and get a free demo
            class.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/enquiry" className="btn-gold">
              Enquire Now
            </Link>
            <a
              href="tel:9486091662"
              className="btn-outline border-white text-white hover:bg-white hover:text-royal-900 flex items-center gap-2"
            >
              <Phone size={16} /> Call Us Now
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
