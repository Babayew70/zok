# Инструкция по установке и настройке

## Шаг 1: Установка зависимостей

Выполните в корневой папке проекта:
```bash
npm run install-all
```

Это установит зависимости для:
- Корневого проекта
- Backend сервера
- React клиента

## Шаг 2: Настройка базы данных MySQL

1. Откройте MySQL и выполните SQL скрипт:
```bash
mysql -u root -p < server/database.sql
```

Или откройте файл `server/database.sql` в MySQL Workbench и выполните его.

2. Создайте файл `server/.env` на основе `server/.env.example`:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=ваш_пароль_mysql
DB_NAME=zok_website
JWT_SECRET=ваш_секретный_ключ_для_jwt_токенов
PORT=5000
NODE_ENV=development
```

## Шаг 3: Настройка администратора

По умолчанию в базе данных создается администратор:
- **Username:** admin
- **Password:** admin123

**ВАЖНО:** Пароль в базе данных должен быть захеширован через bcrypt.

Чтобы создать правильный хеш пароля, вы можете:

1. Использовать онлайн генератор bcrypt
2. Или запустить Node.js скрипт:

Создайте файл `server/create-admin.js`:
```javascript
const bcrypt = require('bcryptjs');
const password = 'admin123';
const hash = bcrypt.hashSync(password, 10);
console.log('Hashed password:', hash);
```

Затем обновите пароль в базе данных:
```sql
UPDATE admins SET password = 'ваш_хеш' WHERE username = 'admin';
```

## Шаг 4: Запуск проекта

### Вариант 1: Запуск всего проекта одновременно
```bash
npm run dev
```

Это запустит:
- Backend на http://localhost:5000
- Frontend на http://localhost:3000

### Вариант 2: Запуск отдельно

Backend:
```bash
cd server
npm run dev
```

Frontend (в новом терминале):
```bash
cd client
npm start
```

## Шаг 5: Доступ к приложению

- **Главная страница:** http://localhost:3000
- **Админ-панель:** http://localhost:3000/admin/login
  - Username: admin
  - Password: admin123 (или тот, который вы установили)

## Структура проекта

```
zok website/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/     # React компоненты
│   │   ├── pages/         # Страницы приложения
│   │   ├── context/       # Context API (Theme)
│   │   └── App.js
│   └── package.json
├── server/                 # Node.js backend
│   ├── config/            # Конфигурация БД
│   ├── routes/            # API маршруты
│   ├── middleware/        # Middleware (auth)
│   ├── database.sql       # SQL схема
│   └── index.js           # Точка входа сервера
└── package.json
```

## Возможные проблемы

### Проблема: Ошибка подключения к MySQL
**Решение:** Проверьте:
- MySQL сервер запущен
- Правильные данные в `server/.env`
- База данных `zok_website` создана

### Проблема: Порт уже занят
**Решение:** Измените порт в `server/.env` или остановите процесс, использующий порт

### Проблема: CORS ошибки
**Решение:** Убедитесь, что backend запущен на порту 5000, а frontend на 3000

## Следующие шаги

1. Добавьте продукты через админ-панель
2. Настройте загрузку изображений (можно использовать внешние URL или настроить multer для загрузки файлов)
3. Добавьте больше функций по необходимости

