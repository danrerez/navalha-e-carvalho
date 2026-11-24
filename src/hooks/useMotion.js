import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

/*
  Rolagem suave (Lenis), âncoras, preloader e animações de scroll (GSAP).
  Roda uma vez depois que a página monta e desfaz tudo ao desmontar.
*/
export default function useMotion({ lenisRef, onIntroDone, closeMenu }) {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let lenis = null;
    let tickerFn = null;

    /* Rolagem suave */
    if (!reduce) {
      lenis = new Lenis({
        duration: 1.15,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true
      });
      lenis.on('scroll', ScrollTrigger.update);
      tickerFn = (time) => lenis.raf(time * 1000);
      gsap.ticker.add(tickerFn);
      gsap.ticker.lagSmoothing(0);
    }
    lenisRef.current = lenis;

    /* Âncoras internas com rolagem suave */
    const onClick = (e) => {
      const link = e.target.closest('a[href^="#"]');
      if (!link) return;
      const id = link.getAttribute('href');
      const target = id.length > 1 && document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const wasOpen = document.body.classList.contains('menu-open');
      closeMenu();
      const offset = target.id === 'inicio' ? 0 : -60;
      setTimeout(() => {
        if (lenisRef.current) lenisRef.current.scrollTo(target, { offset, duration: 1.4 });
        else window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY + offset, behavior: reduce ? 'auto' : 'smooth' });
      }, wasOpen ? 350 : 0);
    };
    document.addEventListener('click', onClick);

    if (reduce) {
      onIntroDone();
      return () => document.removeEventListener('click', onClick);
    }

    const ctx = gsap.context(() => {
      /* Preloader e entrada do hero */
      lenis.stop();
      window.scrollTo(0, 0);
      const count = { v: 0 };
      const countEl = document.querySelector('.preloader__count');

      gsap.timeline({ defaults: { ease: 'expo.out' } })
        .to('.preloader__mark circle, .preloader__mark path', { strokeDashoffset: 0, duration: 1.6, ease: 'power2.inOut', stagger: 0.12 }, 0)
        .from('.preloader__name, .preloader__since', { y: 20, autoAlpha: 0, duration: 1, stagger: 0.1 }, 0.3)
        .to(count, {
          v: 100, duration: 1.9, ease: 'power2.inOut',
          onUpdate: () => { if (countEl) countEl.textContent = Math.round(count.v); }
        }, 0)
        .to('.preloader__inner, .preloader__count', { autoAlpha: 0, y: -24, duration: 0.6, ease: 'power3.in' }, 2.0)
        .to('.preloader__panel--a', { yPercent: -100, duration: 1.1, ease: 'expo.inOut' }, 2.4)
        .to('.preloader__panel--b', { yPercent: 100, duration: 1.1, ease: 'expo.inOut' }, 2.4)
        .set('.preloader', { pointerEvents: 'none' }, 2.6)
        .fromTo('.hero__media img', { scale: 1.25 }, { scale: 1, duration: 2.4 }, 2.4)
        .from('.header', { yPercent: -100, autoAlpha: 0, duration: 1.2, clearProps: 'transform,opacity,visibility' }, 2.9)
        .from('.hero__eyebrow', { y: 20, autoAlpha: 0, duration: 1 }, 2.9)
        .from('.hero__title .w > span', { yPercent: 115, rotate: 4, duration: 1.4, stagger: 0.07 }, 2.9)
        .from('.hero__lead, .hero__ctas > *', { y: 30, autoAlpha: 0, duration: 1.2, stagger: 0.1 }, 3.3)
        .from('.hero__meta', { autoAlpha: 0, duration: 1 }, 3.6)
        .add(() => {
          lenis.start();
          onIntroDone();
          ScrollTrigger.refresh();
        }, 3.5);

      /* Títulos palavra por palavra */
      gsap.utils.toArray('[data-split]:not([data-split="hero"])').forEach((el) => {
        gsap.from(el.querySelectorAll('.w > span'), {
          yPercent: 115, rotate: 3, duration: 1.3, ease: 'expo.out', stagger: 0.05,
          scrollTrigger: { trigger: el, start: 'top 85%' }
        });
      });

      gsap.utils.toArray('[data-fade]').forEach((el) => {
        gsap.from(el, {
          y: 40, autoAlpha: 0, duration: 1.2, ease: 'expo.out',
          scrollTrigger: { trigger: el, start: 'top 88%' }
        });
      });

      gsap.utils.toArray('[data-stagger]').forEach((group) => {
        gsap.from(group.children, {
          y: 50, autoAlpha: 0, duration: 1.2, ease: 'expo.out', stagger: 0.1,
          scrollTrigger: { trigger: group, start: 'top 85%' }
        });
      });

      /* Parallax */
      gsap.to('.hero__media img', {
        yPercent: 12, ease: 'none',
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
      });
      gsap.to('.hero__content', {
        y: -80, autoAlpha: 0.2, ease: 'none',
        scrollTrigger: { trigger: '.hero', start: 'center center', end: 'bottom top', scrub: true }
      });
      gsap.utils.toArray('[data-parallax]').forEach((wrap) => {
        gsap.fromTo(wrap.querySelector('img'), { yPercent: -8 }, {
          yPercent: 8, ease: 'none',
          scrollTrigger: { trigger: wrap.closest('section') || wrap, start: 'top bottom', end: 'bottom top', scrub: true }
        });
      });

      /* Cortinas de imagem */
      gsap.from('.about__media .frame', {
        clipPath: 'inset(100% 0% 0% 0%)', duration: 1.6, ease: 'expo.inOut',
        scrollTrigger: { trigger: '.about__media', start: 'top 80%' }
      });
      gsap.utils.toArray('.g').forEach((fig, i) => {
        const delay = (i % 3) * 0.1;
        gsap.fromTo(fig, { clipPath: 'inset(0% 0% 100% 0%)' }, {
          clipPath: 'inset(0% 0% 0% 0%)', duration: 1.4, ease: 'expo.inOut', delay,
          scrollTrigger: { trigger: fig, start: 'top 90%' }
        });
        gsap.fromTo(fig.querySelector('img'), { scale: 1.3 }, {
          scale: 1, duration: 1.8, ease: 'expo.out', delay,
          scrollTrigger: { trigger: fig, start: 'top 90%' }
        });
      });
      gsap.from('.signature__media img', {
        scale: 1.3, duration: 1.8, ease: 'expo.out',
        scrollTrigger: { trigger: '.signature', start: 'top 80%' }
      });

      /* Ritual: rolagem horizontal fixada no desktop */
      const mm = gsap.matchMedia();
      mm.add('(min-width: 1024px)', () => {
        const section = document.querySelector('.ritual');
        const track = section.querySelector('.ritual__track');
        section.classList.add('is-horizontal');
        const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);

        const tween = gsap.to(track, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            pin: section.querySelector('.ritual__pin'),
            start: 'top top',
            end: () => '+=' + distance(),
            scrub: 0.8,
            invalidateOnRefresh: true,
            anticipatePin: 1
          }
        });

        gsap.utils.toArray('.step__media img').forEach((img) => {
          gsap.fromTo(img, { scale: 1.25 }, {
            scale: 1, ease: 'none',
            scrollTrigger: { trigger: img.parentNode, containerAnimation: tween, start: 'left right', end: 'right left', scrub: true }
          });
        });

        return () => {
          section.classList.remove('is-horizontal');
          gsap.set(track, { clearProps: 'transform' });
        };
      });
      mm.add('(max-width: 1023px)', () => {
        gsap.utils.toArray('.step').forEach((step) => {
          gsap.from(step, {
            y: 50, autoAlpha: 0, duration: 1.2, ease: 'expo.out',
            scrollTrigger: { trigger: step, start: 'top 88%' }
          });
        });
      });
    });

    /* Garante que o site nunca fique travado no preloader */
    const safety = setTimeout(() => {
      if (lenis) lenis.start();
      onIntroDone();
    }, 7000);

    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener('load', onLoad);

    return () => {
      clearTimeout(safety);
      window.removeEventListener('load', onLoad);
      document.removeEventListener('click', onClick);
      ctx.revert();
      if (tickerFn) gsap.ticker.remove(tickerFn);
      if (lenis) lenis.destroy();
      lenisRef.current = null;
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
}
