import { useCallback, useEffect, useRef, useState } from 'react';
import useMotion from './hooks/useMotion';
import Preloader from './components/Preloader';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Ritual from './components/Ritual';
import Gallery from './components/Gallery';
import Team from './components/Team';
import Club from './components/Club';
import Reviews from './components/Reviews';
import Contact from './components/Contact';
import Footer, { ScrollUI } from './components/Footer';

export default function App() {
  const [introDone, setIntroDone] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lenisRef = useRef(null);

  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const onIntroDone = useCallback(() => setIntroDone(true), []);

  useMotion({ lenisRef, onIntroDone, closeMenu });

  /* Menu mobile: trava a rolagem e fecha com Esc ou ao virar desktop */
  useEffect(() => {
    document.body.classList.toggle('menu-open', menuOpen);
    const lenis = lenisRef.current;
    if (lenis) menuOpen ? lenis.stop() : lenis.start();
    else document.body.style.overflow = menuOpen ? 'hidden' : '';

    const onKey = (e) => { if (e.key === 'Escape') setMenuOpen(false); };
    const onResize = () => { if (window.innerWidth >= 1100) setMenuOpen(false); };
    window.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
    };
  }, [menuOpen]);

  return (
    <>
      {!introDone && <Preloader />}
      <ScrollUI />
      <Header menuOpen={menuOpen} onToggleMenu={() => setMenuOpen((o) => !o)} />
      <main>
        <Hero />
        <About />
        <Services />
        <Ritual />
        <Gallery />
        <Team />
        <Club />
        <Reviews />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
