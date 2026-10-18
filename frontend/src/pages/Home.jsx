import { Link } from 'react-router-dom';

const features = [
  { mark: '鮮', title: 'Свежие продукты', text: 'Рыба, овощи и рис каждый день. Ничего лишнего, только вкус.' },
  { mark: '麺', title: 'Рамен с душой', text: 'Бульон варим много часов, лапшу подаём с пылу с жару.' },
  { mark: '茶', title: 'Настоящая матча', text: 'Японский чай и десерты, к которым хочется возвращаться.' },
  { mark: '和', title: 'Уют и гармония', text: 'Тёплый свет, дерево и тишина, чтобы отдохнуть от суеты.' },
];

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="container hero__content">
          <p className="hero__kicker">桜 · японская кухня · уютное место</p>
          <h1 className="hero__title">Sakura Café</h1>
          <p className="hero__text">
            Небольшое кафе, где рамен варят неспешно, суши собирают вручную, а матчу взбивают
            прямо при вас. Заходите погреться и вкусно поесть.
          </p>
          <div className="hero__buttons">
            <Link to="/menu" className="btn btn--primary">Посмотреть меню</Link>
            <Link to="/reservation" className="btn btn--light">Забронировать столик</Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section__title">Почему к нам возвращаются</h2>
          <p className="section__subtitle">Простые вещи, сделанные хорошо</p>
          <div className="features">
            {features.map((f) => (
              <article className="feature" key={f.title}>
                <div className="feature__mark">{f.mark}</div>
                <h3 className="feature__title">{f.title}</h3>
                <p className="feature__text">{f.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}