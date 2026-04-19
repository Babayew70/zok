const bcrypt = require('bcryptjs');

// Создать хеш пароля для администратора
const password = process.argv[2] || 'admin123';
const hash = bcrypt.hashSync(password, 10);

console.log('================================');
console.log('Пароль:', password);
console.log('Хеш для базы данных:', hash);
console.log('================================');
console.log('\nИспользуйте этот хеш в SQL запросе:');
console.log(`UPDATE admins SET password = '${hash}' WHERE username = 'admin';`);

