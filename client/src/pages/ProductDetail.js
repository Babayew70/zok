import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import axios from 'axios';
import { FaCheckCircle, FaArrowLeft, FaTimes, FaHeart, FaRegHeart } from 'react-icons/fa';
import { useWishlist } from '../context/WishlistContext';
import './ProductDetail.css';

import API_URL from '../config';
import { getImageUrl } from '../utils/imageUrl';

const ProductDetail = () => {
  const { id } = useParams();
  const { theme } = useTheme();
  const { t, i18n } = useTranslation();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [orderForm, setOrderForm] = useState({
    customer_name: '',
    customer_email: '',
    customer_phone: '',
    customer_address: '',
    quantity: 1,
    notes: ''
  });
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderLoading, setOrderLoading] = useState(false);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/products/${id}`);
      setProduct(response.data);
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  };

  const getProductName = (p) => {
    const lang = i18n.language;
    if (lang === 'tm') return p.name_tm || p.name_ru || p.name;
    if (lang === 'en') return p.name_en || p.name_ru || p.name;
    return p.name_ru || p.name;
  };

  const getProductDescription = (p) => {
    const lang = i18n.language;
    if (lang === 'tm') return p.description_tm || p.description_ru;
    if (lang === 'en') return p.description_en || p.description_ru;
    return p.description_ru;
  };

  const getProductCategoryName = (p) => {
    const lang = i18n.language;
    if (lang === 'tm') return p.category_name_tm || p.category_name;
    if (lang === 'en') return p.category_name_en || p.category_name;
    return p.category_name;
  };

  const handleOrderSubmit = async (e) => {
    e.preventDefault();
    setOrderLoading(true);
    try {
      await axios.post(`${API_URL}/orders`, {
        product_id: product.id,
        ...orderForm
      });
      setOrderSuccess(true);
    } catch (error) {
      alert(t('order.error') + ': ' + (error.response?.data?.error || error.message));
    } finally {
      setOrderLoading(false);
    }
  };

  if (loading) {
    return (
      <div className={`product-detail-page ${theme}`}>
        <div className="loading">{t('common.loading')}</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className={`product-detail-page ${theme}`}>
        <div className="error">{t('common.error')}</div>
        <Link to="/products">{t('common.back')}</Link>
      </div>
    );
  }

  return (
    <div className={`product-detail-page ${theme}`}>
      <div className="product-detail-container">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Link to="/products" className="back-link">
            <FaArrowLeft /> {t('common.back')}
          </Link>
        </motion.div>

        <div className="product-detail-content">
          {product.image_url && (
            <motion.div
              className="product-detail-image"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Tilt
                tiltMaxAngleX={10}
                tiltMaxAngleY={10}
                scale={1.03}
                transitionSpeed={400}
                glareEnable={true}
                glareMaxOpacity={0.2}
                glareColor="#cabf7e"
                glarePosition="all"
                glareBorderRadius="16px"
              >
                <img src={getImageUrl(product.image_url)} alt={getProductName(product)} />
              </Tilt>
            </motion.div>
          )}

          <motion.div
            className="product-detail-info"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <h1>{getProductName(product)}</h1>
            {product.category_name && (
              <p className="product-category">{getProductCategoryName(product)}</p>
            )}

            {product.price && (
              <div className="product-price-large">{product.price} TMT</div>
            )}

            {getProductDescription(product) && (
              <div className="product-description-full">
                <h3>{i18n.language === 'tm' ? 'Düşündiriş' : i18n.language === 'en' ? 'Description' : 'Описание'}</h3>
                <p>{getProductDescription(product)}</p>
              </div>
            )}

            <div className="product-specs">
              {product.color && (
                <div className="spec-item">
                  <span className="spec-label">{t('products.color')}:</span>
                  <div className="spec-value">
                    <div
                      className="color-preview"
                      style={{ backgroundColor: product.color }}
                    ></div>
                    <span>{product.color}</span>
                  </div>
                </div>
              )}

              {product.volume && (
                <div className="spec-item">
                  <span className="spec-label">{t('products.volume')}:</span>
                  <span className="spec-value">{product.volume}</span>
                </div>
              )}

              <div className="spec-item">
                <span className="spec-label">{i18n.language === 'tm' ? 'Barlyk' : i18n.language === 'en' ? 'Availability' : 'Наличие'}:</span>
                <span className={`spec-value ${product.in_stock ? 'in-stock' : 'out-of-stock'}`}>
                  {product.in_stock ? t('products.inStock') : t('products.outOfStock')}
                </span>
              </div>
            </div>

            {product.in_stock && (
              <div className="product-actions">
                <motion.button
                  className="order-button btn-primary"
                  onClick={() => setShowOrderForm(true)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {t('products.order')}
                </motion.button>
                <motion.button
                  className={`wishlist-button ${isInWishlist(product.id) ? 'active' : ''}`}
                  onClick={() => toggleWishlist(product)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Toggle Wishlist"
                >
                  {isInWishlist(product.id) ? <FaHeart /> : <FaRegHeart />}
                </motion.button>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Order Modal */}
      {showOrderForm && (
        <div className="order-modal-overlay" onClick={() => {
          setShowOrderForm(false);
          setOrderSuccess(false);
        }}>
          <motion.div
            className="order-modal-content glass-card"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          >
            <button className="modal-close-btn" onClick={() => {
              setShowOrderForm(false);
              setOrderSuccess(false);
            }}>
              <FaTimes />
            </button>
            {!orderSuccess ? (
              <>
                <h2>{t('order.title')}</h2>
                <p className="order-product-name">{getProductName(product)}</p>
                <p className="order-product-price">{t('products.price')}: {product.price} TMT</p>

                <form onSubmit={handleOrderSubmit}>
                  <div className="order-form-group">
                    <label>{t('order.name')} *</label>
                    <input
                      type="text"
                      required
                      value={orderForm.customer_name}
                      onChange={(e) => setOrderForm({ ...orderForm, customer_name: e.target.value })}
                      placeholder={t('order.name')}
                    />
                  </div>

                  <div className="order-form-group">
                    <label>{t('order.email')}</label>
                    <input
                      type="email"
                      value={orderForm.customer_email}
                      onChange={(e) => setOrderForm({ ...orderForm, customer_email: e.target.value })}
                      placeholder="email@example.com"
                    />
                  </div>

                  <div className="order-form-group">
                    <label>{t('order.phone')} *</label>
                    <input
                      type="tel"
                      required
                      value={orderForm.customer_phone}
                      onChange={(e) => setOrderForm({ ...orderForm, customer_phone: e.target.value })}
                      placeholder="+993 XX XXX XX XX"
                    />
                  </div>

                  <div className="order-form-group">
                    <label>{t('order.address')}</label>
                    <textarea
                      rows="2"
                      value={orderForm.customer_address}
                      onChange={(e) => setOrderForm({ ...orderForm, customer_address: e.target.value })}
                      placeholder={t('order.address')}
                    />
                  </div>

                  <div className="order-form-group">
                    <label>{t('order.quantity')}</label>
                    <input
                      type="number"
                      min="1"
                      value={orderForm.quantity}
                      onChange={(e) => setOrderForm({ ...orderForm, quantity: parseInt(e.target.value) || 1 })}
                    />
                  </div>

                  <div className="order-form-group">
                    <label>{t('order.notes')}</label>
                    <textarea
                      rows="2"
                      value={orderForm.notes}
                      onChange={(e) => setOrderForm({ ...orderForm, notes: e.target.value })}
                      placeholder={t('order.notes')}
                    />
                  </div>

                  <div className="order-modal-actions">
                    <button
                      type="button"
                      className="cancel-order-button"
                      onClick={() => {
                        setShowOrderForm(false);
                        setOrderForm({ customer_name: '', customer_email: '', customer_phone: '', customer_address: '', quantity: 1, notes: '' });
                      }}
                    >
                      {t('common.cancel')}
                    </button>
                    <button type="submit" className="submit-order-button btn-primary" disabled={orderLoading}>
                      {orderLoading ? '...' : t('order.submit')}
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <div className="order-success">
                <FaCheckCircle className="success-icon" />
                <h2>{t('order.success')}</h2>
                <p>{i18n.language === 'tm' ? 'Biziň menejerimiz siz bilen habarlaşar.' : i18n.language === 'en' ? 'Our manager will contact you shortly.' : 'Наш менеджер свяжется с вами в ближайшее время.'}</p>
                <button
                  className="close-order-button btn-primary"
                  onClick={() => {
                    setShowOrderForm(false);
                    setOrderSuccess(false);
                    setOrderForm({ customer_name: '', customer_email: '', customer_phone: '', customer_address: '', quantity: 1, notes: '' });
                  }}
                >
                  {t('common.close')}
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
