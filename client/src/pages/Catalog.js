import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';
import { FaFilePdf, FaDownload, FaEye, FaBook, FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import './Catalog.css';

import API_URL, { UPLOADS_URL } from '../config';

const Catalog = () => {
  const { theme } = useTheme();
  const { t, i18n } = useTranslation();
  const [catalogInfo, setCatalogInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const catalogImages = Array.from({ length: 58 }, (_, i) => `Zok katalog Taze-${i + 1}.jpg`);

  const openLightbox = (index) => {
    setCurrentIndex(index);
    setSelectedImage(catalogImages[index]);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };

  const nextImage = (e) => {
    e.stopPropagation();
    const nextIdx = (currentIndex + 1) % catalogImages.length;
    setCurrentIndex(nextIdx);
    setSelectedImage(catalogImages[nextIdx]);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    const prevIdx = (currentIndex - 1 + catalogImages.length) % catalogImages.length;
    setCurrentIndex(prevIdx);
    setSelectedImage(catalogImages[prevIdx]);
  };

  useEffect(() => {
    const fetchCatalog = async () => {
      try {
        const response = await axios.get(`${API_URL}/catalog`);
        setCatalogInfo(response.data);
      } catch (error) {
        console.error('Error fetching catalog:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCatalog();
    
    // Polling для автоматического обновления каталога каждые 10 секунд
    const interval = setInterval(fetchCatalog, 10000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`catalog-page ${theme}`}>
      <div className="catalog-hero">
        <div className="catalog-hero-content">
          <FaBook className="catalog-hero-icon" />
          <h1>{t('catalog.title')}</h1>
          <p>{t('catalog.description')}</p>
        </div>
      </div>

      <div className="catalog-content">
        <div className="catalog-card">
          <div className="catalog-preview">
            <div className="catalog-cover">
              <FaFilePdf className="pdf-icon" />
              <span>ZOK</span>
              <small>{t('catalog.title')} 2024</small>
            </div>
          </div>

          <div className="catalog-info">
            <h2>ZOK {t('catalog.title')}</h2>
            <p>{t('catalog.description')}</p>

            <div className="catalog-actions">
              {catalogInfo?.file_url ? (
                <>
                  <a
                    href={catalogInfo.file_url.startsWith('http') ? catalogInfo.file_url : `${UPLOADS_URL}${catalogInfo.file_url.replace('/uploads', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="catalog-button primary"
                  >
                    <FaEye />
                    <span>{t('catalog.view')}</span>
                  </a>
                  <a
                    href={catalogInfo.file_url.startsWith('http') ? catalogInfo.file_url : `${UPLOADS_URL}${catalogInfo.file_url.replace('/uploads', '')}`}
                    download
                    className="catalog-button secondary"
                  >
                    <FaDownload />
                    <span>{t('catalog.download')}</span>
                  </a>
                </>
              ) : (
                <div className="catalog-coming-soon">
                  <p>
                    {loading ? t('common.loading') : 'Каталог скоро будет доступен'}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="catalog-categories">
          <h3>{t('categories.title')}</h3>
          <div className="categories-list">
            <div className="category-item">
              <span className="category-number">01</span>
              <span className="category-name">{t('categories.emulsions')}</span>
            </div>
            <div className="category-item">
              <span className="category-number">02</span>
              <span className="category-name">{t('categories.travertine')}</span>
            </div>
            <div className="category-item">
              <span className="category-number">03</span>
              <span className="category-name">{t('categories.ottocento')}</span>
            </div>
            <div className="category-item">
              <span className="category-number">04</span>
              <span className="category-name">{t('categories.lacquers')}</span>
            </div>
            <div className="category-item">
              <span className="category-number">05</span>
              <span className="category-name">{t('categories.putties')}</span>
            </div>
          </div>
        </div>

        <div className="visual-catalog">
          <h2 className="visual-catalog-title">
            {i18n.language === 'tm' ? 'Onlaýn Katalog' : i18n.language === 'en' ? 'Online Catalog' : 'Онлайн Каталог'}
          </h2>
          <div className="catalog-grid">
            {catalogImages.map((img, index) => (
              <motion.div
                key={index}
                className="catalog-item-image"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: (index % 10) * 0.05 }}
                onClick={() => openLightbox(index)}
              >
                <img src={`/catalog/${img}`} alt={`Catalog Page ${index + 1}`} loading="lazy" />
                <div className="image-overlay">
                  <FaEye />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="lightbox-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            <button className="lightbox-close" onClick={closeLightbox}>
              <FaTimes />
            </button>

            <button className="lightbox-nav prev" onClick={prevImage}>
              <FaChevronLeft />
            </button>

            <motion.div
              className="lightbox-content"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img src={`/catalog/${selectedImage}`} alt="Full size" />
              <div className="lightbox-counter">
                {currentIndex + 1} / {catalogImages.length}
              </div>
            </motion.div>

            <button className="lightbox-nav next" onClick={nextImage}>
              <FaChevronRight />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Catalog;

