import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <section className="page container not-found">
      <div className="not-found__mark">桜</div>
      <h1 className="page__title">Страница не найдена</h1>
      <p className="page__lead">Лепестки унесли её ветром. Вернёмся на главную?</p>
      <Link to="/" className="btn btn--primary">На главную</Link>
    </section>
  );
}