-- Добавление таблицы цветов
USE zok_website;

CREATE TABLE IF NOT EXISTS site_colors (
    id INT AUTO_INCREMENT PRIMARY KEY,
    color_key VARCHAR(50) UNIQUE NOT NULL,
    color_value VARCHAR(7) NOT NULL,
    description VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Вставка цветов по умолчанию
INSERT INTO site_colors (color_key, color_value, description) VALUES
('primary', '#4d4125', 'Основной цвет сайта'),
('secondary', '#ccc180', 'Цвет кнопок и акцентов')
ON DUPLICATE KEY UPDATE color_value=VALUES(color_value), description=VALUES(description);

