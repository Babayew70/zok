import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../context/ThemeContext';
import { FaTimes } from 'react-icons/fa';
import axios from 'axios';
import './CooperationModal.css';

import API_URL from '../config';

const CooperationModal = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    partnerType: 'shop'
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await axios.post(`${API_URL}/cooperation`, formData);
      setSuccess(true);
      setFormData({ name: '', phone: '', partnerType: 'shop' });
      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 3000);
    } catch (err) {
      setError(t('cooperation.error'));
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className={`cooperation-modal ${theme}`} onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <FaTimes />
        </button>

        <h2>{t('cooperation.title')}</h2>

        {success ? (
          <div className="success-message">
            <div className="success-icon">✓</div>
            <p>{t('cooperation.success')}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>{t('cooperation.name')}</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder={t('cooperation.name')}
              />
            </div>

            <div className="form-group">
              <label>{t('cooperation.phone')}</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="+993 XX XXX XX XX"
              />
            </div>

            <div className="form-group">
              <label>{t('cooperation.partnerType')}</label>
              <select
                name="partnerType"
                value={formData.partnerType}
                onChange={handleChange}
              >
                <option value="shop">{t('cooperation.shop')}</option>
                <option value="master">{t('cooperation.master')}</option>
                <option value="designer">{t('cooperation.designer')}</option>
              </select>
            </div>

            {error && <div className="error-message">{error}</div>}

            <button type="submit" className="submit-button" disabled={loading}>
              {loading ? '...' : t('cooperation.submit')}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default CooperationModal;

