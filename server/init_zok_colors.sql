-- Инициализация цветов ZOK по ТЗ
USE zok_website;

-- Очистка существующих цветов
DELETE FROM site_colors;

-- Light Theme (светлая тема)
INSERT INTO site_colors (color_key, color_value, description, theme) VALUES
('primary', '#4c4024', 'Основной цвет', 'light'),
('secondary', '#cabf7e', 'Акцентный цвет', 'light'),
('text', '#333333', 'Цвет текста', 'light'),
('text_light', '#666666', 'Светлый текст', 'light'),
('background', '#ffffff', 'Фон страницы', 'light'),
('header_bg', '#ffffff', 'Фон хедера', 'light'),
('header_text', '#4c4024', 'Текст хедера', 'light'),
('footer_bg', '#4c4024', 'Фон футера', 'light'),
('footer_text', '#ffffff', 'Текст футера', 'light'),
('button_bg', '#cabf7e', 'Фон кнопок', 'light'),
('button_text', '#4c4024', 'Текст кнопок', 'light'),
('button_hover', '#b8a870', 'Кнопки при наведении', 'light'),
('link', '#4c4024', 'Цвет ссылок', 'light'),
('link_hover', '#cabf7e', 'Ссылки при наведении', 'light'),
('border', '#e0e0e0', 'Цвет границ', 'light'),
('card_bg', '#ffffff', 'Фон карточек', 'light'),
('card_shadow', 'rgba(76, 64, 36, 0.1)', 'Тень карточек', 'light');

-- Dark Theme (темная тема)
INSERT INTO site_colors (color_key, color_value, description, theme) VALUES
('primary', '#cabf7e', 'Основной цвет', 'dark'),
('secondary', '#4c4024', 'Акцентный цвет', 'dark'),
('text', '#e0e0e0', 'Цвет текста', 'dark'),
('text_light', '#b0b0b0', 'Светлый текст', 'dark'),
('background', '#4c4024', 'Фон страницы', 'dark'),
('header_bg', '#3d3820', 'Фон хедера', 'dark'),
('header_text', '#cabf7e', 'Текст хедера', 'dark'),
('footer_bg', '#3d3820', 'Фон футера', 'dark'),
('footer_text', '#cabf7e', 'Текст футера', 'dark'),
('button_bg', '#cabf7e', 'Фон кнопок', 'dark'),
('button_text', '#4c4024', 'Текст кнопок', 'dark'),
('button_hover', '#b8a870', 'Кнопки при наведении', 'dark'),
('link', '#cabf7e', 'Цвет ссылок', 'dark'),
('link_hover', '#e0e0e0', 'Ссылки при наведении', 'dark'),
('border', '#5a5030', 'Цвет границ', 'dark'),
('card_bg', '#3d3820', 'Фон карточек', 'dark'),
('card_shadow', 'rgba(0, 0, 0, 0.3)', 'Тень карточек', 'dark');

