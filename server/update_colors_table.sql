-- Расширение таблицы цветов для поддержки большего количества цветов
USE zok_website;

-- Увеличиваем размер колонки для поддержки rgba значений
ALTER TABLE site_colors MODIFY COLUMN color_value VARCHAR(50);

-- Добавляем дополнительные цвета, если их еще нет
INSERT INTO site_colors (color_key, color_value, description) VALUES
('text', '#333333', 'Цвет основного текста'),
('text_light', '#666666', 'Цвет светлого текста'),
('background', '#ffffff', 'Цвет фона'),
('header_bg', '#ffffff', 'Фон хедера'),
('header_text', '#333333', 'Текст хедера'),
('footer_bg', '#4d4125', 'Фон футера'),
('footer_text', '#ffffff', 'Текст футера'),
('button_bg', '#ccc180', 'Фон кнопок'),
('button_text', '#ffffff', 'Текст кнопок'),
('button_hover', '#b8a870', 'Кнопки при наведении'),
('link', '#4d4125', 'Цвет ссылок'),
('link_hover', '#ccc180', 'Ссылки при наведении'),
('border', '#e0e0e0', 'Цвет границ'),
('card_bg', '#ffffff', 'Фон карточек'),
('card_shadow', 'rgba(77, 65, 37, 0.1)', 'Тень карточек')
ON DUPLICATE KEY UPDATE description=VALUES(description);
