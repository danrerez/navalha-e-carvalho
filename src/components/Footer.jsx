import { useEffect, useState } from 'react';
import { wa } from '../data/content';
import { WhatsAppIcon } from './ui';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <p className="footer__big">Navalha <em>&amp;</em> Carvalho</p>
        <div className="footer__row">
          <p>Barbearia clássica desde 2009.<br />Rua dos Ourives, 214, Vila Madalena, São Paulo.</p>
          <nav aria-label="Rodapé">
            <a href="#servicos">Serviços</a>
            <a href="#clube">Clube</a>
            <a href="#contato">Contato</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
          </nav>
          <a href="#inicio" className="to-top">
            Voltar ao topo <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 19V5M6 11l6-6 6 6" /></svg>
          </a>
        </div>
        <p className="footer__copy">
          © {new Date().getFullYear()} Navalha &amp; Carvalho. Projeto acadêmico, marca fictícia. Fotos: Unsplash.
        </p>
      </div>
    </footer>
  );
}

/* Barra de progresso e botão flutuante do WhatsApp */
export function ScrollUI() {
  const [showWa, setShowWa] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? y / max : 0);
      setShowWa(y > window.innerHeight * 0.85);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <div className="progress" aria-hidden="true">
        <span style={{ transform: `scaleX(${progress})` }} />
      </div>
      <a
        href={wa()}
        className={`wa-float${showWa ? ' is-visible' : ''}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Agendar pelo WhatsApp"
      >
        <WhatsAppIcon />
      </a>
    </>
  );
}
