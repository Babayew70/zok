const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

// Загружаем .env из server папки
try {
  const envPath = path.join(__dirname, 'server', '.env');
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    envContent.split('\n').forEach(line => {
      const [key, ...valueParts] = line.split('=');
      if (key && valueParts.length) {
        process.env[key.trim()] = valueParts.join('=').trim();
      }
    });
  }
} catch (e) {
  console.log('Не удалось загрузить .env файл');
}

async function setupDatabase() {
  let connection;
  
  try {
    // Подключение без указания базы данных
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || ''
    });

    console.log('Подключение к MySQL установлено...');

    // Чтение SQL файла
    const sqlFile = fs.readFileSync(path.join(__dirname, 'server', 'database.sql'), 'utf8');
    
    // Разделение на отдельные запросы
    const queries = sqlFile
      .split(';')
      .map(q => q.trim())
      .filter(q => q.length > 0 && !q.startsWith('--'));

    // Выполнение запросов
    for (const query of queries) {
      if (query) {
        try {
          await connection.query(query);
        } catch (error) {
          // Игнорируем ошибки типа "таблица уже существует"
          if (!error.message.includes('already exists') && !error.message.includes('Duplicate')) {
            console.log('Предупреждение:', error.message);
          }
        }
      }
    }

    console.log('База данных успешно настроена!');
    console.log('Администратор создан:');
    console.log('  Username: admin');
    console.log('  Password: admin123');
    
  } catch (error) {
    console.error('Ошибка при настройке базы данных:', error.message);
    console.log('\nУбедитесь, что:');
    console.log('1. MySQL сервер запущен');
    console.log('2. Правильные данные в server/.env');
    console.log('3. База данных доступна');
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

setupDatabase();

