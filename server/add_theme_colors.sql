-- Добавление цветов для разных тем
USE zok_website;

-- Добавляем поле theme в таблицу site_colors (если его еще нет)
-- Проверяем существование колонки через информацию о схеме
SET @col_exists = 0;
SELECT COUNT(*) INTO @col_exists
FROM information_schema.COLUMNS
WHERE TABLE_SCHEMA = 'zok_website'
  AND TABLE_NAME = 'site_colors'
  AND COLUMN_NAME = 'theme';

SET @sql = IF(@col_exists = 0,
  'ALTER TABLE site_colors ADD COLUMN theme VARCHAR(10) DEFAULT ''light''',
  'SELECT ''Column theme already exists'' AS message');
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- Обновляем существующие записи, чтобы они были для light темы
UPDATE site_colors SET theme = 'light' WHERE theme IS NULL OR theme = '';

-- Добавляем цвета для dark темы
INSERT INTO site_colors (color_key, color_value, description, theme) VALUES
('primary', '#4d4125', 'Основной цвет сайта', 'dark'),
('secondary', '#ccc180', 'Цвет кнопок и акцентов', 'dark'),
('text', '#e0e0e0', 'Цвет основного текста', 'dark'),
('text_light', '#b0b0b0', 'Цвет светлого текста', 'dark'),
('background', '#1a1a1a', 'Цвет фона', 'dark'),
('header_bg', '#2d2d2d', 'Фон хедера', 'dark'),
('header_text', '#e0e0e0', 'Текст хедера', 'dark'),
('footer_bg', '#4d4125', 'Фон футера', 'dark'),
('footer_text', '#ffffff', 'Текст футера', 'dark'),
('button_bg', '#ccc180', 'Фон кнопок', 'dark'),
('button_text', '#ffffff', 'Текст кнопок', 'dark'),
('button_hover', '#b8a870', 'Кнопки при наведении', 'dark'),
('link', '#ccc180', 'Цвет ссылок', 'dark'),
('link_hover', '#e0e0e0', 'Ссылки при наведении', 'dark'),
('border', '#404040', 'Цвет границ', 'dark'),
('card_bg', '#2d2d2d', 'Фон карточек', 'dark'),
('card_shadow', 'rgba(0, 0, 0, 0.5)', 'Тень карточек', 'dark')
ON DUPLICATE KEY UPDATE color_value=VALUES(color_value), description=VALUES(description);
