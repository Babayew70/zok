const mysql = require('mysql2/promise');
const path = require('path');

// Подхватить .env из корня server (override чтобы .env имел приоритет над systemd)
require('dotenv').config({ path: path.join(__dirname, '..', '.env'), override: true });

const poolConfig = {
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'zok_website',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

// На Linux при host=localhost драйвер использует сокет; при 127.0.0.1 — TCP.
if (process.env.DB_HOST && process.env.DB_HOST !== 'localhost') {
  poolConfig.host = process.env.DB_HOST;
} else {
  poolConfig.host = 'localhost';
}

const pool = mysql.createPool(poolConfig);

// Проверка подключения при старте (логируем только для отладки)
pool.getConnection()
  .then((conn) => {
    console.log('[DB] Connected as', poolConfig.user + '@' + poolConfig.host + ' to', poolConfig.database);
    conn.release();
  })
  .catch((err) => {
    console.error('[DB] Connection failed:', err.message);
  });

module.exports = pool;

