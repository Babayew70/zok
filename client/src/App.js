import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { ColorProvider } from './context/ColorContext';
import { WishlistProvider } from './context/WishlistContext';
import ScrollToTop from './components/ScrollToTop';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingMessenger from './components/FloatingMessenger';
import BottomNav from './components/BottomNav';
import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Catalog from './pages/Catalog';
import Contacts from './pages/Contacts';
import Instructions from './pages/Instructions';
import Calculator from './pages/Calculator';
import Wishlist from './pages/Wishlist';
import Portfolio from './pages/Portfolio';
import Reviews from './pages/Reviews';
import AdminLogin from './pages/AdminLogin';
import './App.css';

// Ленивая загрузка админки (большой файл 100KB+)
const AdminPanel = lazy(() => import('./pages/AdminPanel'));

const LoadingFallback = () => (
  <div style={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    height: '100vh',
    background: '#f5f5f5'
  }}>
    <div style={{ textAlign: 'center' }}>
      <div style={{ 
        width: '40px', 
        height: '40px', 
        border: '4px solid #ccc180', 
        borderTop: '4px solid #4d4125',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
        margin: '0 auto 20px'
      }} />
      <p style={{ color: '#4d4125' }}>Загрузка...</p>
      <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
    </div>
  </div>
);

function AppContent() {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin');

  return (
    <div className="App">
      {!isAdminPage && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/instructions" element={<Instructions />} />
        <Route path="/calculator" element={<Calculator />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<Suspense fallback={<LoadingFallback />}><AdminPanel /></Suspense>} />
      </Routes>
      {!isAdminPage && <Footer />}
      {!isAdminPage && <FloatingMessenger />}
      <BottomNav />
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <ColorProvider>
          <WishlistProvider>
            <Router future={{ v7_relativeSplatPath: true }}>
              <ScrollToTop />
              <AppContent />
            </Router>
          </WishlistProvider>
        </ColorProvider>
      </ThemeProvider>
    </LanguageProvider>
  );
}

export default App;
