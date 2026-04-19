import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaInstagram, FaTiktok } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  const { theme } = useTheme();
  const { t, i18n } = useTranslation();

  // Контактные данные по языкам (согласно ТЗ)
  const getContactInfo = () => {
    const lang = i18n.language;

    const contacts = {
      tm: {
        manufacturer: 'Öndüriji: «Ýigitler Mekany» hususy kärhanasy, Aşgabat şahamçasy.',
        address: 'Aşgabat şäheri, Berkararlyk etraby, 1958 (Nurmuhammet Andalyp) köçesi, 334'
      },
      ru: {
        manufacturer: 'Производитель: «Йигитлер меканы» частное предприятие, Ашхабадский филиал.',
        address: 'город Ашхабад, Беркарарлыкский район, улица 1958 (Нурмухаммет Андалип), 334'
      },
      en: {
        manufacturer: 'Manufacturer: «Yigitler Mekany» private enterprise, Ashgabat branch.',
        address: 'Ashgabat city, Berkararlyk district, street 1958 (Nurmuhammet Andalip), 334'
      }
    };

    return contacts[lang] || contacts.ru;
  };

  const contactInfo = getContactInfo();

  return (
    <footer className={`footer ${theme}`}>
      <div className="footer-container">
        <div className="footer-content">
          {/* О компании */}
          <div className="footer-section">
            <div className="footer-logo">
              <img src="/white-logo.svg" alt="ZOK Logo" />
            </div>
            <h3>{t('footer.company')}</h3>
            <p className="manufacturer-info">
              {contactInfo.manufacturer}
            </p>
            <p className="address-info">
              {contactInfo.address}
            </p>
          </div>

          {/* Категории */}
          <div className="footer-section">
            <h3>{t('footer.categories')}</h3>
            <ul>
              <li><Link to="/products?category=1">{t('categories.emulsions')}</Link></li>
              <li><Link to="/products?category=2">{t('categories.travertine')}</Link></li>
              <li><Link to="/products?category=3">{t('categories.ottocento')}</Link></li>
              <li><Link to="/products?category=4">{t('categories.lacquers')}</Link></li>
              <li><Link to="/products?category=5">{t('categories.putties')}</Link></li>
            </ul>
          </div>

          {/* Контакты */}
          <div className="footer-section">
            <h3>{t('footer.contacts')}</h3>
            <div className="contact-item">
              <div className="contact-icon-wrap"><FaPhone /></div>
              <a href="tel:+99363211003">(+993) 63 21-10-03</a>
            </div>
            <div className="contact-item">
              <div className="contact-icon-wrap"><FaEnvelope /></div>
              <a href="mailto:zeynepjumakulyyewa@gmail.com">zeynepjumakulyyewa@gmail.com</a>
            </div>
            <div className="contact-item">
              <div className="contact-icon-wrap"><FaMapMarkerAlt /></div>
              <span>{contactInfo.address}</span>
            </div>
          </div>

          {/* Социальные сети */}
          <div className="footer-section">
            <h3>{t('footer.social')}</h3>
            <div className="social-links">
              <a
                href="https://instagram.com/zokdekor.lb"
                className="social-link"
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram />
              </a>
              <a
                href="https://tiktok.com/@zokdekor.lb"
                className="social-link"
                aria-label="TikTok"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTiktok />
              </a>
            </div>
            <p className="footer-hours">
              <strong>{t('footer.workHours')}:</strong><br />
              {t('footer.weekdays')}<br />
              {t('footer.weekends')}
            </p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>{t('footer.rights')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
