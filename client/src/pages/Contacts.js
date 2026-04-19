import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaInstagram, FaTiktok, FaClock } from 'react-icons/fa';
import './Contacts.css';

const Contacts = () => {
  const { theme } = useTheme();
  const { t, i18n } = useTranslation();

  const getContactInfo = () => {
    const lang = i18n.language;
    
    const info = {
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

    return info[lang] || info.ru;
  };

  const contactInfo = getContactInfo();

  return (
    <div className={`contacts-page ${theme}`}>
      <div className="contacts-hero">
        <h1>{t('footer.contacts')}</h1>
        <p>{contactInfo.manufacturer}</p>
      </div>

      <div className="contacts-content">
        <div className="contacts-grid">
          <div className="contact-card-large">
            <div className="contact-icon">
              <FaMapMarkerAlt />
            </div>
            <h3>{i18n.language === 'tm' ? 'Salgy' : i18n.language === 'ru' ? 'Адрес' : 'Address'}</h3>
            <p>{contactInfo.address}</p>
          </div>

          <div className="contact-card-large">
            <div className="contact-icon">
              <FaPhone />
            </div>
            <h3>Telefon</h3>
            <a href="tel:+99363211003">(+993) 63 21-10-03</a>
          </div>

          <div className="contact-card-large">
            <div className="contact-icon">
              <FaEnvelope />
            </div>
            <h3>E-mail</h3>
            <a href="mailto:zeynepjumakulyyewa@gmail.com">zeynepjumakulyyewa@gmail.com</a>
          </div>

          <div className="contact-card-large">
            <div className="contact-icon">
              <FaClock />
            </div>
            <h3>{t('footer.workHours')}</h3>
            <p>{t('footer.weekdays')}</p>
            <p>{t('footer.weekends')}</p>
          </div>
        </div>

        <div className="social-section">
          <h2>{t('footer.social')}</h2>
          <div className="social-cards">
            <a 
              href="https://instagram.com/zokdekor.lb" 
              className="social-card instagram"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram />
              <span>ZOK Dekor.lb</span>
              <small>Instagram</small>
            </a>
            <a 
              href="https://tiktok.com/@zokdekor.lb" 
              className="social-card tiktok"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTiktok />
              <span>ZOK Dekor.lb</span>
              <small>TikTok</small>
            </a>
          </div>
        </div>

        <div className="map-section">
          <h2>{i18n.language === 'tm' ? 'Kartada' : i18n.language === 'ru' ? 'На карте' : 'On Map'}</h2>
          <div className="map-placeholder">
            <FaMapMarkerAlt />
            <p>{contactInfo.address}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contacts;

