const express = require('express');
const router = express.Router();
const db = require('../config/db');
const nodemailer = require('nodemailer');

// Создать заказ
router.post('/', async (req, res) => {
  try {
    const { product_id, customer_name, customer_email, customer_phone, customer_address, quantity, notes } = req.body;

    if (!product_id || !customer_name || !customer_phone) {
      return res.status(400).json({ error: 'Product ID, customer name and phone are required' });
    }

    // Получаем информацию о продукте
    const [products] = await db.query('SELECT * FROM products WHERE id = ?', [product_id]);
    if (products.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const product = products[0];
    const productPrice = parseFloat(product.price) || 0;
    const orderQuantity = quantity || 1;
    const totalPrice = productPrice * orderQuantity;

    const [result] = await db.query(
      `INSERT INTO orders (product_id, customer_name, customer_email, customer_phone, customer_address, quantity, notes, total_price, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'pending')`,
      [product_id, customer_name, customer_email || null, customer_phone, customer_address || null, orderQuantity, notes || null, totalPrice]
    );

    // Отправляем email уведомление
    try {
      const [smtpSettings] = await db.query('SELECT * FROM smtp_settings LIMIT 1');

      if (smtpSettings.length > 0) {
        const smtp = smtpSettings[0];

        const transporter = nodemailer.createTransport({
          host: smtp.host,
          port: smtp.port,
          secure: smtp.port === 465,
          auth: {
            user: smtp.user,
            pass: smtp.password
          }
        });

        // Email админу
        await transporter.sendMail({
          from: `"${smtp.from_name || 'ZOK'}" <${smtp.from_email}>`,
          to: 'zeynepjumakulyyewa@gmail.com',
          subject: `Новый заказ #${result.insertId} - ZOK`,
          html: `
            <h2>Новый заказ #${result.insertId}</h2>
            <h3>Информация о клиенте:</h3>
            <p><strong>Имя:</strong> ${customer_name}</p>
            <p><strong>Телефон:</strong> ${customer_phone}</p>
            ${customer_email ? `<p><strong>Email:</strong> ${customer_email}</p>` : ''}
            ${customer_address ? `<p><strong>Адрес:</strong> ${customer_address}</p>` : ''}
            
            <h3>Детали заказа:</h3>
            <p><strong>Товар:</strong> ${product.name}</p>
            <p><strong>Количество:</strong> ${orderQuantity}</p>
            <p><strong>Цена за единицу:</strong> ${productPrice.toLocaleString()} TMT</p>
            <p><strong>Итого:</strong> ${totalPrice.toLocaleString()} TMT</p>
            ${notes ? `<p><strong>Примечания:</strong> ${notes}</p>` : ''}
            
            <hr>
            <p><em>Отправлено с сайта ZOK</em></p>
          `
        });

        // Email клиенту (если указан email)
        if (customer_email) {
          await transporter.sendMail({
            from: `"${smtp.from_name || 'ZOK Decorative Materials'}" <${smtp.from_email}>`,
            to: customer_email,
            subject: `Ваш заказ #${result.insertId} принят - ZOK`,
            html: `
              <h2>Спасибо за заказ!</h2>
              <p>Ваш заказ #${result.insertId} успешно принят.</p>
              
              <h3>Детали заказа:</h3>
              <p><strong>Товар:</strong> ${product.name}</p>
              <p><strong>Количество:</strong> ${orderQuantity}</p>
              <p><strong>Итого:</strong> ${totalPrice.toLocaleString()} TMT</p>
              
              <p>Мы свяжемся с вами в ближайшее время для подтверждения заказа.</p>
              
              <hr>
              <p><strong>Контакты:</strong></p>
              <p>Телефон: (+993) 63 21-10-03</p>
              <p>Email: zeynepjumakulyyewa@gmail.com</p>
              <p><em>ZOK Decorative Materials</em></p>
            `
          });
        }
      }
    } catch (emailError) {
      console.error('Error sending email:', emailError);
      // Не прерываем выполнение, заказ уже создан
    }

    res.json({
      id: result.insertId,
      message: 'Order created successfully',
      total_price: totalPrice
    });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
