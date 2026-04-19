import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';
import { useWishlist } from '../context/WishlistContext';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { FaHeart, FaTrash, FaShoppingBag } from 'react-icons/fa';
import './Wishlist.css';
import { getImageUrl } from '../utils/imageUrl';

const Wishlist = () => {
    const { theme } = useTheme();
    const { i18n } = useTranslation();
    const { wishlist, removeFromWishlist } = useWishlist();

    const getProductName = (product) => {
        const lang = i18n.language;
        if (lang === 'tm') return product.name_tm || product.name_ru;
        if (lang === 'en') return product.name_en || product.name_ru;
        return product.name_ru;
    };

    const title = i18n.language === 'tm' ? 'Halalanlar' : i18n.language === 'en' ? 'Wishlist' : 'Избранное';
    const emptyText = i18n.language === 'tm' ? 'Siz entek hiç zat goşmadyňyz' : i18n.language === 'en' ? 'Your wishlist is empty' : 'Вы ещё ничего не добавили';
    const browseText = i18n.language === 'tm' ? 'Önümleri görmek' : i18n.language === 'en' ? 'Browse Products' : 'Смотреть продукцию';

    return (
        <div className={`wishlist-page ${theme}`}>
            <motion.div
                className="wishlist-hero"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <FaHeart className="hero-icon" />
                <h1>{title}</h1>
                <p>{wishlist.length} {i18n.language === 'tm' ? 'önüm' : i18n.language === 'en' ? 'items' : 'товаров'}</p>
            </motion.div>

            <div className="wishlist-container">
                {wishlist.length === 0 ? (
                    <motion.div
                        className="wishlist-empty"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        <FaHeart className="empty-icon" />
                        <p>{emptyText}</p>
                        <Link to="/products" className="btn-primary">
                            <FaShoppingBag /> {browseText}
                        </Link>
                    </motion.div>
                ) : (
                    <div className="wishlist-grid">
                        {wishlist.map((product, idx) => (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.08 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                            >
                                <Tilt tiltMaxAngleX={6} tiltMaxAngleY={6} scale={1.02} transitionSpeed={400}>
                                    <div className="wishlist-card glass-card">
                                        <Link to={`/products/${product.id}`} className="wishlist-card-link">
                                            {product.image_url ? (
                                                <div className="wishlist-image">
                                                    <img src={getImageUrl(product.image_url)} alt={getProductName(product)} />
                                                </div>
                                            ) : (
                                                <div className="wishlist-image placeholder">
                                                    <FaHeart />
                                                </div>
                                            )}
                                            <div className="wishlist-info">
                                                <h3>{getProductName(product)}</h3>
                                                {product.price && <p className="wishlist-price">{product.price} TMT</p>}
                                            </div>
                                        </Link>
                                        <button
                                            className="wishlist-remove"
                                            onClick={() => removeFromWishlist(product.id)}
                                            title="Remove"
                                        >
                                            <FaTrash />
                                        </button>
                                    </div>
                                </Tilt>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Wishlist;
