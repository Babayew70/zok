-- Таблица для баннеров на главной странице
USE zok_website;

CREATE TABLE IF NOT EXISTS banners (
    id INT AUTO_INCREMENT PRIMARY KEY,
    image_url VARCHAR(500) NOT NULL,
    title_tm VARCHAR(255),
    title_ru VARCHAR(255),
    title_en VARCHAR(255),
    link VARCHAR(500),
    sort_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Добавляем тестовые баннеры
INSERT INTO banners (image_url, title_tm, title_ru, title_en, link, sort_order) VALUES
('https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=1200', 'Täze kolleksiýa', 'Новая коллекция', 'New Collection', '/products', 1),
('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200', 'Emulsiýalar', 'Эмульсии', 'Emulsions', '/products?category=1', 2),
('https://images.unsplash.com/photo-1615529328331-f8917597711f?w=1200', 'Dekoratiw materiallar', 'Декоративные материалы', 'Decorative Materials', '/products', 3);

