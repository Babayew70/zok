

-- Обновление таблицы products для мультиязычности
USE zok_website;

-- Добавляем новые поля для 3 языков (ignore errors if columns exist)
ALTER TABLE products ADD COLUMN name_tm VARCHAR(255);
ALTER TABLE products ADD COLUMN name_en VARCHAR(255);
ALTER TABLE products ADD COLUMN description_tm TEXT;
ALTER TABLE products ADD COLUMN description_en TEXT;

-- Копируем существующие данные
UPDATE products SET name_tm = COALESCE(name, name_ru) WHERE name_tm IS NULL OR name_tm = '';
UPDATE products SET name_en = COALESCE(name, name_ru) WHERE name_en IS NULL OR name_en = '';
UPDATE products SET description_tm = COALESCE(description, description_ru) WHERE description_tm IS NULL OR description_tm = '';
UPDATE products SET description_en = COALESCE(description, description_ru) WHERE description_en IS NULL OR description_en = '';

-- Обновляем категории тоже
ALTER TABLE categories ADD COLUMN name_tm VARCHAR(255);
ALTER TABLE categories ADD COLUMN name_en VARCHAR(255);
ALTER TABLE categories ADD COLUMN description_tm TEXT;
ALTER TABLE categories ADD COLUMN description_en TEXT;

UPDATE categories SET name_tm = COALESCE(name, name_ru) WHERE name_tm IS NULL OR name_tm = '';
UPDATE categories SET name_en = COALESCE(name, name_ru) WHERE name_en IS NULL OR name_en = '';
