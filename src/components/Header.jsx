import { useEffect, useState } from 'react';
import { nav, wa } from '../data/content';

export default function Header({ menuOpen, onToggleMenu }) {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [active, setActive] = useState('');

  /* Fundo com blur ao rolar e esconde ao descer */
  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      setHidden(y > lastY && y > window.innerHeight * 0.6);
      lastY = y;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Destaca no menu a seção visível */
  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); });
    }, { rootMargin: '-45% 0px -50% 0px' });
    document.querySelectorAll('main section[id]').forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  const headerClass = ['header', scrolled && 'is-scrolled', hidden && !menuOpen && 'is-hidden']
    .filter(Boolean).join(' ');

  return (
    <>
      <header className={headerClass}>
        <div className="header__inner container">
          <a href="#inicio" className="brand" aria-label="Navalha & Carvalho, voltar ao início">
            <img src="/favicon.svg" alt="" width="38" height="38" />
            <span className="brand__name">Navalha <em>&amp;</em> Carvalho</span>
          </a>

          <nav className="nav" aria-label="Principal">
            {nav.map((item) => (
              <a key={item.id} href={`#${item.id}`} className={active === item.id ? 'is-active' : undefined}>
                {item.label}
              </a>
            ))}
          </nav>

          <a href={wa()} className="btn btn--sm btn--brass header__cta" target="_blank" rel="noopener noreferrer">
            Agendar
          </a>

          <button
            className="burger"
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={menuOpen}
            aria-controls="menu"
            onClick={onToggleMenu}
          >
            <span /><span />
          </button>
        </div>
      </header>

      <div className="menu" id="menu" aria-hidden={!menuOpen}>
        <nav className="menu__nav container" aria-label="Menu">
          {nav.map((item, i) => (
            <a key={item.id} href={`#${item.id}`}>
              <small>{String(i + 1).padStart(2, '0')}</small>{item.label}
            </a>
          ))}
        </nav>
        <div className="menu__foot container">
          <p>Rua dos Ourives, 214<br />Vila Madalena, São Paulo</p>
          <a href={wa()} className="btn btn--brass" target="_blank" rel="noopener noreferrer">Agendar pelo WhatsApp</a>
        </div>
      </div>
    </>
  );
}
