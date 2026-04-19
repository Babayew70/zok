const mysql = require('mysql2/promise');

async function testConnection() {
  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'Armyt!2026',
      database: 'zok_website'
    });
    
    console.log('✓ Подключение к базе данных успешно!');
    
    // Проверка таблиц
    const [tables] = await connection.query('SHOW TABLES');
    console.log('✓ Найдено таблиц:', tables.length);
    
    // Проверка категорий
    const [categories] = await connection.query('SELECT * FROM categories');
    console.log('✓ Найдено категорий:', categories.length);
    
    // Проверка администратора
    const [admins] = await connection.query('SELECT * FROM admins');
    console.log('✓ Найдено администраторов:', admins.length);
    
    await connection.end();
    console.log('\n✓ База данных полностью настроена и готова к работе!');
  } catch (error) {
    console.error('✗ Ошибка подключения:', error.message);
    process.exit(1);
  }
}

testConnection();

