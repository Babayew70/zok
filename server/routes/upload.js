const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const auth = require('../middleware/auth');

// Ensure upload directories exist
const dirs = ['uploads/images', 'uploads/videos', 'uploads/portfolio', 'uploads/banners', 'uploads/products'];
dirs.forEach(dir => {
    const fullPath = path.join(__dirname, '..', dir);
    if (!fs.existsSync(fullPath)) {
        fs.mkdirSync(fullPath, { recursive: true });
    }
});

// Multer storage config
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const type = req.params.type || 'images';
        const allowed = ['images', 'videos', 'portfolio', 'banners', 'products'];
        const folder = allowed.includes(type) ? type : 'images';
        cb(null, path.join(__dirname, '..', 'uploads', folder));
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname).toLowerCase();
        cb(null, uniqueSuffix + ext);
    }
});

// File filter
const fileFilter = (req, file, cb) => {
    const imageTypes = /jpeg|jpg|png|webp|gif|svg/;
    const videoTypes = /mp4|webm|mov|avi/;
    const ext = path.extname(file.originalname).toLowerCase().slice(1);
    const mime = file.mimetype;

    if (imageTypes.test(ext) || mime.startsWith('image/')) {
        cb(null, true);
    } else if (videoTypes.test(ext) || mime.startsWith('video/')) {
        cb(null, true);
    } else {
        cb(new Error(`Unsupported file type: ${ext}. Allowed: jpg, png, webp, gif, svg, mp4, webm, mov`), false);
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 50 * 1024 * 1024 // 50MB max
    }
});

// Upload single file
router.post('/:type', auth, (req, res) => {
    const uploadSingle = upload.single('file');

    uploadSingle(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            if (err.code === 'LIMIT_FILE_SIZE') {
                return res.status(400).json({ error: 'File too large. Maximum 50MB allowed.' });
            }
            return res.status(400).json({ error: err.message });
        }
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const type = req.params.type || 'images';
        const fileUrl = `/uploads/${type}/${req.file.filename}`;

        res.json({
            message: 'File uploaded successfully',
            url: fileUrl,
            filename: req.file.filename,
            originalname: req.file.originalname,
            size: req.file.size,
            mimetype: req.file.mimetype
        });
    });
});

// Upload multiple files
router.post('/:type/multiple', auth, (req, res) => {
    const uploadMultiple = upload.array('files', 10);

    uploadMultiple(req, res, (err) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ error: 'No files uploaded' });
        }

        const type = req.params.type || 'images';
        const files = req.files.map(f => ({
            url: `/uploads/${type}/${f.filename}`,
            filename: f.filename,
            originalname: f.originalname,
            size: f.size,
            mimetype: f.mimetype
        }));

        res.json({ message: `${files.length} files uploaded`, files });
    });
});

// Delete a file
router.delete('/:type/:filename', auth, (req, res) => {
    const { type, filename } = req.params;
    const allowed = ['images', 'videos', 'portfolio', 'banners', 'products'];
    if (!allowed.includes(type)) {
        return res.status(400).json({ error: 'Invalid upload type' });
    }

    // Sanitize filename to prevent path traversal
    const safeName = path.basename(filename);
    const filePath = path.join(__dirname, '..', 'uploads', type, safeName);

    if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        res.json({ message: 'File deleted' });
    } else {
        res.status(404).json({ error: 'File not found' });
    }
});

// List all files in a directory
router.get('/:type', auth, (req, res) => {
    const { type } = req.params;
    const allowed = ['images', 'videos', 'portfolio', 'banners', 'products'];
    if (!allowed.includes(type)) {
        return res.status(400).json({ error: 'Invalid upload type' });
    }

    const dirPath = path.join(__dirname, '..', 'uploads', type);
    if (!fs.existsSync(dirPath)) {
        return res.json([]);
    }

    const files = fs.readdirSync(dirPath).map(filename => {
        const stats = fs.statSync(path.join(dirPath, filename));
        return {
            filename,
            url: `/uploads/${type}/${filename}`,
            size: stats.size,
            createdAt: stats.birthtime
        };
    });

    res.json(files);
});

module.exports = router;
