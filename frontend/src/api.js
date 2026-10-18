const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Меню
export async function fetchMenu() {
  const response = await fetch(`${API_URL}/menu`);
  if (!response.ok) {
    throw new Error('Не удалось загрузить меню');
  }
  return response.json();
}



// Отправить бронь на сервер
export async function createReservation(data) {
  const response = await fetch(`${API_URL}/reservations`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  const result = await response.json().catch(() => ({}));

  if (!response.ok) {
    const message = result.details ? result.details.join('. ') : result.error;
    throw new Error(message || 'Не удалось отправить бронь');
  }

  return result;
}