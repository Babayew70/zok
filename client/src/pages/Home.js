import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import axios from 'axios';
import { FaPaintBrush, FaPalette, FaBrush, FaSprayCan, FaPaintRoller, FaArrowDown, FaStar, FaAward, FaUsers, FaCheckCircle, FaPhone, FaBook, FaHeart, FaRegHeart } from 'react-icons/fa';
import { useWishlist } from '../context/WishlistContext';
import './Home.css';

import API_URL from '../config';
import { getImageUrl } from '../utils/imageUrl';

const Home = () => {
  const { theme } = useTheme();
  const { t, i18n } = useTranslation();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [categories, setCategories] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [banners, setBanners] = useState([]);
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);

  useEffect(() => {
    fetchCategories();
    fetchFeaturedProducts();
    fetchBanners();
  }, []);

  // Автопереключение баннеров
  useEffect(() => {
    if (banners.length > 1) {
      const interval = setInterval(() => {
        setCurrentBannerIndex((prev) => (prev + 1) % banners.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [banners.length]);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${API_URL}/products/categories/all`);
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchFeaturedProducts = async () => {
    try {
      const response = await axios.get(`${API_URL}/products`);
      const featured = response.data.filter(p => p.featured).slice(0, 6);
      setFeaturedProducts(featured);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const fetchBanners = async () => {
    try {
      const response = await axios.get(`${API_URL}/banners`, { params: { _t: Date.now() } });
      setBanners(response.data);
    } catch (error) {
      console.error('Error fetching banners:', error);
    }
  };

  const getBannerImageUrl = (banner) => {
    const isMobile = window.innerWidth < 768;
    const url = isMobile && banner.image_url_mobile 
      ? banner.image_url_mobile 
      : banner.image_url || '';
    return getImageUrl(url);
  };

  const getBannerTitle = (banner) => {
    const lang = i18n.language;
    if (lang === 'tm') return banner.title_tm || banner.title_ru || banner.title_en;
    if (lang === 'en') return banner.title_en || banner.title_ru || banner.title_tm;
    return banner.title_ru || banner.title_tm || banner.title_en;
  };

  const categoryIcons = {
    'Эмульсии': FaPaintBrush,
    'Траверсы': FaPalette,
    'Аттохенто': FaBrush,
    'Лаки': FaSprayCan,
    'Декоративные шпаклевки': FaPaintRoller
  };

  // Получить название категории на текущем языке
  const getCategoryName = (category) => {
    const lang = i18n.language;
    if (lang === 'tm') return category.name_tm || category.name_ru || category.name;
    if (lang === 'en') return category.name_en || category.name_ru || category.name;
    return category.name_ru || category.name;
  };

  // Получить название продукта на текущем языке
  const getProductName = (product) => {
    const lang = i18n.language;
    if (lang === 'tm') return product.name || product.name_ru;
    if (lang === 'en') return product.name || product.name_ru;
    return product.name_ru || product.name;
  };

  return (
    <div className={`home ${theme}`}>
      {/* Banner Section */}
      {banners.length > 0 && (
        <section className="banner-section">
          <div className="banner-slider">
            {banners.map((banner, index) => (
              <div
                key={banner.id}
                className={`banner-slide ${index === currentBannerIndex ? 'active' : ''}`}
                style={{ backgroundImage: `url(${getBannerImageUrl(banner)})` }}
              >
                <div className="banner-overlay"></div>
                <div className="banner-content">
                  {getBannerTitle(banner) && (
                    <h2 className="banner-title">{getBannerTitle(banner)}</h2>
                  )}
                  {banner.link && (
                    <Link to={banner.link} className="banner-button">
                      {i18n.language === 'tm' ? 'Görüň' : i18n.language === 'ru' ? 'Смотреть' : 'View'}
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
          {banners.length > 1 && (
            <div className="banner-dots">
              {banners.map((_, index) => (
                <button
                  key={index}
                  className={`banner-dot ${index === currentBannerIndex ? 'active' : ''}`}
                  onClick={() => setCurrentBannerIndex(index)}
                  aria-label={`Banner ${index + 1}`}
                />
              ))}
            </div>
          )}
        </section>
      )}

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-background">
          <div className="hero-gradient"></div>
          <div className="floating-shapes">
            <div className="shape shape-1"></div>
            <div className="shape shape-2"></div>
            <div className="shape shape-3"></div>
            <div className="shape shape-4"></div>
            <div className="shape shape-5"></div>
          </div>
        </div>
        <div className="hero-content">
          <div className="hero-badge">
            <FaStar /> {i18n.language === 'tm' ? 'Premium hil' : i18n.language === 'ru' ? 'Премиум качество' : 'Premium Quality'}
          </div>
          <h1 className="hero-title">
            <span className="title-line-1">{t('hero.title')}</span>
            <span className="title-line-2 gradient-text">{t('hero.subtitle')}</span>
          </h1>
          <p className="hero-subtitle">
            {t('about.description')}
          </p>
          <div className="hero-buttons">
            <Link to="/products" className="cta-button primary">
              {t('hero.cta')}
            </Link>
            <Link to="/catalog" className="cta-button secondary">
              <FaBook /> {t('hero.catalog')}
            </Link>
          </div>
          <div className="hero-stats">
            <div className="stat-item">
              <div className="stat-number">500+</div>
              <div className="stat-label">{t('products.title')}</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">1000+</div>
              <div className="stat-label">{i18n.language === 'tm' ? 'Kanagatly müşderiler' : i18n.language === 'ru' ? 'Довольных клиентов' : 'Happy Clients'}</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">10+</div>
              <div className="stat-label">{i18n.language === 'tm' ? 'Ýyl tejribe' : i18n.language === 'ru' ? 'Лет опыта' : 'Years Experience'}</div>
            </div>
          </div>
        </div>
        <div className="scroll-indicator">
          <FaArrowDown />
          <span>{i18n.language === 'tm' ? 'Aşak süýşüriň' : i18n.language === 'ru' ? 'Прокрутите вниз' : 'Scroll Down'}</span>
        </div>
      </section>

      {/* Преимущества */}
      <motion.section className="features-section" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.6 }}>
        <div className="features-container">
          <h2 className="section-title">{i18n.language === 'tm' ? 'Näme üçin bizi saýlaýarlar' : i18n.language === 'ru' ? 'Почему выбирают нас' : 'Why Choose Us'}</h2>
          <div className="features-grid">
            {[
              { icon: <FaAward />, title: i18n.language === 'tm' ? 'Premium hil' : i18n.language === 'ru' ? 'Премиум качество' : 'Premium Quality', desc: i18n.language === 'tm' ? 'Diňe kepillendirilen materiallar' : i18n.language === 'ru' ? 'Только сертифицированные материалы' : 'Only certified materials' },
              { icon: <FaUsers />, title: i18n.language === 'tm' ? 'Professional maslahat' : i18n.language === 'ru' ? 'Профессиональная консультация' : 'Professional Consultation', desc: i18n.language === 'tm' ? 'Hünärmenlerimiz kömek ederler' : i18n.language === 'ru' ? 'Наши специалисты помогут выбрать' : 'Our experts will help you choose' },
              { icon: <FaCheckCircle />, title: i18n.language === 'tm' ? 'Hil kepilligi' : i18n.language === 'ru' ? 'Гарантия качества' : 'Quality Guarantee', desc: i18n.language === 'tm' ? 'Uzak wagtlylyk kepillendirilýär' : i18n.language === 'ru' ? 'Мы гарантируем долговечность' : 'We guarantee durability' },
              { icon: <FaSprayCan />, title: i18n.language === 'tm' ? 'Giň assortiment' : i18n.language === 'ru' ? 'Широкий ассортимент' : 'Wide Range', desc: i18n.language === 'tm' ? '500+ önüm görnüşleri' : i18n.language === 'ru' ? 'Более 500 наименований продукции' : 'Over 500 product types' }
            ].map((f, i) => (
              <motion.div key={i} className="feature-card" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15, duration: 0.5 }}>
                <div className="feature-icon">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Categories Section */}
      <motion.section className="categories-section" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.6 }}>
        <h2 className="section-title">{t('categories.title')}</h2>
        <div className="categories-grid">
          {categories.map((category, idx) => {
            const Icon = categoryIcons[category.name_ru] || FaPalette;
            return (
              <motion.div key={category.id} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: idx * 0.1, duration: 0.4 }}>
                <Link
                  to={`/products?category=${category.id}`}
                  className={`category-card ${theme}`}
                >
                  <div className="category-icon">
                    <Icon />
                  </div>
                  <h3>{getCategoryName(category)}</h3>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </motion.section>

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <motion.section className="featured-section" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.6 }}>
          <h2 className="section-title">{i18n.language === 'tm' ? 'Maslahat berilýän önümler' : i18n.language === 'ru' ? 'Рекомендуемые продукты' : 'Featured Products'}</h2>
          <div className="products-grid">
            {featuredProducts.map((product, idx) => (
              <motion.div key={product.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1, duration: 0.45 }}>
                <Tilt tiltMaxAngleX={8} tiltMaxAngleY={8} scale={1.02} transitionSpeed={400} glareEnable={true} glareMaxOpacity={0.12} glareColor="#cabf7e" glarePosition="all" glareBorderRadius="16px">
                  <Link to={`/products/${product.id}`} className={`product-card ${theme}`}>
                    {product.image_url && (
                      <div className="product-image">
                        <img src={getImageUrl(product.image_url)} alt={getProductName(product)} />
                        <button
                          className={`wishlist-toggle-home ${isInWishlist(product.id) ? 'active' : ''}`}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            toggleWishlist(product);
                          }}
                        >
                          {isInWishlist(product.id) ? <FaHeart /> : <FaRegHeart />}
                        </button>
                      </div>
                    )}
                    <div className="product-info">
                      <h3>{getProductName(product)}</h3>
                      {product.price && <p className="product-price">{product.price} TMT</p>}
                      {product.color && <div className="product-color" style={{ backgroundColor: product.color }}></div>}
                    </div>
                  </Link>
                </Tilt>
              </motion.div>
            ))}
          </div>
          <div className="view-all-container">
            <Link to="/products" className="view-all-button btn-primary">{t('categories.viewAll')}</Link>
          </div>
        </motion.section>
      )}

      {/* Contact CTA */}
      <section className="contact-cta">
        <div className="contact-cta-content">
          <h2>{i18n.language === 'tm' ? 'Soraglaryňyz barmy?' : i18n.language === 'ru' ? 'Есть вопросы?' : 'Have Questions?'}</h2>
          <p>{i18n.language === 'tm' ? 'Biz bilen habarlaşyň!' : i18n.language === 'ru' ? 'Свяжитесь с нами!' : 'Contact us!'}</p>
          <a href="tel:+99363211003" className="contact-cta-button">
            <FaPhone /> (+993) 63 21-10-03
          </a>
        </div>
      </section>
    </div>
  );
};

export default Home;
