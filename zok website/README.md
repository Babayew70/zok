# ZOK Website - Декоративные материалы

Веб-сайт для продажи декоративных материалов: эмульсии, траверсы, аттохенто, лаки, настенные декоративные шпаклевки.

## Технологии

- **Frontend**: React + TypeScript
- **Backend**: Node.js + Express
- **Database**: MySQL
- **Features**: Dark/Light theme, Admin panel

## Установка

1. Установите все зависимости:
```bash
npm run install-all
```

2. Настройте базу данных MySQL (см. server/database.sql)

3. Настройте переменные окружения в server/.env:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=zok_website
JWT_SECRET=your_secret_key
PORT=5000
```

4. Запустите проект:
```bash
npm run dev
```

## Структура проекта

- `/client` - React frontend
- `/server` - Node.js backend
- `/server/database.sql` - SQL схема базы данных

