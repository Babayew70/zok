-- Создание базы данных
CREATE DATABASE IF NOT EXISTS zok_website;
USE zok_website;

-- Таблица категорий продуктов
CREATE TABLE IF NOT EXISTS categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    name_tm VARCHAR(100),
    name_ru VARCHAR(100) NOT NULL,
    name_en VARCHAR(100),
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица продуктов
CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category_id INT,
    name VARCHAR(200) NOT NULL,
    name_ru VARCHAR(200) NOT NULL,
    description TEXT,
    description_ru TEXT,
    price DECIMAL(10, 2),
    image_url VARCHAR(500),
    color VARCHAR(50),
    volume VARCHAR(50),
    in_stock BOOLEAN DEFAULT TRUE,
    featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
);

-- Таблица администраторов
CREATE TABLE IF NOT EXISTS admins (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица заказов
CREATE TABLE IF NOT EXISTS orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT,
    customer_name VARCHAR(150) NOT NULL,
    customer_email VARCHAR(150),
    customer_phone VARCHAR(50),
    customer_address TEXT,
    quantity INT DEFAULT 1,
    notes TEXT,
    total_price DECIMAL(10, 2),
    status VARCHAR(30) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE SET NULL
);

-- Таблица настроек SMTP
CREATE TABLE IF NOT EXISTS smtp_settings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    host VARCHAR(200),
    port INT,
    secure BOOLEAN DEFAULT FALSE,
    user VARCHAR(150),
    password VARCHAR(255),
    from_email VARCHAR(150),
    from_name VARCHAR(150),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Вставка начальных категорий
INSERT INTO categories (name, name_ru) VALUES
('Emulsions', 'Эмульсии'),
('Travertines', 'Траверсы'),
('Attochmento', 'Аттохенто'),
('Lacquers', 'Лаки'),
('Decorative Putties', 'Декоративные шпаклевки');

-- Создание администратора по умолчанию (пароль: admin123)
-- Хеш пароля сгенерирован через bcrypt
INSERT INTO admins (username, email, password) VALUES
('admin', 'admin@zok.com', '$2a$10$zd7FoqDG3ZrdXY6.dQ2Bcu8w5gEiU30JOsT/GHtdc2RQrvZ2d5jcy');

