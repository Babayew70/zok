-- Дополнительные таблицы для сайта ZOK

-- Таблица баннеров
CREATE TABLE IF NOT EXISTS banners (
    id INT AUTO_INCREMENT PRIMARY KEY,
    image_url VARCHAR(500) NOT NULL,
    title_tm VARCHAR(255),
    title_ru VARCHAR(255),
    title_en VARCHAR(255),
    link VARCHAR(255),
    sort_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица портфолио
CREATE TABLE IF NOT EXISTS portfolio (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title_tm VARCHAR(255),
    title_ru VARCHAR(255),
    title_en VARCHAR(255),
    description_tm TEXT,
    description_ru TEXT,
    description_en TEXT,
    image_url VARCHAR(500),
    materials_used TEXT,
    sort_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица отзывов
CREATE TABLE IF NOT EXISTS reviews (
    id INT AUTO_INCREMENT PRIMARY KEY,
    author_name VARCHAR(100) NOT NULL,
    rating INT DEFAULT 5,
    text_content TEXT,
    photo_url VARCHAR(500),
    is_approved BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица цветовых схем
CREATE TABLE IF NOT EXISTS site_colors (
    id INT AUTO_INCREMENT PRIMARY KEY,
    color_key VARCHAR(50) NOT NULL,
    color_value VARCHAR(50) NOT NULL,
    theme VARCHAR(20) DEFAULT 'light',
    UNIQUE KEY (color_key, theme)
);

-- Таблица дополнительных языков
CREATE TABLE IF NOT EXISTS languages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    code VARCHAR(10) UNIQUE NOT NULL,
    name VARCHAR(50) NOT NULL,
    flag VARCHAR(10),
    is_system BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Начальные данные для языков
INSERT IGNORE INTO languages (code, name, flag, is_system) VALUES
('tm', 'Türkmen', '🇹🇲', TRUE),
('ru', 'Русский', '🇷🇺', TRUE),
('en', 'English', '🇬🇧', TRUE);
