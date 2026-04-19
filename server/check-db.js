const mysql = require('mysql2/promise');
require('dotenv').config();

async function check() {
  const config = {
    host: process.env.DB_HOST || '127.0.0.1',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    multipleStatements: true
  };
  try {
    const connection = await mysql.createConnection(config);
    const [dbs] = await connection.query('SHOW DATABASES');
    console.log('Databases:', dbs.map(d => d.Database));
    
    await connection.query('CREATE DATABASE IF NOT EXISTS zok_website');
    await connection.query('USE zok_website');
    
    const [tables] = await connection.query('SHOW TABLES');
    console.log('Tables in zok_website:', tables.map(t => Object.values(t)[0]));
    
    await connection.end();
  } catch (error) {
    console.error('Error:', error);
  }
}

check();
