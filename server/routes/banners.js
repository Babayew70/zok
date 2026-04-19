const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Нормализовать image_url: если только имя файла — добавить путь
function normalizeBannerImageUrl(banner) {
  const url = banner.image_url || '';
  const urlMobile = banner.image_url_mobile || '';
  if (!url && !urlMobile) return banner;
  return { 
    ...banner, 
    image_url: url.startsWith('/') || url.startsWith('http') ? url : url ? `/uploads/banners/${url}` : '',
    image_url_mobile: urlMobile.startsWith('/') || urlMobile.startsWith('http') ? urlMobile : urlMobile ? `/uploads/banners/${urlMobile}` : ''
  };
}

// Получить все активные баннеры
router.get('/', async (req, res) => {
  try {
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate');
    const [banners] = await db.query(
      'SELECT * FROM banners WHERE is_active = TRUE ORDER BY sort_order ASC'
    );
    res.json(banners.map(normalizeBannerImageUrl));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

