import { useState } from 'react';
import { Link } from 'react-router-dom';

function Photo({ src, alt, mark }) {
  const [failed, setFailed] = useState(false);

  return (
    <div className="about__photo">
      {failed ? (
        <div className="about__placeholder">{mark}</div>
      ) : (
        <img src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} />
      )}
    </div>
  );
}

export default function About() {
  return (
    <section className="page container">
      <h1 className="page__title">О кафе</h1>
      <p className="page__lead">Маленький уголок Японии в самом сердце города.</p>

      <div className="about">
        <div className="about__text">
          <h2>Идея места</h2>
          <p>
            Sakura Café родилось из простого желания: создать место, где можно замедлиться.
            Название отсылает к сакуре, которая цветёт всего несколько дней в году и учит
            ценить момент.
          </p>
          <p>
            Мы вдохновлялись японскими кафе-киссатэн: тёплый свет, дерево, негромкая музыка и
            никакой суеты. Здесь не торопят и не отвлекают, просто приносят хороший рамен,
            чашку матчи и оставляют вас наедине с хорошим днём.
          </p>
        </div>
        <Photo src="/images/about-1.jpg" alt="Интерьер Sakura Café" mark="和" />
      </div>

      <div className="about about--reverse">
        <Photo src="/images/about-2.jpg" alt="Цветущая сакура" mark="桜" />
        <div className="about__text">
          <h2>Атмосфера</h2>
          <p>
            В зале пахнет свежим бульоном и жасминовым чаем. Мягкие тона, натуральное дерево и
            бумажные фонари создают ощущение, будто вы заглянули на уютную улочку в Киото.
          </p>
          <p>
            Приходите на неспешный обед, романтический ужин или просто за десертом. Для
            компании у нас есть большой стол, а для тех, кто хочет тишины, угловые места у окна.
          </p>
          <Link to="/reservation" className="btn btn--primary">Забронировать столик</Link>
        </div>
      </div>
    </section>
  );
}