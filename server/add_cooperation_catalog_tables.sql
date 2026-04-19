-- Добавление таблиц для сотрудничества и каталога
USE zok_website;

-- Таблица заявок на сотрудничество
CREATE TABLE IF NOT EXISTS cooperation_requests (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    partner_type ENUM('shop', 'master', 'designer') DEFAULT 'shop',
    status ENUM('new', 'contacted', 'completed', 'rejected') DEFAULT 'new',
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Таблица каталогов
CREATE TABLE IF NOT EXISTS catalogs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL DEFAULT 'Каталог ZOK',
    file_url VARCHAR(500) NOT NULL,
    file_name VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

