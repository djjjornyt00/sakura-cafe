export function notFound(req, res) {
  res.status(404).json({ error: 'Маршрут не найден' });
}

export function errorHandler(err, req, res, next) {
  console.error('Ошибка сервера:', err.message);
  res.status(500).json({ error: 'Внутренняя ошибка сервера. Попробуйте позже.' });
}