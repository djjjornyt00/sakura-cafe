export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <span className="footer__logo">桜 Sakura Café</span>
        <span>© {new Date().getFullYear()} Sakura Café. Все права защищены.</span>
      </div>
    </footer>
  );
}