import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

const links = [
  { to: '/', label: 'Главная' },
  { to: '/menu', label: 'Меню' },
  { to: '/about', label: 'О кафе' },
  { to: '/reservation', label: 'Бронирование' },
  { to: '/contacts', label: 'Контакты' },
];

export default function Header() {
  const [open, setOpen] = useState(false); // открыто ли меню на телефоне

  return (
    <header className="header">
      <div className="container header__inner">
        <Link to="/" className="logo" onClick={() => setOpen(false)}>
          <img className="logo__img" src="/logo.svg" alt="" width="40" height="40" />
          Sakura Café
        </Link>

        <button
          className={`burger ${open ? 'burger--open' : ''}`}
          aria-label="Открыть меню"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav className={`nav ${open ? 'nav--open' : ''}`}>
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) => (isActive ? 'nav__link nav__link--active' : 'nav__link')}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}