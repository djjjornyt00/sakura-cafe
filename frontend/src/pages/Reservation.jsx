import { useState } from 'react';
import { createReservation } from '../api.js';

const emptyForm = {
  customer_name: '',
  phone: '',
  reservation_date: '',
  reservation_time: '',
  guests_count: '2',
};

function todayString() {
  const d = new Date();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${month}-${day}`;
}

function validate(form) {
  const errors = {};

  if (form.customer_name.trim().length < 2) {
    errors.customer_name = 'Введите имя (минимум 2 буквы)';
  }

  const digits = form.phone.replace(/\D/g, '');
  if (!/^[\d\s+()-]+$/.test(form.phone) || digits.length < 10 || digits.length > 15) {
    errors.phone = 'Введите корректный номер (от 10 цифр)';
  }

  if (!form.reservation_date) {
    errors.reservation_date = 'Выберите дату';
  } else if (form.reservation_date < todayString()) {
    errors.reservation_date = 'Нельзя выбрать прошедшую дату';
  }

  if (!form.reservation_time) {
    errors.reservation_time = 'Выберите время';
  }

  const guests = Number(form.guests_count);
  if (!Number.isInteger(guests) || guests < 1 || guests > 20) {
    errors.guests_count = 'Гостей: от 1 до 20';
  }

  return errors;
}

export default function Reservation() {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(null);
  const [serverError, setServerError] = useState('');

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault(); 
    setServerError('');
    setSuccess(null);

    const foundErrors = validate(form);
    setErrors(foundErrors);
    if (Object.keys(foundErrors).length > 0) return;

    setSubmitting(true);
    try {
      const result = await createReservation({
        ...form,
        customer_name: form.customer_name.trim(),
        phone: form.phone.trim(),
        guests_count: Number(form.guests_count),
      });
      setSuccess(result.reservation);
      setForm(emptyForm);
    } catch (err) {
      setServerError(
        err.message === 'Failed to fetch'
          ? 'Не удаётся связаться с сервером. Попробуйте позже.'
          : err.message
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="page container">
      <h1 className="page__title">Бронирование столика</h1>
      <p className="page__lead">Оставьте заявку, и мы будем ждать вас в назначенное время.</p>

      <div className="reserve">
        <form className="form" onSubmit={handleSubmit} noValidate>
          <div className="field">
            <label htmlFor="customer_name">Ваше имя</label>
            <input
              id="customer_name"
              name="customer_name"
              type="text"
              value={form.customer_name}
              onChange={handleChange}
              placeholder="Например, Анна"
              className={errors.customer_name ? 'input--error' : ''}
            />
            {errors.customer_name && <span className="field__error">{errors.customer_name}</span>}
          </div>

          <div className="field">
            <label htmlFor="phone">Телефон</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={form.phone}
              onChange={handleChange}
              placeholder="+7 900 123-45-67"
              className={errors.phone ? 'input--error' : ''}
            />
            {errors.phone && <span className="field__error">{errors.phone}</span>}
          </div>

          <div className="field-row">
            <div className="field">
              <label htmlFor="reservation_date">Дата</label>
              <input
                id="reservation_date"
                name="reservation_date"
                type="date"
                min={todayString()}
                value={form.reservation_date}
                onChange={handleChange}
                className={errors.reservation_date ? 'input--error' : ''}
              />
              {errors.reservation_date && (
                <span className="field__error">{errors.reservation_date}</span>
              )}
            </div>

            <div className="field">
              <label htmlFor="reservation_time">Время</label>
              <input
                id="reservation_time"
                name="reservation_time"
                type="time"
                value={form.reservation_time}
                onChange={handleChange}
                className={errors.reservation_time ? 'input--error' : ''}
              />
              {errors.reservation_time && (
                <span className="field__error">{errors.reservation_time}</span>
              )}
            </div>
          </div>

          <div className="field">
            <label htmlFor="guests_count">Количество гостей</label>
            <input
              id="guests_count"
              name="guests_count"
              type="number"
              min="1"
              max="20"
              value={form.guests_count}
              onChange={handleChange}
              className={errors.guests_count ? 'input--error' : ''}
            />
            {errors.guests_count && <span className="field__error">{errors.guests_count}</span>}
          </div>

          {serverError && <div className="alert alert--error">{serverError}</div>}

          {success && (
            <div className="alert alert--success">
              Спасибо, {success.customer_name}! Столик на {success.guests_count} чел. забронирован
              на {formatDate(success.reservation_date)} в {success.reservation_time.slice(0, 5)}.
              Ждём вас в Sakura Café!
            </div>
          )}

          <button type="submit" className="btn btn--primary form__submit" disabled={submitting}>
            {submitting ? 'Отправляем…' : 'Забронировать'}
          </button>
        </form>

        <aside className="reserve__side">
          <div className="reserve__mark">桜</div>
          <h2>Ждём вас</h2>
          <p>
            Мы держим столик 15 минут после назначенного времени. Если планы изменились,
            позвоните нам, и мы перенесём бронь.
          </p>
        </aside>
      </div>
    </section>
  );
}
function formatDate(value) {
  const [year, month, day] = String(value).slice(0, 10).split('-');
  return `${day}.${month}.${year}`;
}