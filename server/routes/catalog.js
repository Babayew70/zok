const express = require('express');
const router = express.Router();
const db = require('../config/db');
const auth = require('../middleware/auth');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Создать таблицу catalogs если не существует
const initCatalogsTable = async () => {
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS catalogs (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL DEFAULT 'Каталог ZOK',
        file_url VARCHAR(500) NOT NULL,
        file_name VARCHAR(255),
        is_active BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
    console.log('[Catalog] Table catalogs ready');
  } catch (error) {
    console.error('[Catalog] Error creating table:', error.message);
  }
};

// Инициализировать таблицу при запуске модуля
initCatalogsTable();

// Настройка хранилища для загрузки файлов
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../uploads/catalog');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'catalog-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed'), false);
    }
  },
  limits: {
    fileSize: 50 * 1024 * 1024 // 50MB max
  }
});

// Получить текущий каталог
router.get('/', async (req, res) => {
  try {
    const [catalogs] = await db.query(
      'SELECT * FROM catalogs WHERE is_active = TRUE ORDER BY created_at DESC LIMIT 1'
    );
    
    if (catalogs.length === 0) {
      return res.json({ file_url: null, title: 'Каталог ZOK' });
    }
    
    res.json(catalogs[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Загрузить новый каталог (только админ)
router.post('/upload', auth, upload.single('catalog'), async (req, res) => {
  try {
    console.log('[Catalog upload] Request received');
    console.log('[Catalog upload] File:', req.file);
    console.log('[Catalog upload] Body:', req.body);
    
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const { title } = req.body;
    const fileUrl = `/uploads/catalog/${req.file.filename}`;

    console.log('[Catalog upload] Inserting into DB...');
    
    // Деактивируем предыдущие каталоги
    await db.query('UPDATE catalogs SET is_active = FALSE');

    // Добавляем новый каталог
    const [result] = await db.query(
      'INSERT INTO catalogs (title, file_url, file_name, is_active) VALUES (?, ?, ?, TRUE)',
      [title || 'Каталог ZOK', fileUrl, req.file.originalname]
    );

    console.log('[Catalog upload] Success! ID:', result.insertId);

    res.json({
      success: true,
      message: 'Catalog uploaded successfully',
      id: result.insertId,
      file_url: fileUrl
    });
  } catch (error) {
    console.error('[Catalog upload] Error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// Получить все каталоги (для админки)
router.get('/all', auth, async (req, res) => {
  try {
    const [catalogs] = await db.query(
      'SELECT * FROM catalogs ORDER BY created_at DESC'
    );
    res.json(catalogs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Удалить каталог
router.delete('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    
    // Получаем информацию о каталоге
    const [catalogs] = await db.query('SELECT * FROM catalogs WHERE id = ?', [id]);
    
    if (catalogs.length > 0) {
      // Удаляем файл
      const filePath = path.join(__dirname, '..', catalogs[0].file_url);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }
    
    await db.query('DELETE FROM catalogs WHERE id = ?', [id]);
    
    res.json({ success: true, message: 'Catalog deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

