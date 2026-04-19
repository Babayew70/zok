import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useTheme } from './ThemeContext';
import API_URL from '../config';

const ColorContext = createContext();

export const useColors = () => {
  const context = useContext(ColorContext);
  if (!context) {
    throw new Error('useColors must be used within ColorProvider');
  }
  return context;
};

// Цвета по умолчанию для ZOK (светлая тема)
const defaultColorsLight = {
  primary: '#4c4024',
  secondary: '#cabf7e',
  text: '#333333',
  text_light: '#666666',
  background: '#ffffff',
  header_bg: '#ffffff',
  header_text: '#4c4024',
  footer_bg: '#4c4024',
  footer_text: '#ffffff',
  button_bg: '#cabf7e',
  button_text: '#4c4024',
  button_hover: '#b8a870',
  link: '#4c4024',
  link_hover: '#cabf7e',
  border: '#e0e0e0',
  card_bg: '#ffffff',
  card_shadow: 'rgba(76, 64, 36, 0.1)'
};

// Цвета по умолчанию для ZOK (темная тема)
const defaultColorsDark = {
  primary: '#cabf7e',
  secondary: '#4c4024',
  text: '#e0e0e0',
  text_light: '#b0b0b0',
  background: '#4c4024',
  header_bg: '#3d3820',
  header_text: '#cabf7e',
  footer_bg: '#3d3820',
  footer_text: '#cabf7e',
  button_bg: '#cabf7e',
  button_text: '#4c4024',
  button_hover: '#b8a870',
  link: '#cabf7e',
  link_hover: '#e0e0e0',
  border: '#5a5030',
  card_bg: '#3d3820',
  card_shadow: 'rgba(0, 0, 0, 0.3)'
};

// Получить дефолтные цвета для текущей темы
const getDefaultColors = (theme) => {
  return theme === 'dark' ? defaultColorsDark : defaultColorsLight;
};

export const ColorProvider = ({ children }) => {
  const { theme } = useTheme();
  const defaultColors = getDefaultColors(theme);

  const [colors, setColors] = useState(() => {
    const saved = localStorage.getItem(`siteColors_${theme}`);
    return saved ? JSON.parse(saved) : defaultColors;
  });

  const [loading, setLoading] = useState(true);

  // Загрузка цветов с сервера для текущей темы
  useEffect(() => {
    const currentDefaults = getDefaultColors(theme);

    const fetchColors = async () => {
      try {
        const response = await axios.get(`${API_URL}/admin/colors?theme=${theme}`);
        const fetchedColors = response.data;
        // Объединяем с дефолтными цветами для полноты
        const mergedColors = { ...currentDefaults, ...fetchedColors };
        setColors(mergedColors);
        localStorage.setItem(`siteColors_${theme}`, JSON.stringify(mergedColors));
        applyColors(mergedColors, theme);
      } catch (error) {
        console.error('Error fetching colors:', error);
        const saved = localStorage.getItem(`siteColors_${theme}`);
        if (saved) {
          const savedColors = JSON.parse(saved);
          setColors(savedColors);
          applyColors(savedColors, theme);
        } else {
          setColors(currentDefaults);
          applyColors(currentDefaults, theme);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchColors();
  }, [theme]);

  // Применение цветов через CSS переменные
  const applyColors = (colorsToApply, currentTheme = 'light') => {
    const root = document.documentElement;
    const defaults = getDefaultColors(currentTheme);
    const colors = { ...defaults, ...colorsToApply };

    // Применяем все цвета
    root.style.setProperty('--color-primary', colors.primary || defaults.primary);
    root.style.setProperty('--color-secondary', colors.secondary || defaults.secondary);
    root.style.setProperty('--color-text', colors.text || defaults.text);
    root.style.setProperty('--color-text-light', colors.text_light || defaults.text_light);
    root.style.setProperty('--color-background', colors.background || defaults.background);
    root.style.setProperty('--color-header-bg', colors.header_bg || defaults.header_bg);
    root.style.setProperty('--color-header-text', colors.header_text || defaults.header_text);
    root.style.setProperty('--color-footer-bg', colors.footer_bg || defaults.footer_bg);
    root.style.setProperty('--color-footer-text', colors.footer_text || defaults.footer_text);
    root.style.setProperty('--color-button-bg', colors.button_bg || defaults.button_bg);
    root.style.setProperty('--color-button-text', colors.button_text || defaults.button_text);
    root.style.setProperty('--color-button-hover', colors.button_hover || defaults.button_hover);
    root.style.setProperty('--color-link', colors.link || defaults.link);
    root.style.setProperty('--color-link-hover', colors.link_hover || defaults.link_hover);
    root.style.setProperty('--color-border', colors.border || defaults.border);
    root.style.setProperty('--color-card-bg', colors.card_bg || defaults.card_bg);
    root.style.setProperty('--color-card-shadow', colors.card_shadow || defaults.card_shadow);
  };

  // Обновление цветов
  const updateColors = async (newColors, themeToUpdate = null) => {
    try {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        throw new Error('Not authenticated');
      }

      const targetTheme = themeToUpdate || theme;
      const targetDefaults = getDefaultColors(targetTheme);

      await axios.put(
        `${API_URL}/admin/colors`,
        { colors: newColors, theme: targetTheme },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      // Объединяем с дефолтными цветами для полноты
      const mergedColors = { ...targetDefaults, ...newColors };

      // Если обновляем цвета для текущей темы, применяем их сразу
      if (targetTheme === theme) {
        setColors(mergedColors);
        localStorage.setItem(`siteColors_${theme}`, JSON.stringify(mergedColors));
        applyColors(mergedColors, theme);
      } else {
        // Сохраняем для другой темы
        localStorage.setItem(`siteColors_${targetTheme}`, JSON.stringify(mergedColors));
      }
    } catch (error) {
      console.error('Error updating colors:', error);
      throw error;
    }
  };

  // Применяем цвета при изменении
  useEffect(() => {
    applyColors(colors, theme);
  }, [colors, theme]);

  return (
    <ColorContext.Provider value={{
      colors,
      updateColors,
      loading
    }}>
      {children}
    </ColorContext.Provider>
  );
};

