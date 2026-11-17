import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import TopBanner from './components/layout/TopBanner';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import FloatingWhatsApp from './components/layout/FloatingWhatsApp';
import AtmosphericParticles3D from './components/3d/AtmosphericParticles3D';
import InteractiveCursor3D from './components/3d/InteractiveCursor3D';
import { SecurityGuard } from './security';

// Pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import MenuPage from './pages/MenuPage';
import GalleryPage from './pages/GalleryPage';
import ReservationsPage from './pages/ReservationsPage';
import ContactPage from './pages/ContactPage';

// Safe ScrollToTop
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    try {
      window.scrollTo(0, 0);
    } catch (e) {
      // Safe fallback
    }
  }, [pathname]);

  return null;
}

// Error Boundary to prevent any blank screen
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("The Prison ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ minHeight: '100vh', background: '#07090b', color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px', textAlign: 'center' }}>
          <div style={{ fontSize: '32px', marginBottom: '16px' }}>⛓️🔒</div>
          <h1 style={{ fontFamily: 'sans-serif', fontSize: '24px', textTransform: 'uppercase', color: '#f59e0b', letterSpacing: '0.1em' }}>
            The Prison • Temporary Interruption
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '14px', marginTop: '8px', maxWidth: '400px' }}>
            We encountered a minor hitch while rendering. Please reload to resume your dining escape.
          </p>
          <pre style={{ background: '#11161b', color: '#e11d48', padding: '12px', borderRadius: '4px', fontSize: '11px', marginTop: '16px', maxWidth: '500px', overflow: 'auto' }}>
            {this.state.error?.toString()}
          </pre>
          <button
            onClick={() => window.location.reload()}
            style={{ marginTop: '20px', padding: '10px 24px', background: '#f59e0b', color: '#07090b', fontWeight: 'bold', textTransform: 'uppercase', border: 'none', borderRadius: '2px', cursor: 'pointer' }}
          >
            Reload Website
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  return (
    <ErrorBoundary>
      <Router>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen bg-prison-950 text-slate-100 selection:bg-prison-gold selection:text-prison-950 relative">
          {/* Dialed Coffee Inspired Ambient 3D Particles Layer */}
          <AtmosphericParticles3D />

          {/* Interactive Magnetic 3D Cursor */}
          <InteractiveCursor3D />

          {/* Dedicated Frontend Security Layer (NerdTech Labs) */}
          <SecurityGuard />

          <TopBanner />
          <Navbar />
          
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/menu" element={<MenuPage />} />
              <Route path="/gallery" element={<GalleryPage />} />
              <Route path="/reservations" element={<ReservationsPage />} />
              <Route path="/contact" element={<ContactPage />} />
              {/* Catch-all fallback */}
              <Route path="*" element={<HomePage />} />
            </Routes>
          </main>

          <Footer />
          <FloatingWhatsApp />
        </div>
      </Router>
    </ErrorBoundary>
  );
}
