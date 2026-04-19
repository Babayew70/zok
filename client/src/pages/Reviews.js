import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FaStar, FaRegStar, FaQuoteLeft, FaPaperPlane } from 'react-icons/fa';
import axios from 'axios';
import './Reviews.css';

import API_URL from '../config';

const Reviews = () => {
    const { theme } = useTheme();
    const { i18n } = useTranslation();
    const [reviews, setReviews] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState({ author_name: '', rating: 5, text_content: '' });
    const [submitStatus, setSubmitStatus] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchReviews();
    }, []);

    const fetchReviews = async () => {
        try {
            const response = await axios.get(`${API_URL}/reviews`);
            setReviews(response.data);
        } catch (error) {
            console.error('Error fetching reviews:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post(`${API_URL}/reviews`, form);
            setSubmitStatus('success');
            setForm({ author_name: '', rating: 5, text_content: '' });
            setTimeout(() => { setSubmitStatus(''); setShowForm(false); }, 3000);
        } catch (error) {
            setSubmitStatus('error');
        } finally {
            setLoading(false);
        }
    };

    const texts = {
        tm: { title: 'Müşderileriň pikirleri', subtitle: 'Biziň müşderilerimiziň aýtýanlary', write: 'Pikir ýazmak', name: 'Adyňyz', review: 'Siziň pikiriňiz', send: 'Ibermek', success: 'Pikiriňiz ugradyldy! Tassyklanandan soň görkeziler.', error: 'Näsazlyk ýüze çykdy', empty: 'Heniz pikir ýok' },
        ru: { title: 'Отзывы клиентов', subtitle: 'Что говорят наши клиенты', write: 'Оставить отзыв', name: 'Ваше имя', review: 'Ваш отзыв', send: 'Отправить', success: 'Отзыв отправлен! Он появится после проверки модератором.', error: 'Произошла ошибка', empty: 'Пока нет отзывов' },
        en: { title: 'Customer Reviews', subtitle: 'What our customers say', write: 'Write a Review', name: 'Your name', review: 'Your review', send: 'Submit', success: 'Review submitted! It will appear after moderation.', error: 'An error occurred', empty: 'No reviews yet' }
    };
    const t = (key) => (texts[i18n.language] || texts.ru)[key] || key;

    const renderStars = (rating, interactive = false, onChange = null) => {
        return Array.from({ length: 5 }, (_, i) => (
            <span
                key={i}
                className={`star ${interactive ? 'clickable' : ''}`}
                onClick={interactive ? () => onChange(i + 1) : undefined}
            >
                {i < rating ? <FaStar /> : <FaRegStar />}
            </span>
        ));
    };

    return (
        <div className={`reviews-page ${theme}`}>
            <motion.div className="reviews-hero" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
                <FaQuoteLeft className="hero-icon" />
                <h1>{t('title')}</h1>
                <p>{t('subtitle')}</p>
            </motion.div>

            <div className="reviews-container">
                <div className="reviews-actions">
                    <motion.button
                        className="btn-primary"
                        onClick={() => setShowForm(!showForm)}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                    >
                        <FaPaperPlane /> {t('write')}
                    </motion.button>
                </div>

                {/* Review Form */}
                {showForm && (
                    <motion.div
                        className="review-form glass-card"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        transition={{ duration: 0.3 }}
                    >
                        {submitStatus === 'success' ? (
                            <div className="review-success">✅ {t('success')}</div>
                        ) : (
                            <form onSubmit={handleSubmit}>
                                <div className="form-row">
                                    <input
                                        type="text"
                                        placeholder={t('name')}
                                        value={form.author_name}
                                        onChange={(e) => setForm({ ...form, author_name: e.target.value })}
                                        required
                                        className="form-input"
                                    />
                                </div>
                                <div className="form-row rating-row">
                                    <span className="rating-label">{i18n.language === 'tm' ? 'Baha' : i18n.language === 'en' ? 'Rating' : 'Оценка'}:</span>
                                    <div className="star-select">
                                        {renderStars(form.rating, true, (r) => setForm({ ...form, rating: r }))}
                                    </div>
                                </div>
                                <div className="form-row">
                                    <textarea
                                        placeholder={t('review')}
                                        value={form.text_content}
                                        onChange={(e) => setForm({ ...form, text_content: e.target.value })}
                                        required
                                        rows={4}
                                        className="form-input"
                                    />
                                </div>
                                {submitStatus === 'error' && <p className="form-error">{t('error')}</p>}
                                <button type="submit" className="btn-primary" disabled={loading}>
                                    {loading ? '...' : t('send')}
                                </button>
                            </form>
                        )}
                    </motion.div>
                )}

                {/* Reviews List */}
                {reviews.length === 0 ? (
                    <div className="reviews-empty"><p>{t('empty')}</p></div>
                ) : (
                    <div className="reviews-grid">
                        {reviews.map((review, idx) => (
                            <motion.div
                                key={review.id}
                                className="review-card glass-card"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1, duration: 0.4 }}
                            >
                                <div className="review-header">
                                    <div className="review-avatar">{review.author_name.charAt(0).toUpperCase()}</div>
                                    <div>
                                        <h4>{review.author_name}</h4>
                                        <div className="review-stars">{renderStars(review.rating)}</div>
                                    </div>
                                </div>
                                <FaQuoteLeft className="review-quote-icon" />
                                <p className="review-text">{review.text_content}</p>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Reviews;
