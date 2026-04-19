const express = require('express');
const router = express.Router();
const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');

// Проверка, что ошибка из-за недоступности БД
function isDbUnavailable(err) {
  const code = err.code || '';
  const msg = (err.message || '').toLowerCase();
  return (
    code === 'ECONNREFUSED' ||
    code === 'ETIMEDOUT' ||
    code === 'ER_ACCESS_DENIED_ERROR' ||
    code === 'ER_BAD_DB_ERROR' ||
    code === 'PROTOCOL_CONNECTION_LOST' ||
    msg.includes('connect econnrefused') ||
    msg.includes('access denied') ||
    msg.includes('unknown database')
  );
}

// Дефолтные языки (если БД недоступна)
const DEFAULT_LANGUAGES = [
  { code: 'tm', name: 'Türkmen', flag: '🇹🇲', is_system: true },
  { code: 'ru', name: 'Русский', flag: '🇷🇺', is_system: true },
  { code: 'en', name: 'English', flag: '🇬🇧', is_system: true }

];

// Дефолтные цвета по темам (если БД недоступна)
const DEFAULT_COLORS_LIGHT = {
  primary: '#4c4024',
  secondary: '#cabf7e',
  text: '#333333',
  text_light: '#666666',
  background: '#ffffff',
  header_bg: '#ffffff',
  header_text: '#4c4024',
  footer_bg: '#4c4024',
  footer_text: '#ffffff',
  button_bg: '#cabf7e',
  button_text: '#4c4024',
  button_hover: '#b8a870',
  link: '#4c4024',
  link_hover: '#cabf7e',
  border: '#e0e0e0',
  card_bg: '#ffffff',
  card_shadow: 'rgba(76, 64, 36, 0.1)'
};
const DEFAULT_COLORS_DARK = {
  primary: '#cabf7e',
  secondary: '#4c4024',
  text: '#e0e0e0',
  text_light: '#b0b0b0',
  background: '#4c4024',
  header_bg: '#3d3820',
  header_text: '#cabf7e',
  footer_bg: '#3d3820',
  footer_text: '#cabf7e',
  button_bg: '#cabf7e',
  button_text: '#4c4024',
  button_hover: '#b8a870',
  link: '#cabf7e',
  link_hover: '#e0e0e0',
  border: '#5a5030',
  card_bg: '#3d3820',
  card_shadow: 'rgba(0, 0, 0, 0.3)'
};

// Логин администратора
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    const [admins] = await db.query('SELECT * FROM admins WHERE username = ?', [username]);

    if (admins.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const admin = admins[0];
    const isValidPassword = await bcrypt.compare(password, admin.password);

    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: admin.id, username: admin.username },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({ token, admin: { id: admin.id, username: admin.username, email: admin.email } });
  } catch (error) {
    console.error('[admin login]', error.message);
    if (isDbUnavailable(error)) {
      return res.status(503).json({
        error: 'База данных недоступна. Запустите MySQL и выполните: mysql -u root -p < server/database_full.sql'
      });
    }
    res.status(500).json({ error: error.message });
  }
});

// Создать продукт
router.post('/products', auth, async (req, res) => {
  try {
    const { category_id, name_tm, name_ru, name_en, description_tm, description_ru, description_en, price, image_url, color, volume, in_stock, featured } = req.body;

    const [result] = await db.query(
      `INSERT INTO products (category_id, name_tm, name_ru, name_en, description_tm, description_ru, description_en, price, image_url, color, volume, in_stock, featured) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [category_id, name_tm || '', name_ru || '', name_en || '', description_tm || '', description_ru || '', description_en || '', price, image_url, color, volume, in_stock || true, featured || false]
    );
    res.json({ id: result.insertId, message: 'Product created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Обновить продукт
router.put('/products/:id', auth, async (req, res) => {
  try {
    const { category_id, name_tm, name_ru, name_en, description_tm, description_ru, description_en, price, image_url, color, volume, in_stock, featured } = req.body;

    await db.query(
      `UPDATE products SET category_id = ?, name_tm = ?, name_ru = ?, name_en = ?, description_tm = ?, description_ru = ?, description_en = ?, price = ?, image_url = ?, color = ?, volume = ?, in_stock = ?, featured = ? WHERE id = ?`,
      [category_id, name_tm || '', name_ru || '', name_en || '', description_tm || '', description_ru || '', description_en || '', price, image_url, color, volume, in_stock, featured, req.params.id]
    );

    res.json({ message: 'Product updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Удалить продукт
router.delete('/products/:id', auth, async (req, res) => {
  try {
    await db.query('DELETE FROM products WHERE id = ?', [req.params.id]);
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Получить все продукты (для админки)
router.get('/products', auth, async (req, res) => {
  try {
    const [products] = await db.query(`
      SELECT p.*, c.name_ru as category_name 
      FROM products p 
      LEFT JOIN categories c ON p.category_id = c.id 
      ORDER BY p.created_at DESC
    `);
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Получить все категории (для админки)
router.get('/categories', auth, async (req, res) => {
  try {
    const [categories] = await db.query('SELECT * FROM categories ORDER BY name_ru');
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Создать категорию
router.post('/categories', auth, async (req, res) => {
  try {
    const { name, name_tm, name_ru, name_en, description } = req.body;
    const [result] = await db.query(
      'INSERT INTO categories (name, name_tm, name_ru, name_en, description) VALUES (?, ?, ?, ?, ?)',
      [name, name_tm || '', name_ru || '', name_en || '', description]
    );
    res.json({ id: result.insertId, message: 'Category created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Обновить категорию
router.put('/categories/:id', auth, async (req, res) => {
  try {
    const { name, name_tm, name_ru, name_en, description } = req.body;
    await db.query(
      'UPDATE categories SET name = ?, name_tm = ?, name_ru = ?, name_en = ?, description = ? WHERE id = ?',
      [name, name_tm || '', name_ru || '', name_en || '', description, req.params.id]
    );
    res.json({ message: 'Category updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Удалить категорию
router.delete('/categories/:id', auth, async (req, res) => {
  try {
    await db.query('DELETE FROM categories WHERE id = ?', [req.params.id]);
    res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Получить все заказы
router.get('/orders', auth, async (req, res) => {
  try {
    const [orders] = await db.query(
      `SELECT o.*, p.name_ru AS product_name 
       FROM orders o 
       LEFT JOIN products p ON o.product_id = p.id 
       ORDER BY o.created_at DESC`
    );
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Обновить статус заказа
router.put('/orders/:id/status', auth, async (req, res) => {
  try {
    const { status } = req.body;
    await db.query('UPDATE orders SET status = ? WHERE id = ?', [status, req.params.id]);
    res.json({ message: 'Order status updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Получить настройки SMTP
router.get('/smtp', auth, async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM smtp_settings ORDER BY id LIMIT 1');
    if (rows.length === 0) {
      return res.json(null);
    }
    const settings = rows[0];
    // Не возвращаем пароль в UI
    delete settings.password;
    res.json(settings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Обновить настройки SMTP
router.put('/smtp', auth, async (req, res) => {
  try {
    const { host, port, secure, user, password, from_email, from_name } = req.body;

    // Проверяем, есть ли уже запись
    const [rows] = await db.query('SELECT id FROM smtp_settings ORDER BY id LIMIT 1');

    if (rows.length === 0) {
      await db.query(
        `INSERT INTO smtp_settings (host, port, secure, user, password, from_email, from_name)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [host, port, !!secure, user, password || '', from_email, from_name]
      );
    } else {
      const id = rows[0].id;
      // Если пароль не передан, не обновляем его
      if (password) {
        await db.query(
          `UPDATE smtp_settings 
           SET host = ?, port = ?, secure = ?, user = ?, password = ?, from_email = ?, from_name = ?
           WHERE id = ?`,
          [host, port, !!secure, user, password, from_email, from_name, id]
        );
      } else {
        await db.query(
          `UPDATE smtp_settings 
           SET host = ?, port = ?, secure = ?, user = ?, from_email = ?, from_name = ?
           WHERE id = ?`,
          [host, port, !!secure, user, from_email, from_name, id]
        );
      }
    }

    res.json({ message: 'SMTP settings saved successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Получить все языки
router.get('/languages', async (req, res) => {
  try {
    const [languages] = await db.query('SELECT * FROM languages ORDER BY is_system DESC, name ASC');
    res.json(languages);
  } catch (error) {
    console.error('[admin languages]', error.message);
    if (isDbUnavailable(error)) {
      return res.json(DEFAULT_LANGUAGES);
    }
    res.status(500).json({ error: error.message });
  }
});
router.post('/languages', auth, async (req, res) => {
  try {
    const { code, name, flag } = req.body;

    if (!code || !name) {
      return res.status(400).json({ error: 'Code and name are required' });
    }

    const [result] = await db.query(
      'INSERT INTO languages (code, name, flag) VALUES (?, ?, ?)',
      [code.toLowerCase(), name, flag || '🏳️']
    );

    res.json({ id: result.insertId, message: 'Language added successfully' });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ error: 'Language code already exists' });
    }
    res.status(500).json({ error: error.message });
  }
});

// Удалить язык
router.delete('/languages/:code', auth, async (req, res) => {
  try {
    const { code } = req.params;

    // Проверяем, не является ли язык системным
    const [languages] = await db.query('SELECT is_system FROM languages WHERE code = ?', [code]);

    if (languages.length === 0) {
      return res.status(404).json({ error: 'Language not found' });
    }

    if (languages[0].is_system) {
      return res.status(400).json({ error: 'Cannot delete system language' });
    }

    await db.query('DELETE FROM languages WHERE code = ?', [code]);
    res.json({ message: 'Language deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Получить все цвета
router.get('/colors', async (req, res) => {
  try {
    const { theme = 'light' } = req.query;
    const [colors] = await db.query(
      'SELECT * FROM site_colors WHERE theme = ? ORDER BY id',
      [theme]
    );
    const colorsObj = {};
    colors.forEach(color => {
      colorsObj[color.color_key] = color.color_value;
    });
    res.json(colorsObj);
  } catch (error) {
    console.error('[admin colors]', error.message);
    if (isDbUnavailable(error)) {
      const defaults = (req.query.theme === 'dark') ? DEFAULT_COLORS_DARK : DEFAULT_COLORS_LIGHT;
      return res.json(defaults);
    }
    res.status(500).json({ error: error.message });
  }
});
router.put('/colors', auth, async (req, res) => {
  try {
    const { colors, theme = 'light' } = req.body;

    if (!colors) {
      return res.status(400).json({ error: 'Colors object is required' });
    }

    for (const [key, value] of Object.entries(colors)) {
      await db.query(
        'INSERT INTO site_colors (color_key, color_value, theme) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE color_value = ?',
        [key, value, theme, value]
      );
    }

    res.json({ message: 'Colors updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Тест SMTP
router.post('/smtp/test', auth, async (req, res) => {
  try {
    const nodemailer = require('nodemailer');
    const [settings] = await db.query('SELECT * FROM smtp_settings LIMIT 1');

    if (settings.length === 0) {
      return res.status(400).json({ error: 'SMTP settings not configured' });
    }

    const smtp = settings[0];
    const transporter = nodemailer.createTransport({
      host: smtp.host,
      port: smtp.port,
      secure: smtp.secure,
      auth: {
        user: smtp.user,
        pass: smtp.password
      }
    });

    await transporter.verify();

    // Отправляем тестовое письмо
    await transporter.sendMail({
      from: `"${smtp.from_name}" <${smtp.from_email}>`,
      to: smtp.from_email,
      subject: 'Test Email from ZOK Admin Panel',
      text: 'This is a test email to verify SMTP configuration.',
      html: '<p>This is a test email to verify SMTP configuration.</p>'
    });

    res.json({ message: 'Test email sent successfully!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Баннеры: получить все (image_url всегда с путём /uploads/banners/ для отображения)
router.get('/banners', async (req, res) => {
  try {
    const [banners] = await db.query('SELECT * FROM banners WHERE is_active = TRUE ORDER BY sort_order ASC');
    const normalize = (b) => {
      const u = b.image_url || '';
      const um = b.image_url_mobile || '';
      return { 
        ...b, 
        image_url: u.startsWith('/') ? u : `/uploads/banners/${u}`,
        image_url_mobile: um.startsWith('/') ? um : um ? `/uploads/banners/${um}` : ''
      };
    };
    res.json(banners.map(normalize));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Баннеры: создать
router.post('/banners', auth, async (req, res) => {
  try {
    const { image_url, image_url_mobile, title_tm, title_ru, title_en, link, sort_order, is_active } = req.body;
    const [result] = await db.query(
      'INSERT INTO banners (image_url, image_url_mobile, title_tm, title_ru, title_en, link, sort_order, is_active) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [image_url, image_url_mobile || '', title_tm || '', title_ru || '', title_en || '', link || '', sort_order || 0, is_active !== undefined ? is_active : true]
    );
    res.json({ id: result.insertId, message: 'Banner created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Баннеры: обновить
router.put('/banners/:id', auth, async (req, res) => {
  try {
    const { image_url, image_url_mobile, title_tm, title_ru, title_en, link, sort_order, is_active } = req.body;
    await db.query(
      'UPDATE banners SET image_url = ?, image_url_mobile = ?, title_tm = ?, title_ru = ?, title_en = ?, link = ?, sort_order = ?, is_active = ? WHERE id = ?',
      [image_url, image_url_mobile || '', title_tm || '', title_ru || '', title_en || '', link || '', sort_order || 0, is_active !== undefined ? is_active : true, req.params.id]
    );
    res.json({ message: 'Banner updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Баннеры: удалить
router.delete('/banners/:id', auth, async (req, res) => {
  try {
    await db.query('DELETE FROM banners WHERE id = ?', [req.params.id]);
    res.json({ message: 'Banner deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ========== PORTFOLIO ==========

// Получить все портфолио (для админки)
router.get('/portfolio', auth, async (req, res) => {
  try {
    const [items] = await db.query('SELECT * FROM portfolio ORDER BY sort_order ASC, created_at DESC');
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Создать портфолио
router.post('/portfolio', auth, async (req, res) => {
  try {
    const { title_tm, title_ru, title_en, description_tm, description_ru, description_en, image_url, materials_used, is_active, sort_order } = req.body;
    const [result] = await db.query(
      'INSERT INTO portfolio (title_tm, title_ru, title_en, description_tm, description_ru, description_en, image_url, materials_used, is_active, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [title_tm || '', title_ru || '', title_en || '', description_tm || '', description_ru || '', description_en || '', image_url || '', materials_used || '', is_active !== undefined ? is_active : true, sort_order || 0]
    );
    res.json({ id: result.insertId, message: 'Portfolio item created' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Обновить портфолио
router.put('/portfolio/:id', auth, async (req, res) => {
  try {
    const { title_tm, title_ru, title_en, description_tm, description_ru, description_en, image_url, materials_used, is_active, sort_order } = req.body;
    await db.query(
      'UPDATE portfolio SET title_tm = ?, title_ru = ?, title_en = ?, description_tm = ?, description_ru = ?, description_en = ?, image_url = ?, materials_used = ?, is_active = ?, sort_order = ? WHERE id = ?',
      [title_tm || '', title_ru || '', title_en || '', description_tm || '', description_ru || '', description_en || '', image_url || '', materials_used || '', is_active, sort_order || 0, req.params.id]
    );
    res.json({ message: 'Portfolio item updated' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Удалить портфолио
router.delete('/portfolio/:id', auth, async (req, res) => {
  try {
    await db.query('DELETE FROM portfolio WHERE id = ?', [req.params.id]);
    res.json({ message: 'Portfolio item deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ========== REVIEWS ==========

// Получить все отзывы (для админки — и одобренные, и нет)
router.get('/reviews', auth, async (req, res) => {
  try {
    const [reviews] = await db.query('SELECT * FROM reviews ORDER BY created_at DESC');
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Одобрить/отклонить отзыв
router.put('/reviews/:id/approve', auth, async (req, res) => {
  try {
    const { is_approved } = req.body;
    await db.query('UPDATE reviews SET is_approved = ? WHERE id = ?', [!!is_approved, req.params.id]);
    res.json({ message: is_approved ? 'Review approved' : 'Review rejected' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Удалить отзыв
router.delete('/reviews/:id', auth, async (req, res) => {
  try {
    await db.query('DELETE FROM reviews WHERE id = ?', [req.params.id]);
    res.json({ message: 'Review deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

