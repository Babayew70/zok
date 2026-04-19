const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const auth = require('../middleware/auth');

const LOG_DIR = path.join(__dirname, '..', 'logs');
const LOG_FILE = path.join(LOG_DIR, 'error.log');
const APP_LOG_FILE = path.join(LOG_DIR, 'app.log');

// Ensure log directory exists
if (!fs.existsSync(LOG_DIR)) {
    fs.mkdirSync(LOG_DIR, { recursive: true });
}

// Logger utility
const logger = {
    _write(file, level, message, details = null) {
        const timestamp = new Date().toISOString();
        const logEntry = {
            timestamp,
            level,
            message,
            details: details || null
        };
        const line = JSON.stringify(logEntry) + '\n';
        try {
            fs.appendFileSync(file, line);
        } catch (e) {
            console.error('Failed to write log:', e.message);
        }
    },
    error(message, details) { this._write(LOG_FILE, 'ERROR', message, details); },
    warn(message, details) { this._write(LOG_FILE, 'WARN', message, details); },
    info(message, details) { this._write(APP_LOG_FILE, 'INFO', message, details); },
    action(message, details) { this._write(APP_LOG_FILE, 'ACTION', message, details); }
};

// Middleware: log all errors globally
const errorLoggerMiddleware = (err, req, res, next) => {
    logger.error(`${req.method} ${req.originalUrl} - ${err.message}`, {
        stack: err.stack,
        body: req.body,
        ip: req.ip
    });
    res.status(err.status || 500).json({ error: err.message || 'Internal server error' });
};

// Middleware: log admin actions
const actionLoggerMiddleware = (req, res, next) => {
    if (req.method !== 'GET' && req.originalUrl.includes('/api/admin')) {
        const originalEnd = res.end;
        res.end = function (...args) {
            logger.action(`${req.method} ${req.originalUrl}`, {
                status: res.statusCode,
                ip: req.ip,
                body: req.method === 'DELETE' ? null : '(body omitted)'
            });
            originalEnd.apply(this, args);
        };
    }
    next();
};

// API: Get error logs
router.get('/errors', auth, (req, res) => {
    try {
        if (!fs.existsSync(LOG_FILE)) {
            return res.json([]);
        }
        const content = fs.readFileSync(LOG_FILE, 'utf-8');
        const lines = content.trim().split('\n').filter(Boolean);
        const logs = lines.map(line => {
            try { return JSON.parse(line); } catch { return { message: line, level: 'RAW' }; }
        });
        // Return last 100, newest first
        res.json(logs.reverse().slice(0, 100));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// API: Get app/action logs
router.get('/actions', auth, (req, res) => {
    try {
        if (!fs.existsSync(APP_LOG_FILE)) {
            return res.json([]);
        }
        const content = fs.readFileSync(APP_LOG_FILE, 'utf-8');
        const lines = content.trim().split('\n').filter(Boolean);
        const logs = lines.map(line => {
            try { return JSON.parse(line); } catch { return { message: line, level: 'RAW' }; }
        });
        res.json(logs.reverse().slice(0, 100));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// API: Clear logs
router.delete('/errors', auth, (req, res) => {
    try {
        if (fs.existsSync(LOG_FILE)) {
            fs.writeFileSync(LOG_FILE, '');
        }
        res.json({ message: 'Error logs cleared' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/actions', auth, (req, res) => {
    try {
        if (fs.existsSync(APP_LOG_FILE)) {
            fs.writeFileSync(APP_LOG_FILE, '');
        }
        res.json({ message: 'Action logs cleared' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = { router, logger, errorLoggerMiddleware, actionLoggerMiddleware };
