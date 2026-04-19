import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useWishlist } from '../context/WishlistContext';
import { useTheme } from '../context/ThemeContext';
import {
    FaHome, FaThLarge, FaCalculator, FaHeart, FaEllipsisH,
    FaBook, FaImages, FaStar, FaAddressBook, FaHandshake,
    FaTimes, FaSun, FaMoon, FaInfoCircle, FaPalette
} from 'react-icons/fa';
import LanguageSwitcher from './LanguageSwitcher';
import './BottomNav.css';

const BottomNav = () => {
    const location = useLocation();
    const { i18n } = useTranslation();
    const { wishlistCount } = useWishlist();
    const { theme, toggleTheme } = useTheme();
    const [moreOpen, setMoreOpen] = useState(false);

    if (location.pathname.startsWith('/admin')) return null;

    const lang = i18n.language;

    const labels = {
        home: lang === 'tm' ? 'Baş' : lang === 'en' ? 'Home' : 'Главная',
        products: lang === 'tm' ? 'Önümler' : lang === 'en' ? 'Products' : 'Товары',
        calc: lang === 'tm' ? 'Hasap' : lang === 'en' ? 'Calc' : 'Расчёт',
        wishlist: lang === 'tm' ? 'Halalan' : lang === 'en' ? 'Wishlist' : 'Избранное',
        more: lang === 'tm' ? 'Ýene' : lang === 'en' ? 'More' : 'Ещё',
        catalog: lang === 'tm' ? 'Katalog' : lang === 'en' ? 'Catalog' : 'Каталог',
        instructions: lang === 'tm' ? 'Görkezme' : lang === 'en' ? 'Instructions' : 'Инструкция',
        portfolio: lang === 'tm' ? 'Portfolio' : lang === 'en' ? 'Portfolio' : 'Портфолио',
        reviews: lang === 'tm' ? 'Pikirler' : lang === 'en' ? 'Reviews' : 'Отзывы',
        contacts: lang === 'tm' ? 'Habarlaş' : lang === 'en' ? 'Contacts' : 'Контакты',
        about: lang === 'tm' ? 'Biz barada' : lang === 'en' ? 'About' : 'О нас',
        cooperation: lang === 'tm' ? 'Hyzmatdaşlyk' : lang === 'en' ? 'Cooperation' : 'Сотрудничество',
        theme: lang === 'tm' ? 'Tema' : lang === 'en' ? 'Theme' : 'Тема',
    };

    const closeMore = () => setMoreOpen(false);

    return (
        <>
            {/* Mobile Top Header with Logo */}
            <div className={`mobile-top-header ${theme}`}>
                <NavLink to="/" className="mobile-logo">
                    <img src={theme === 'dark' ? '/white-logo.svg' : '/logo.svg'} alt="ZOK Logo" className="mobile-logo-img" />
                </NavLink>
                <div className="mobile-top-actions">
                    <LanguageSwitcher />
                </div>
            </div>

            {/* More Menu Overlay */}
            {moreOpen && (
                <div className={`more-overlay ${theme}`} onClick={closeMore}>
                    <div className="more-menu" onClick={(e) => e.stopPropagation()}>
                        <div className="more-header">
                            <span>{labels.more}</span>
                            <button className="more-close" onClick={closeMore}><FaTimes /></button>
                        </div>
                        <div className="more-grid">
                            <NavLink to="/catalog" className="more-item" onClick={closeMore}>
                                <FaBook /><span>{labels.catalog}</span>
                            </NavLink>
                            <NavLink to="/instructions" className="more-item" onClick={closeMore}>
                                <FaInfoCircle /><span>{labels.instructions}</span>
                            </NavLink>
                            <NavLink to="/portfolio" className="more-item" onClick={closeMore}>
                                <FaImages /><span>{labels.portfolio}</span>
                            </NavLink>
                            <NavLink to="/reviews" className="more-item" onClick={closeMore}>
                                <FaStar /><span>{labels.reviews}</span>
                            </NavLink>
                            <NavLink to="/contacts" className="more-item" onClick={closeMore}>
                                <FaAddressBook /><span>{labels.contacts}</span>
                            </NavLink>
                            <NavLink to="/about" className="more-item" onClick={closeMore}>
                                <FaHandshake /><span>{labels.about}</span>
                            </NavLink>
                            <button className="more-item" onClick={() => { toggleTheme(); closeMore(); }}>
                                {theme === 'light' ? <FaMoon /> : <FaSun />}
                                <span>{labels.theme}</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Bottom Nav Bar */}
            <nav className={`bottom-nav ${theme}`} id="bottom-nav">
                <NavLink to="/" className={({ isActive }) => `bottom-nav-item ${isActive ? 'active' : ''}`} end>
                    <FaHome />
                    <span>{labels.home}</span>
                </NavLink>
                <NavLink to="/products" className={({ isActive }) => `bottom-nav-item ${isActive ? 'active' : ''}`}>
                    <FaThLarge />
                    <span>{labels.products}</span>
                </NavLink>
                <NavLink to="/calculator" className={({ isActive }) => `bottom-nav-item ${isActive ? 'active' : ''}`}>
                    <FaCalculator />
                    <span>{labels.calc}</span>
                </NavLink>
                <NavLink to="/wishlist" className={({ isActive }) => `bottom-nav-item ${isActive ? 'active' : ''}`}>
                    <div className="bottom-nav-icon-wrap">
                        <FaHeart />
                        {wishlistCount > 0 && <span className="bottom-badge">{wishlistCount}</span>}
                    </div>
                    <span>{labels.wishlist}</span>
                </NavLink>
                <button className={`bottom-nav-item ${moreOpen ? 'active' : ''}`} onClick={() => setMoreOpen(!moreOpen)}>
                    <FaEllipsisH />
                    <span>{labels.more}</span>
                </button>
            </nav>
        </>
    );
};

export default BottomNav;
