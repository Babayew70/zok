-- Portfolio / Gallery
CREATE TABLE IF NOT EXISTS portfolio (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title_tm VARCHAR(255),
  title_ru VARCHAR(255),
  title_en VARCHAR(255),
  description_tm TEXT,
  description_ru TEXT,
  description_en TEXT,
  image_url VARCHAR(500),
  materials_used VARCHAR(500),
  is_active BOOLEAN DEFAULT TRUE,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Reviews / Testimonials
CREATE TABLE IF NOT EXISTS reviews (
  id INT AUTO_INCREMENT PRIMARY KEY,
  author_name VARCHAR(255) NOT NULL,
  rating TINYINT NOT NULL DEFAULT 5,
  text_content TEXT NOT NULL,
  photo_url VARCHAR(500),
  is_approved BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample portfolio items
INSERT INTO portfolio (title_ru, title_tm, title_en, description_ru, description_tm, description_en, image_url, materials_used) VALUES
('Квартира в Ашхабаде', 'Aşgabatdaky jaý', 'Apartment in Ashgabat', 'Полная отделка декоративными материалами ZOK.', 'ZOK bezeg materiallary bilen doly bezeg.', 'Full decoration with ZOK materials.', '/uploads/portfolio/project1.jpg', 'Травертин, Эмульсия'),
('Офис компании', 'Kompaniýanyň ofisi', 'Company Office', 'Современный дизайн стен с использованием Аттохенто.', 'Attohento ulanyp häzirki zaman diwar dizaýny.', 'Modern wall design using Ottocento.', '/uploads/portfolio/project2.jpg', 'Аттохенто, Лак'),
('Загородный дом', 'Şäherden daşary öý', 'Country House', 'Отделка гостиной и спальни.', 'Myhmanhana we ýatylýan otagyň bezegi.', 'Living room and bedroom decoration.', '/uploads/portfolio/project3.jpg', 'Эмульсия, Шпаклёвка');
