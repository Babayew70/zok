const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Get all approved reviews (public)
router.get('/', async (req, res) => {
    try {
        const [reviews] = await db.query(
            'SELECT * FROM reviews WHERE is_approved = TRUE ORDER BY created_at DESC'
        );
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Submit a new review (public, needs moderation)
router.post('/', async (req, res) => {
    try {
        const { author_name, rating, text_content, photo_url } = req.body;

        if (!author_name || !text_content) {
            return res.status(400).json({ error: 'Name and text are required' });
        }

        const clampedRating = Math.min(5, Math.max(1, parseInt(rating) || 5));

        const [result] = await db.query(
            'INSERT INTO reviews (author_name, rating, text_content, photo_url) VALUES (?, ?, ?, ?)',
            [author_name, clampedRating, text_content, photo_url || null]
        );

        res.status(201).json({ id: result.insertId, message: 'Review submitted for moderation' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
