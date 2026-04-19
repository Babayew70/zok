# Быстрый старт

## 1. Установка зависимостей
```bash
npm run install-all
```

## 2. Настройка базы данных

### Создайте базу данных:
```bash
mysql -u root -p < server/database.sql
```

### Создайте файл `server/.env`:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=ваш_пароль
DB_NAME=zok_website
JWT_SECRET=любой_секретный_ключ
PORT=5000
```

### Сгенерируйте хеш пароля для администратора:
```bash
cd server
node create-admin.js admin123
```

Скопируйте полученный хеш и обновите в базе данных:
```sql
UPDATE admins SET password = 'ваш_хеш' WHERE username = 'admin';
```

## 3. Запуск

```bash
npm run dev
```

Откройте браузер:
- Сайт: http://localhost:3000
- Админка: http://localhost:3000/admin/login
  - Логин: `admin`
  - Пароль: `admin123`

## Готово! 🎉

Теперь вы можете:
- Просматривать продукты на главной странице
- Добавлять новые продукты через админ-панель
- Переключать тему (темная/светлая) кнопкой в навбаре

