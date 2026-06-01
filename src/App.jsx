import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';

// Public pages
import HomePage from './pages/HomePage';
import CoursesPage from './pages/CoursesPage';
import CourseDetailPage from './pages/CourseDetailPage';
import GalleryPage from './pages/GalleryPage';
import ContactPage from './pages/ContactPage';
import EnquiryPage from './pages/EnquiryPage';

// Admin pages
import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminEnquiries from './pages/admin/AdminEnquiries';
import AdminEnquiryDetail from './pages/admin/AdminEnquiryDetail';
import AdminGallery from './pages/admin/AdminGallery';

// Layout
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/admin/login" replace />;
};

const PublicLayout = ({ children }) => (
  <>
    <Navbar />
    <main>{children}</main>
    <Footer />
  </>
);

function AppRoutes() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<PublicLayout><HomePage /></PublicLayout>} />
      <Route path="/courses" element={<PublicLayout><CoursesPage /></PublicLayout>} />
      <Route path="/courses/:id" element={<PublicLayout><CourseDetailPage /></PublicLayout>} />
      <Route path="/gallery" element={<PublicLayout><GalleryPage /></PublicLayout>} />
      <Route path="/contact" element={<PublicLayout><ContactPage /></PublicLayout>} />
      <Route path="/enquiry" element={<PublicLayout><EnquiryPage /></PublicLayout>} />

      {/* Admin */}
      <Route path="/admin/login" element={<AdminLoginPage />} />
      <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
      <Route path="/admin/enquiries" element={<ProtectedRoute><AdminEnquiries /></ProtectedRoute>} />
      <Route path="/admin/enquiries/:id" element={<ProtectedRoute><AdminEnquiryDetail /></ProtectedRoute>} />
      <Route path="/admin/gallery" element={<ProtectedRoute><AdminGallery /></ProtectedRoute>} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
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
