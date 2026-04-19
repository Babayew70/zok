import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';
import { FaPalette, FaAward, FaUsers, FaLeaf } from 'react-icons/fa';
import './About.css';

const About = () => {
  const { theme } = useTheme();
  const { t, i18n } = useTranslation();

  const getCompanyInfo = () => {
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

  const companyInfo = getCompanyInfo();

  const features = [
    {
      icon: <FaPalette />,
      title: i18n.language === 'tm' ? 'Premium hil' : i18n.language === 'ru' ? 'Премиум качество' : 'Premium Quality',
      description: i18n.language === 'tm' 
        ? 'Ýokary hilli materiallar we innowasiýa tehnologiýalary'
        : i18n.language === 'ru' 
        ? 'Высококачественные материалы и инновационные технологии'
        : 'High-quality materials and innovative technologies'
    },
    {
      icon: <FaAward />,
      title: i18n.language === 'tm' ? 'Tejribeli hünärmenler' : i18n.language === 'ru' ? 'Опытные специалисты' : 'Experienced Specialists',
      description: i18n.language === 'tm' 
        ? '10+ ýyllyk tejribe we müňlerçe kanagatly müşderi'
        : i18n.language === 'ru' 
        ? '10+ лет опыта и тысячи довольных клиентов'
        : '10+ years of experience and thousands of satisfied clients'
    },
    {
      icon: <FaUsers />,
      title: i18n.language === 'tm' ? 'Hyzmatdaşlyk' : i18n.language === 'ru' ? 'Партнерство' : 'Partnership',
      description: i18n.language === 'tm' 
        ? 'Dükanlara, ussalara we dizaýnerlere ýörite şertler'
        : i18n.language === 'ru' 
        ? 'Специальные условия для магазинов, мастеров и дизайнеров'
        : 'Special conditions for stores, masters and designers'
    },
    {
      icon: <FaLeaf />,
      title: i18n.language === 'tm' ? 'Ekologiýa taýdan arassa' : i18n.language === 'ru' ? 'Экологичность' : 'Eco-Friendly',
      description: i18n.language === 'tm' 
        ? 'Howpsuz we ekologiýa taýdan arassa materiallar'
        : i18n.language === 'ru' 
        ? 'Безопасные и экологически чистые материалы'
        : 'Safe and eco-friendly materials'
    }
  ];

  return (
    <div className={`about-page ${theme}`}>
      <div className="about-hero">
        <div className="about-hero-content">
          <h1>{t('about.title')}</h1>
          <p className="about-subtitle">{t('about.description')}</p>
        </div>
      </div>

      <section className="about-info">
        <div className="container">
          <div className="company-details">
            <div className="company-card">
              <h2>{companyInfo.manufacturer}</h2>
              <p className="address">{companyInfo.address}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="about-features">
        <div className="container">
          <div className="features-grid">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className={`feature-card ${theme}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="about-contact">
        <div className="container">
          <h2>{t('footer.contacts')}</h2>
          <div className="contact-grid">
            <div className="contact-card">
              <strong>Telefon:</strong>
              <a href="tel:+99363211003">(+993) 63 21-10-03</a>
            </div>
            <div className="contact-card">
              <strong>Instagram:</strong>
              <a href="https://instagram.com/zokdekor.lb" target="_blank" rel="noopener noreferrer">
                ZOK Dekor.lb
              </a>
            </div>
            <div className="contact-card">
              <strong>TikTok:</strong>
              <a href="https://tiktok.com/@zokdekor.lb" target="_blank" rel="noopener noreferrer">
                ZOK Dekor.lb
              </a>
            </div>
            <div className="contact-card">
              <strong>G-mail:</strong>
              <a href="mailto:zeynepjumakulyyewa@gmail.com">zeynepjumakulyyewa@gmail.com</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;

