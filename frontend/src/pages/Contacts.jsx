const hours = [
  { days: 'Понедельник – Пятница', time: '11:00 – 22:00' },
  { days: 'Суббота – Воскресенье', time: '10:00 – 23:00' },
];

const socials = [
  { label: 'Instagram', href: 'https://instagram.com/' },
  { label: 'Telegram', href: 'https://t.me/' },
  { label: 'VK', href: 'https://vk.com/' },
];

export default function Contacts() {
  return (
    <section className="page container">
      <h1 className="page__title">Контакты</h1>
      <p className="page__lead">Будем рады видеть вас в гостях.</p>

      <div className="contacts">
        <div className="contact-card">
          <div className="contact-card__mark">所</div>
          <h2>Адрес</h2>
          <p>г. Тюмень, ул. Сакурная, д. 1</p>
        </div>

        <div className="contact-card">
          <div className="contact-card__mark">電</div>
          <h2>Телефон</h2>
          <p>
            <a className="contact-link" href="tel:+79001234567">+7 (900) 123-45-67</a>
          </p>
          <p>
            <a className="contact-link" href="mailto:hello@sakura-cafe.example">
              hello@sakura-cafe.example
            </a>
          </p>
        </div>

        <div className="contact-card">
          <div className="contact-card__mark">時</div>
          <h2>Часы работы</h2>
          {hours.map((h) => (
            <p key={h.days}>
              <span className="contact-card__days">{h.days}</span>
              <br />
              {h.time}
            </p>
          ))}
        </div>
      </div>

      <h2 className="contacts__social-title">Мы в соцсетях</h2>
      <div className="socials">
        {socials.map((s) => (
          <a key={s.label} className="social" href={s.href} target="_blank" rel="noreferrer">
            {s.label}
          </a>
        ))}
      </div>
    </section>
  );
}