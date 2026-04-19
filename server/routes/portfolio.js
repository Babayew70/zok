const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Get all active portfolio items (public)
router.get('/', async (req, res) => {
    try {
        const [items] = await db.query(
            'SELECT * FROM portfolio WHERE is_active = TRUE ORDER BY sort_order ASC, created_at DESC'
        );
        res.json(items);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
