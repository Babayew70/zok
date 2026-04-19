const mysql = require('mysql2/promise');
require('dotenv').config();

async function testConnection() {
  const config = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'zok_website'
  };
  try {
    const connection = await mysql.createConnection(config);
    console.log('✓ Подключение к базе данных успешно!');
    const [tables] = await connection.query('SHOW TABLES');
    console.log('✓ Найдено таблиц:', tables.length);
    const [admins] = await connection.query('SELECT * FROM admins');
    console.log('✓ Найдено администраторов:', admins.length);
    const [langs] = await connection.query('SELECT * FROM languages');
    console.log('✓ Найдено языков:', langs.length);
    const [colors] = await connection.query('SELECT * FROM site_colors');
    console.log('✓ Записей в site_colors:', colors.length);
    await connection.end();
    console.log('\n✓ База данных готова к работе!');
  } catch (error) {
    console.error('✗ Ошибка:', error.message);
    console.error('  Проверьте: MySQL запущен, в server/.env указаны DB_HOST, DB_USER, DB_PASSWORD, DB_NAME.');
    console.error('  Инициализация: mysql -u root -p < server/database_full.sql');
    process.exit(1);
  }
}

testConnection();

