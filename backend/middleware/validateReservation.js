export function validateReservation(req, res, next) {
  const { customer_name, phone, reservation_date, reservation_time, guests_count } = req.body;
  const errors = [];

  if (typeof customer_name !== 'string' || customer_name.trim().length < 2 || customer_name.trim().length > 100) {
    errors.push('Имя должно содержать от 2 до 100 символов');
  }

  const phoneDigits = typeof phone === 'string' ? phone.replace(/\D/g, '') : '';
  if (typeof phone !== 'string' || !/^[\d\s+()-]+$/.test(phone) || phoneDigits.length < 10 || phoneDigits.length > 15) {
    errors.push('Введите корректный номер телефона (от 10 цифр)');
  }

  const dateOk = typeof reservation_date === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(reservation_date) && !Number.isNaN(Date.parse(reservation_date));
  if (!dateOk) {
    errors.push('Укажите корректную дату');
  } else {
    const today = new Date();
    const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    if (reservation_date < todayStr) {
      errors.push('Нельзя забронировать столик на прошедшую дату');
    }
  }

  if (typeof reservation_time !== 'string' || !/^([01]\d|2[0-3]):[0-5]\d$/.test(reservation_time)) {
    errors.push('Укажите корректное время');
  }

  const guests = Number(guests_count);
  if (!Number.isInteger(guests) || guests < 1 || guests > 20) {
    errors.push('Количество гостей: от 1 до 20');
  }

  if (errors.length > 0) {
    return res.status(400).json({ error: 'Проверьте данные формы', details: errors });
  }

  req.body.customer_name = customer_name.trim();
  req.body.phone = phone.trim();
  req.body.guests_count = guests;

  next();
}