import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import API_URL from '../config';
import i18n from '../i18n';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};

// Доступные языки по умолчанию
const defaultLanguages = {
  tm: { code: 'tm', name: 'Türkmen', flag: '🇹🇲' },
  ru: { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  en: { code: 'en', name: 'English', flag: '🇬🇧' }
};

export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState(() => {
    const saved = localStorage.getItem('language');
    return saved || 'ru';
  });

  const [languages, setLanguages] = useState(() => {
    const saved = localStorage.getItem('availableLanguages');
    return saved ? JSON.parse(saved) : defaultLanguages;
  });

  const [loading, setLoading] = useState(true);

  // Загрузка языков с сервера
  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const response = await axios.get(`${API_URL}/admin/languages`);
        const languagesArray = response.data;

        if (languagesArray && languagesArray.length > 0) {
          const languagesObj = {};
          languagesArray.forEach(lang => {
            languagesObj[lang.code] = {
              code: lang.code,
              name: lang.name,
              flag: lang.flag || '🏳️'
            };
          });

          setLanguages(languagesObj);
          localStorage.setItem('availableLanguages', JSON.stringify(languagesObj));
        }
      } catch (error) {
        console.error('Error fetching languages:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLanguages();
  }, []);

  useEffect(() => {
    localStorage.setItem('language', currentLanguage);
    if (i18n && i18n.language !== currentLanguage) {
      i18n.changeLanguage(currentLanguage);
    }
  }, [currentLanguage]);

  const addLanguage = async (code, name, flag) => {
    try {
      const token = localStorage.getItem('adminToken');
      if (token) {
        await axios.post(
          `${API_URL}/admin/languages`,
          { code, name, flag },
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );
      }

      const updatedLanguages = {
        ...languages,
        [code]: { code, name, flag }
      };
      setLanguages(updatedLanguages);
      localStorage.setItem('availableLanguages', JSON.stringify(updatedLanguages));
    } catch (error) {
      console.error('Error adding language:', error);
      throw error;
    }
  };

  const removeLanguage = async (code) => {
    if (code === 'ru' || code === 'en' || code === 'tm') {
      return;
    }

    try {
      const token = localStorage.getItem('adminToken');
      if (token) {
        await axios.delete(`${API_URL}/admin/languages/${code}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }

      const newLanguages = { ...languages };
      delete newLanguages[code];
      setLanguages(newLanguages);
      localStorage.setItem('availableLanguages', JSON.stringify(newLanguages));

      if (currentLanguage === code) {
        setCurrentLanguage('ru');
      }
    } catch (error) {
      console.error('Error removing language:', error);
      throw error;
    }
  };

  const changeLanguage = (code) => {
    if (languages[code]) {
      setCurrentLanguage(code);
    }
  };

  return (
    <LanguageContext.Provider value={{
      currentLanguage,
      languages: Object.values(languages),
      changeLanguage,
      addLanguage,
      removeLanguage,
      loading
    }}>
      {children}
    </LanguageContext.Provider>
  );
};
