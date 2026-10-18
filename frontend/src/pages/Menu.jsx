import { useEffect, useState } from 'react';
import { fetchMenu } from '../api.js';
import MenuCard from '../components/MenuCard.jsx';

const categories = [
  { value: 'all', label: 'Все' },
  { value: 'ramen', label: 'Рамен' },
  { value: 'sushi', label: 'Суши' },
  { value: 'appetizers', label: 'Закуски' },
  { value: 'desserts', label: 'Десерты' },
  { value: 'drinks', label: 'Напитки' },
];

export default function Menu() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [category, setCategory] = useState('all');

  useEffect(() => {
    fetchMenu()
      .then((data) => setItems(data))
      .catch(() => setError('Не удалось загрузить меню. Проверьте, что сервер запущен.'))
      .finally(() => setLoading(false));
  }, []);

  const visibleItems =
    category === 'all' ? items : items.filter((item) => item.category === category);

  return (
    <section className="page container">
      <h1 className="page__title">Меню</h1>
      <p className="page__lead">Всё готовим свежим, поэтому иногда придётся немного подождать.</p>

      <div className="filters">
        {categories.map((c) => (
          <button
            key={c.value}
            className={category === c.value ? 'filter filter--active' : 'filter'}
            onClick={() => setCategory(c.value)}
          >
            {c.label}
          </button>
        ))}
      </div>

      {loading && <p className="state">Загружаем меню…</p>}
      {error && <p className="state state--error">{error}</p>}
      {!loading && !error && visibleItems.length === 0 && (
        <p className="state">В этой категории пока нет блюд.</p>
      )}

      <div className="dishes">
        {visibleItems.map((item) => (
          <MenuCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}