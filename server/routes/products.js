const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Получить все продукты
router.get('/', async (req, res) => {
  try {
    const [products] = await db.query(`
      SELECT p.*, c.name_ru as category_name, c.name_tm as category_name_tm, c.name_en as category_name_en 
      FROM products p 
      LEFT JOIN categories c ON p.category_id = c.id 
      ORDER BY p.created_at DESC
    `);
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Получить продукт по ID
router.get('/:id', async (req, res) => {
  try {
    const [products] = await db.query(
      'SELECT p.*, c.name_ru as category_name, c.name_tm as category_name_tm, c.name_en as category_name_en FROM products p LEFT JOIN categories c ON p.category_id = c.id WHERE p.id = ?',
      [req.params.id]
    );
    if (products.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(products[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Получить продукты по категории
router.get('/category/:categoryId', async (req, res) => {
  try {
    const [products] = await db.query(
      'SELECT p.*, c.name_ru as category_name, c.name_tm as category_name_tm, c.name_en as category_name_en FROM products p LEFT JOIN categories c ON p.category_id = c.id WHERE p.category_id = ?',
      [req.params.categoryId]
    );
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Получить все категории
router.get('/categories/all', async (req, res) => {
  try {
    const [categories] = await db.query('SELECT * FROM categories ORDER BY name_ru');
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Создать заказ по продукту
router.post('/:id/order', async (req, res) => {
  try {
    const productId = req.params.id;
    const { customer_name, customer_email, customer_phone, message } = req.body;

    if (!customer_name || !customer_phone) {
      return res.status(400).json({ error: 'Имя и телефон обязательны' });
    }

    const [result] = await db.query(
      `INSERT INTO orders (product_id, customer_name, customer_email, customer_phone, message, status)
       VALUES (?, ?, ?, ?, ?, 'new')`,
      [productId, customer_name, customer_email || null, customer_phone, message || null]
    );

    res.json({ id: result.insertId, message: 'Order created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

