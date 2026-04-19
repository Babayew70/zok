import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import axios from 'axios';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useWishlist } from '../context/WishlistContext';
import './Products.css';

import API_URL from '../config';
import { getImageUrl } from '../utils/imageUrl';

const Products = () => {
  const { theme } = useTheme();
  const { t, i18n } = useTranslation();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchParams] = useSearchParams();

  useEffect(() => {
    fetchCategories();
    const categoryId = searchParams.get('category');
    if (categoryId) {
      setSelectedCategory(categoryId);
      fetchProductsByCategory(categoryId);
    } else {
      fetchProducts();
    }
  }, [searchParams]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/products`);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchProductsByCategory = async (categoryId) => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/products/category/${categoryId}`);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${API_URL}/products/categories/all`);
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleCategoryFilter = (categoryId) => {
    if (categoryId === selectedCategory) {
      setSelectedCategory(null);
      fetchProducts();
    } else {
      setSelectedCategory(categoryId);
      fetchProductsByCategory(categoryId);
    }
  };

  const getProductName = (product) => {
    const lang = i18n.language;
    if (lang === 'tm') return product.name_tm || product.name_ru || product.name;
    if (lang === 'en') return product.name_en || product.name_ru || product.name;
    return product.name_ru || product.name;
  };

  const getProductDescription = (product) => {
    const lang = i18n.language;
    if (lang === 'tm') return product.description_tm || product.description_ru;
    if (lang === 'en') return product.description_en || product.description_ru;
    return product.description_ru;
  };

  const getCategoryName = (category) => {
    const lang = i18n.language;
    if (lang === 'tm') return category.name_tm || category.name_ru || category.name;
    if (lang === 'en') return category.name_en || category.name_ru || category.name;
    return category.name_ru || category.name;
  };

  const getProductCategoryName = (product) => {
    const lang = i18n.language;
    if (lang === 'tm') return product.category_name_tm || product.category_name;
    if (lang === 'en') return product.category_name_en || product.category_name;

    return product.category_name;
  };

  // Filter products by search query
  const filteredProducts = products.filter(product => {
    if (!searchQuery) return true;
    const name = getProductName(product).toLowerCase();
    return name.includes(searchQuery.toLowerCase());
  });

  if (loading) {
    return (
      <div className={`products-page ${theme}`}>
        <div className="loading">{t('common.loading')}</div>
      </div>
    );
  }

  return (
    <div className={`products-page ${theme}`}>
      <div className="products-container">
        <motion.h1
          className="page-title"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {t('products.title')}
        </motion.h1>

        {/* Search Bar */}
        <motion.div
          className="search-bar"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <input
            type="text"
            placeholder={t('common.search') + '...'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </motion.div>

        {/* Category Filters */}
        <motion.div
          className="category-filters"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <button
            className={`filter-btn ${!selectedCategory ? 'active' : ''}`}
            onClick={() => {
              setSelectedCategory(null);
              fetchProducts();
            }}
          >
            {t('common.all')}
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              className={`filter-btn ${selectedCategory === String(category.id) || selectedCategory === category.id ? 'active' : ''}`}
              onClick={() => handleCategoryFilter(category.id)}
            >
              {getCategoryName(category)}
            </button>
          ))}
        </motion.div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="no-products">
            <p>{i18n.language === 'tm' ? 'Önümler tapylmady' : i18n.language === 'en' ? 'No products found' : 'Продукты не найдены'}</p>
          </div>
        ) : (
          <div className="products-grid">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08, duration: 0.5 }}
              >
                <Tilt
                  tiltMaxAngleX={8}
                  tiltMaxAngleY={8}
                  scale={1.02}
                  transitionSpeed={400}
                  glareEnable={true}
                  glareMaxOpacity={0.15}
                  glareColor="#cabf7e"
                  glarePosition="all"
                  glareBorderRadius="16px"
                >
                  <Link
                    to={`/products/${product.id}`}
                    className={`product-card ${theme}`}
                  >
                    {product.image_url && (
                      <div className="product-image">
                        <img src={getImageUrl(product.image_url)} alt={getProductName(product)} />
                        <button
                          className={`wishlist-toggle ${isInWishlist(product.id) ? 'active' : ''}`}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            toggleWishlist(product);
                          }}
                          aria-label="Add to wishlist"
                        >
                          {isInWishlist(product.id) ? <FaHeart /> : <FaRegHeart />}
                        </button>
                      </div>
                    )}
                    <div className="product-info">
                      <h3>{getProductName(product)}</h3>
                      {product.category_name && (
                        <p className="product-category">{getProductCategoryName(product)}</p>
                      )}
                      {getProductDescription(product) && (
                        <p className="product-description">
                          {getProductDescription(product).length > 100
                            ? `${getProductDescription(product).substring(0, 100)}...`
                            : getProductDescription(product)}
                        </p>
                      )}
                      <div className="product-footer">
                        {product.price && (
                          <p className="product-price">{product.price} TMT</p>
                        )}
                        {product.color && (
                          <div
                            className="product-color"
                            style={{ backgroundColor: product.color }}
                            title={product.color}
                          ></div>
                        )}
                      </div>
                      {!product.in_stock && (
                        <span className="out-of-stock">{t('products.outOfStock')}</span>
                      )}
                    </div>
                  </Link>
                </Tilt>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
