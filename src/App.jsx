import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import ReactGA from "react-ga4";

// Public pages
import HomePage from './pages/HomePage';
import CoursesPage from './pages/CoursesPage';
import CourseDetailPage from './pages/CourseDetailPage';
import GalleryPage from './pages/GalleryPage';
import ContactPage from './pages/ContactPage';
import EnquiryPage from './pages/EnquiryPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsPage from './pages/TermsPage';
import RefundPolicyPage from './pages/RefundPolicyPage';
import DisclaimerPage from './pages/DisclaimerPage';
import TutorRegistrationPage from './pages/TutorRegistrationPage';

// Admin pages
import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminEnquiries from './pages/admin/AdminEnquiries';
import AdminEnquiryDetail from './pages/admin/AdminEnquiryDetail';
import AdminGallery from './pages/admin/AdminGallery';
import AdminTutorRegistrations from './pages/admin/AdminTutorRegistrations';
import AdminTutorRegistrationDetail from './pages/admin/AdminTutorRegistrationDetail';

// Layout
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import ScrollToTop from './components/common/ScrollToTop';
import SEO from './components/common/SEO';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/admin/login" replace />;
};

ReactGA.initialize("G-GZHXSX7MYJ");

const AnalyticsTracker = () => {
  const location = useLocation();

  useEffect(() => {
    ReactGA.send({
      hitType: 'pageview',
      page: `${location.pathname}${location.search}${location.hash}`,
      title: document.title,
    });
  }, [location]);

  return null;
};

const PublicLayout = ({ children }) => (
  <>
    <Navbar />
    <main>{children}</main>
    <Footer />
  </>
);

const Page = ({ seo, children }) => (
  <>
    <SEO {...seo} />
    {children}
  </>
);

const homeJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  name: 'Royal Coaching Centre',
  url: typeof window !== 'undefined' ? window.location.origin : 'https://www.royalcoachingcentre.com',
  logo: typeof window !== 'undefined' ? `${window.location.origin}/logo.png` : 'https://www.royalcoachingcentre.com/logo.png',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Vellore',
    addressRegion: 'Tamil Nadu',
    addressCountry: 'IN',
  },
  telephone: '+91 94860 91662',
};

function AppRoutes() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<PublicLayout><Page seo={{ title: 'Best Tuition in Vellore', path: '/', jsonLd: homeJsonLd }}><HomePage /></Page></PublicLayout>} />
      <Route path="/courses" element={<PublicLayout><Page seo={{ title: 'Courses and Programs', path: '/courses' }}><CoursesPage /></Page></PublicLayout>} />
      <Route path="/courses/:id" element={<PublicLayout><Page seo={{ title: 'Course Details', path: '/courses' }}><CourseDetailPage /></Page></PublicLayout>} />
      <Route path="/gallery" element={<PublicLayout><Page seo={{ title: 'Gallery', path: '/gallery' }}><GalleryPage /></Page></PublicLayout>} />
      <Route path="/contact" element={<PublicLayout><Page seo={{ title: 'Contact Royal Coaching Centre', path: '/contact' }}><ContactPage /></Page></PublicLayout>} />
      <Route path="/enquiry" element={<PublicLayout><Page seo={{ title: 'Student Registration', path: '/enquiry' }}><EnquiryPage /></Page></PublicLayout>} />
      <Route path="/tutor-registration" element={<PublicLayout><Page seo={{ title: 'Teacher Registration', path: '/tutor-registration' }}><TutorRegistrationPage /></Page></PublicLayout>} />
      <Route path="/privacy-policy" element={<PublicLayout><Page seo={{ title: 'Privacy Policy', path: '/privacy-policy', noindex: true }}><PrivacyPolicyPage /></Page></PublicLayout>} />
      <Route path="/terms" element={<PublicLayout><Page seo={{ title: 'Terms and Conditions', path: '/terms', noindex: true }}><TermsPage /></Page></PublicLayout>} />
      <Route path="/refund-policy" element={<PublicLayout><Page seo={{ title: 'Refund Policy', path: '/refund-policy', noindex: true }}><RefundPolicyPage /></Page></PublicLayout>} />
      <Route path="/disclaimer" element={<PublicLayout><Page seo={{ title: 'Disclaimer', path: '/disclaimer', noindex: true }}><DisclaimerPage /></Page></PublicLayout>} />

      {/* Admin */}
      <Route path="/admin/login" element={<AdminLoginPage />} />
      <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
      <Route path="/admin/enquiries" element={<ProtectedRoute><AdminEnquiries /></ProtectedRoute>} />
      <Route path="/admin/enquiries/:id" element={<ProtectedRoute><AdminEnquiryDetail /></ProtectedRoute>} />
      <Route path="/admin/tutor-registrations" element={<ProtectedRoute><AdminTutorRegistrations /></ProtectedRoute>} />
      <Route path="/admin/tutor-registrations/:id" element={<ProtectedRoute><AdminTutorRegistrationDetail /></ProtectedRoute>} />
      <Route path="/admin/gallery" element={<ProtectedRoute><AdminGallery /></ProtectedRoute>} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AnalyticsTracker />
        <ScrollToTop />
        <AppRoutes />
        <Toaster
          position="top-right"
          toastOptions={{
            style: { fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '14px' },
            success: { iconTheme: { primary: '#2828a0', secondary: '#fff' } }
          }}
        />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
