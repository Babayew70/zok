const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');
require('dotenv').config();

async function initDb() {
  const config = {
    host: process.env.DB_HOST || '127.0.0.1',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    multipleStatements: true
  };
  
  const filesToRun = [
    'database.sql',
    'add_tables.sql',
    { execute: 'DROP TABLE IF EXISTS site_colors;', name: 'Drop conflicting site_colors' },
    'add_colors_table.sql',
    'add_languages_table.sql',
    'add_banners_table.sql',
    'add_theme_colors.sql',
    { execute: 'ALTER TABLE site_colors DROP INDEX color_key;', name: 'Drop color_key unique index', ignoreError: true },
    { execute: 'ALTER TABLE site_colors ADD UNIQUE KEY (color_key, theme);', name: 'Add (color_key, theme) unique index', ignoreError: true },
    'init_zok_colors.sql',
    'update_colors_table.sql',
    'update_orders_table.sql',
    'update_products_multilang.sql',
    'add_cooperation_catalog_tables.sql',
    'migrations/portfolio_reviews.sql'
  ];

  try {
    const connection = await mysql.createConnection(config);
    
    // Drop DB to start fresh and ensure all tables are created cleanly
    await connection.query('DROP DATABASE IF EXISTS zok_website');
    await connection.query('CREATE DATABASE zok_website');
    await connection.query('USE zok_website');

    console.log('Database connected and selected.');

    for (const item of filesToRun) {
      if (typeof item === 'string') {
        const filePath = path.join(__dirname, item);
        if (fs.existsSync(filePath)) {
          console.log(`Running ${item}...`);
          try {
            const sql = fs.readFileSync(filePath, 'utf8');
            await connection.query(sql);
            console.log(`✓ ${item} executed successfully.`);
          } catch (e) {
             console.log(`⚠ ${item} failed but continuing. Error: ${e.message}`);
          }
        } else {
          console.log(`⚠ File ${item} not found. Skipped.`);
        }
      } else {
        console.log(`Executing: ${item.name}...`);
        try {
          await connection.query(item.execute);
          console.log(`✓ ${item.name} executed successfully.`);
        } catch (e) {
          if (!item.ignoreError) console.log(`⚠ ${item.name} failed but continuing. Error: ${e.message}`);
        }
      }
    }
    
    // Update admin password to the requested one ('admin123')
    const bcrypt = require('bcryptjs');
    const hash = bcrypt.hashSync('admin123', 10);
    // if admins table exists, update the default 'admin'
    await connection.query(`UPDATE admins SET password = ? WHERE username = 'admin'`, [hash]);
    console.log(`✓ Password for 'admin' updated to 'admin123'.`);
    
    await connection.end();
    console.log('Database initialization complete!');
  } catch (error) {
    console.error('Error during database initialization:', error);
  }
}

initDb();
