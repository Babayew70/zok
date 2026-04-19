import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';
import { useWishlist } from '../context/WishlistContext';
import { FaSun, FaMoon, FaPalette, FaBars, FaTimes, FaHandshake, FaHeart, FaCalculator } from 'react-icons/fa';
import LanguageSwitcher from './LanguageSwitcher';
import CooperationModal from './CooperationModal';
import './Navbar.css';

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation();
  const { wishlistCount } = useWishlist();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cooperationOpen, setCooperationOpen] = useState(false);

  const close = () => setMobileMenuOpen(false);

  return (
    <>
      <nav className={`navbar ${theme}`}>
        <div className="navbar-container">
          <Link to="/" className="navbar-logo" onClick={close}>
            <img src={theme === 'dark' ? '/white-logo.svg' : '/logo.svg'} alt="ZOK Logo" className="logo-img" />
          </Link>

          <button
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>

          <div className={`navbar-menu ${mobileMenuOpen ? 'open' : ''}`}>
            <div className="nav-item-dropdown">
              <Link to="/" className="navbar-link" onClick={close}>{t('nav.home')}</Link>
              <div className="dropdown-menu">
                <Link to="/about" className="dropdown-link" onClick={close}>{t('nav.about')}</Link>
              </div>
            </div>

            <div className="nav-item-dropdown">
              <Link to="/products" className="navbar-link" onClick={close}>{t('nav.products')}</Link>
              <div className="dropdown-menu">
                <Link to="/catalog" className="dropdown-link" onClick={close}>{t('nav.catalog')}</Link>
              </div>
            </div>

            <div className="nav-item-dropdown">
              <Link to="/instructions" className="navbar-link" onClick={close}>{t('nav.instructions')}</Link>
              <div className="dropdown-menu">
                <Link to="/calculator" className="dropdown-link" onClick={close}>
                  <FaCalculator style={{ marginRight: 4 }} />{t('nav.calculator')}
                </Link>
              </div>
            </div>

            <div className="nav-item-dropdown">
              <Link to="/contacts" className="navbar-link" onClick={close}>{t('nav.contacts')}</Link>
              <div className="dropdown-menu">
                <Link to="/portfolio" className="dropdown-link" onClick={close}>{t('nav.portfolio') || 'Портфолио'}</Link>
                <Link to="/reviews" className="dropdown-link" onClick={close}>{t('nav.reviews') || 'Отзывы'}</Link>
              </div>
            </div>

            <button
              className="cooperation-button"
              onClick={() => { setCooperationOpen(true); close(); }}
            >
              <FaHandshake />
              <span>{t('nav.cooperation')}</span>
            </button>

            <Link to="/wishlist" className="navbar-icon-btn wishlist-btn" onClick={close} title="Wishlist">
              <FaHeart />
              {wishlistCount > 0 && <span className="wishlist-badge">{wishlistCount}</span>}
            </Link>

            <LanguageSwitcher />

            <button
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <FaMoon /> : <FaSun />}
            </button>
          </div>
        </div>
      </nav>

      <CooperationModal
        isOpen={cooperationOpen}
        onClose={() => setCooperationOpen(false)}
      />
    </>
  );
};

export default Navbar;
