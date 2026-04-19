const express = require('express');
const cors = require('cors');
const path = require('path');

// Загружаем .env из папки server
require('dotenv').config({ path: path.join(__dirname, '.env'), override: true });

const app = express();
const PORT = process.env.PORT || 5002;
const IS_PROD = process.env.NODE_ENV === 'production';

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging middleware
const { actionLoggerMiddleware, errorLoggerMiddleware } = require('./routes/logs');
app.use(actionLoggerMiddleware);

// Static files for uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes - API должны работать ДО статических файлов
app.use('/api/products', require('./routes/products'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/cooperation', require('./routes/cooperation'));
app.use('/api/catalog', require('./routes/catalog'));
app.use('/api/banners', require('./routes/banners'));
app.use('/api/portfolio', require('./routes/portfolio'));
app.use('/api/reviews', require('./routes/reviews'));
app.use('/api/upload', require('./routes/upload'));
app.use('/api/logs', require('./routes/logs').router);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Serve React build in production (только для НЕ-API маршрутов)
if (IS_PROD) {
  const clientBuildPath = path.join(__dirname, '../client/build');

  // Сначала пробуем найти статический файл
  app.use(express.static(clientBuildPath));

  // Для всех остальных маршрутов - отдаем React app
  app.get('*', (req, res) => {
    res.sendFile(path.join(clientBuildPath, 'index.html'));
  });
}

// Global error handler
app.use(errorLoggerMiddleware);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Mode: ${IS_PROD ? 'PRODUCTION' : 'DEVELOPMENT'}`);
  console.log(`API: http://localhost:${PORT}/api`);
  if (IS_PROD) {
    console.log(`Site: http://localhost:${PORT}`);
  }
});
