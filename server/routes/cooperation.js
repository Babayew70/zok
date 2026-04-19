const express = require('express');
const router = express.Router();
const db = require('../config/db');
const nodemailer = require('nodemailer');

// Отправка заявки на сотрудничество
router.post('/', async (req, res) => {
  try {
    const { name, phone, partnerType } = req.body;

    if (!name || !phone) {
      return res.status(400).json({ error: 'Name and phone are required' });
    }

    // Сохраняем заявку в БД
    const [result] = await db.query(
      'INSERT INTO cooperation_requests (name, phone, partner_type) VALUES (?, ?, ?)',
      [name, phone, partnerType || 'shop']
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

        const partnerTypeLabels = {
          shop: 'Магазин',
          master: 'Мастер',
          designer: 'Дизайнер'
        };

        await transporter.sendMail({
          from: `"${smtp.from_name || 'ZOK'}" <${smtp.from_email}>`,
          to: 'zeynepjumakulyyewa@gmail.com',
          subject: 'Новая заявка на сотрудничество - ZOK',
          html: `
            <h2>Новая заявка на сотрудничество</h2>
            <p><strong>Имя:</strong> ${name}</p>
            <p><strong>Телефон:</strong> ${phone}</p>
            <p><strong>Тип партнера:</strong> ${partnerTypeLabels[partnerType] || partnerType}</p>
            <p><em>Отправлено с сайта ZOK</em></p>
          `
        });
      }
    } catch (emailError) {
      console.error('Error sending email:', emailError);
      // Не прерываем выполнение, заявка уже сохранена
    }

    res.json({
      success: true,
      message: 'Cooperation request submitted successfully',
      id: result.insertId
    });
  } catch (error) {
    console.error('Error submitting cooperation request:', error);
    res.status(500).json({ error: error.message });
  }
});

// Получить все заявки (для админки)
router.get('/', async (req, res) => {
  try {
    const [requests] = await db.query(
      'SELECT * FROM cooperation_requests ORDER BY created_at DESC'
    );
    res.json(requests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Обновить статус заявки
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status, notes } = req.body;
    
    const updates = [];
    const values = [];
    
    if (status) {
      updates.push('status = ?');
      values.push(status);
    }
    if (notes !== undefined) {
      updates.push('notes = ?');
      values.push(notes);
    }
    
    if (updates.length === 0) {
      return res.status(400).json({ error: 'No fields to update' });
    }
    
    values.push(id);
    
    await db.query(
      `UPDATE cooperation_requests SET ${updates.join(', ')} WHERE id = ?`,
      values
    );
    
    res.json({ success: true, message: 'Cooperation request updated' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Удалить заявку
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await db.query('DELETE FROM cooperation_requests WHERE id = ?', [id]);
    res.json({ success: true, message: 'Cooperation request deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
