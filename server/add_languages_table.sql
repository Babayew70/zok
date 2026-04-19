-- Добавление таблицы языков
USE zok_website;

CREATE TABLE IF NOT EXISTS languages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    code VARCHAR(10) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    flag VARCHAR(10) DEFAULT '🏳️',
    is_system BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Вставка базовых языков
INSERT INTO languages (code, name, flag, is_system) VALUES
('ru', 'Русский', '🇷🇺', TRUE),
('en', 'English', '🇬🇧', TRUE)
ON DUPLICATE KEY UPDATE name=VALUES(name), flag=VALUES(flag);

