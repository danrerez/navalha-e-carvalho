/* Navalha & Carvalho | interações e animações */
(function () {
  'use strict';

  var root = document.documentElement;
  var body = document.body;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var hasGsap = !!(window.gsap && window.ScrollTrigger);
  var motion = hasGsap && !reduceMotion;
  var lenis = null;

  var ano = document.getElementById('ano');
  if (ano) ano.textContent = new Date().getFullYear();

  /* ---------- Rolagem suave ---------- */
  if (!reduceMotion && window.Lenis) {
    lenis = new window.Lenis({
      duration: 1.15,
      easing: function (t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); },
      smoothWheel: true
    });
    if (hasGsap) {
      gsap.registerPlugin(ScrollTrigger);
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add(function (time) { lenis.raf(time * 1000); });
      gsap.ticker.lagSmoothing(0);
    } else {
      var raf = function (time) { lenis.raf(time); requestAnimationFrame(raf); };
      requestAnimationFrame(raf);
    }
  } else if (hasGsap) {
    gsap.registerPlugin(ScrollTrigger);
  }

  function scrollToTarget(target) {
    var offset = target.id === 'inicio' ? 0 : -60;
    if (lenis) {
      lenis.scrollTo(target, { offset: offset, duration: 1.4 });
    } else {
      var y = target.getBoundingClientRect().top + window.pageYOffset + offset;
      window.scrollTo({ top: y, behavior: reduceMotion ? 'auto' : 'smooth' });
    }
  }

  /* ---------- Menu mobile ---------- */
  var burger = document.querySelector('.burger');
  var menu = document.getElementById('menu');

  function setMenu(open) {
    body.classList.toggle('menu-open', open);
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    menu.setAttribute('aria-hidden', String(!open));
    if (lenis) { open ? lenis.stop() : lenis.start(); }
    else { body.style.overflow = open ? 'hidden' : ''; }
  }

  burger.addEventListener('click', function () {
    setMenu(!body.classList.contains('menu-open'));
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && body.classList.contains('menu-open')) setMenu(false);
  });
  window.addEventListener('resize', function () {
    if (window.innerWidth >= 1100 && body.classList.contains('menu-open')) setMenu(false);
  });

  /* ---------- Âncoras ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var id = link.getAttribute('href');
      if (id.length < 2) return;
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      var wasOpen = body.classList.contains('menu-open');
      if (wasOpen) setMenu(false);
      setTimeout(function () { scrollToTarget(target); }, wasOpen ? 350 : 0);
    });
  });

  /* ---------- Header, progresso e botão flutuante ---------- */
  var header = document.querySelector('.header');
  var bar = document.querySelector('.progress span');
  var wa = document.querySelector('.wa-float');
  var lastY = 0;

  function onScroll() {
    var y = window.pageYOffset || root.scrollTop;
    var max = root.scrollHeight - window.innerHeight;
    header.classList.toggle('is-scrolled', y > 40);
    var goingDown = y > lastY && y > window.innerHeight * 0.6;
    if (!body.classList.contains('menu-open')) header.classList.toggle('is-hidden', goingDown);
    lastY = y;
    if (bar) bar.style.transform = 'scaleX(' + (max > 0 ? y / max : 0) + ')';
    if (wa) wa.classList.toggle('is-visible', y > window.innerHeight * 0.85);
  }
  if (lenis) lenis.on('scroll', onScroll);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Link ativo no menu ---------- */
  var navLinks = document.querySelectorAll('.nav a');
  if ('IntersectionObserver' in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        navLinks.forEach(function (a) {
          a.classList.toggle('is-active', a.getAttribute('href') === '#' + entry.target.id);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    document.querySelectorAll('main section[id]').forEach(function (s) { spy.observe(s); });
  }

  /* ---------- Contadores ---------- */
  function runCounter(el) {
    var end = parseFloat(el.dataset.count);
    var dec = parseInt(el.dataset.decimals || '0', 10);
    var suffix = el.dataset.suffix || '';
    var fmt = function (v) {
      return v.toLocaleString('pt-BR', { minimumFractionDigits: dec, maximumFractionDigits: dec }) +
        (suffix ? '<small>' + suffix + '</small>' : '');
    };
    if (reduceMotion) { el.innerHTML = fmt(end); return; }
    var start = null;
    var dur = 1800;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 4);
      el.innerHTML = fmt(end * eased);
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  var counters = document.querySelectorAll('[data-count]');
  if ('IntersectionObserver' in window) {
    var co = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { runCounter(entry.target); co.unobserve(entry.target); }
      });
    }, { threshold: 0.6 });
    counters.forEach(function (c) { co.observe(c); });
  } else {
    counters.forEach(runCounter);
  }

  /* ---------- Divide títulos em palavras ---------- */
  function splitWords(el) {
    var nodes = Array.prototype.slice.call(el.childNodes);
    nodes.forEach(function (node) {
      if (node.nodeType === 3) {
        var frag = document.createDocumentFragment();
        node.textContent.split(/(\s+)/).forEach(function (part) {
          if (!part) return;
          if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(' ')); return; }
          var w = document.createElement('span');
          w.className = 'w';
          var inner = document.createElement('span');
          inner.textContent = part;
          w.appendChild(inner);
          frag.appendChild(w);
        });
        node.parentNode.replaceChild(frag, node);
      } else if (node.nodeType === 1 && node.tagName !== 'BR') {
        splitWords(node);
      }
    });
  }

  /* ---------- Sem GSAP ou com movimento reduzido ---------- */
  var preloader = document.querySelector('.preloader');
  if (!motion) {
    if (preloader) preloader.classList.add('is-done');
    return;
  }

  document.querySelectorAll('[data-split]').forEach(splitWords);

  /* ---------- Preloader e entrada do hero ---------- */
  if (lenis) lenis.stop();
  window.scrollTo(0, 0);

  var count = { v: 0 };
  var countEl = document.querySelector('.preloader__count');
  var intro = gsap.timeline({ defaults: { ease: 'expo.out' } });

  intro
    .to('.preloader__mark circle, .preloader__mark path', { strokeDashoffset: 0, duration: 1.6, ease: 'power2.inOut', stagger: 0.12 }, 0)
    .from('.preloader__name, .preloader__since', { y: 20, autoAlpha: 0, duration: 1, stagger: 0.1 }, 0.3)
    .to(count, {
      v: 100, duration: 1.9, ease: 'power2.inOut',
      onUpdate: function () { countEl.textContent = Math.round(count.v); }
    }, 0)
    .to('.preloader__inner, .preloader__count', { autoAlpha: 0, y: -24, duration: 0.6, ease: 'power3.in' }, 2.0)
    .to('.preloader__panel--a', { yPercent: -100, duration: 1.1, ease: 'expo.inOut' }, 2.4)
    .to('.preloader__panel--b', { yPercent: 100, duration: 1.1, ease: 'expo.inOut' }, 2.4)
    .set(preloader, { pointerEvents: 'none' }, 2.6)
    .fromTo('.hero__media img', { scale: 1.25 }, { scale: 1, duration: 2.4, ease: 'expo.out' }, 2.4)
    .from('.header', { yPercent: -100, autoAlpha: 0, duration: 1.2, clearProps: 'transform,opacity,visibility' }, 2.9)
    .from('.hero__eyebrow', { y: 20, autoAlpha: 0, duration: 1 }, 2.9)
    .from('.hero__title .w > span', { yPercent: 115, rotate: 4, duration: 1.4, stagger: 0.07 }, 2.9)
    .from('.hero__lead, .hero__ctas > *', { y: 30, autoAlpha: 0, duration: 1.2, stagger: 0.1 }, 3.3)
    .from('.hero__meta', { autoAlpha: 0, duration: 1 }, 3.6)
    .add(function () {
      preloader.classList.add('is-done');
      if (lenis) lenis.start();
      ScrollTrigger.refresh();
    }, 3.5);

  /* Garante que o site nunca fique travado no preloader */
  setTimeout(function () {
    if (!preloader.classList.contains('is-done')) {
      intro.progress(1);
      preloader.classList.add('is-done');
      if (lenis) lenis.start();
    }
  }, 7000);

  /* ---------- Reveals no scroll ---------- */
  gsap.utils.toArray('[data-split]:not([data-split="hero"])').forEach(function (el) {
    gsap.from(el.querySelectorAll('.w > span'), {
      yPercent: 115,
      rotate: 3,
      duration: 1.3,
      ease: 'expo.out',
      stagger: 0.05,
      scrollTrigger: { trigger: el, start: 'top 85%' }
    });
  });

  gsap.utils.toArray('[data-fade]').forEach(function (el) {
    gsap.from(el, {
      y: 40,
      autoAlpha: 0,
      duration: 1.2,
      ease: 'expo.out',
      scrollTrigger: { trigger: el, start: 'top 88%' }
    });
  });

  gsap.utils.toArray('[data-stagger]').forEach(function (group) {
    gsap.from(group.children, {
      y: 50,
      autoAlpha: 0,
      duration: 1.2,
      ease: 'expo.out',
      stagger: 0.1,
      scrollTrigger: { trigger: group, start: 'top 85%' }
    });
  });

  /* Parallax */
  gsap.to('.hero__media img', {
    yPercent: 12,
    ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
  });
  gsap.to('.hero__content', {
    y: -80,
    autoAlpha: 0.2,
    ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'center center', end: 'bottom top', scrub: true }
  });
  gsap.utils.toArray('[data-parallax]').forEach(function (wrap) {
    var img = wrap.querySelector('img');
    gsap.fromTo(img, { yPercent: -8 }, {
      yPercent: 8,
      ease: 'none',
      scrollTrigger: { trigger: wrap.closest('section') || wrap, start: 'top bottom', end: 'bottom top', scrub: true }
    });
  });

  /* Imagem da Casa com cortina */
  gsap.from('.about__media .frame', {
    clipPath: 'inset(100% 0% 0% 0%)',
    duration: 1.6,
    ease: 'expo.inOut',
    scrollTrigger: { trigger: '.about__media', start: 'top 80%' }
  });

  /* Galeria com revelação em clip-path */
  gsap.utils.toArray('.g').forEach(function (fig, i) {
    gsap.fromTo(fig, { clipPath: 'inset(0% 0% 100% 0%)' }, {
      clipPath: 'inset(0% 0% 0% 0%)',
      duration: 1.4,
      ease: 'expo.inOut',
      delay: (i % 3) * 0.1,
      scrollTrigger: { trigger: fig, start: 'top 90%' }
    });
    gsap.fromTo(fig.querySelector('img'), { scale: 1.3 }, {
      scale: 1,
      duration: 1.8,
      ease: 'expo.out',
      delay: (i % 3) * 0.1,
      scrollTrigger: { trigger: fig, start: 'top 90%' }
    });
  });

  /* Assinatura da casa */
  gsap.from('.signature__media img', {
    scale: 1.3,
    duration: 1.8,
    ease: 'expo.out',
    scrollTrigger: { trigger: '.signature', start: 'top 80%' }
  });

  /* Ritual: rolagem horizontal fixada no desktop */
  var mm = gsap.matchMedia();
  mm.add('(min-width: 1024px)', function () {
    var section = document.querySelector('.ritual');
    var track = section.querySelector('.ritual__track');
    section.classList.add('is-horizontal');

    var distance = function () { return Math.max(0, track.scrollWidth - window.innerWidth); };

    var tween = gsap.to(track, {
      x: function () { return -distance(); },
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        pin: section.querySelector('.ritual__pin'),
        start: 'top top',
        end: function () { return '+=' + distance(); },
        scrub: 0.8,
        invalidateOnRefresh: true,
        anticipatePin: 1
      }
    });

    gsap.utils.toArray('.step__media img').forEach(function (img) {
      gsap.fromTo(img, { scale: 1.25 }, {
        scale: 1,
        ease: 'none',
        scrollTrigger: { trigger: img.parentNode, containerAnimation: tween, start: 'left right', end: 'right left', scrub: true }
      });
    });

    return function () {
      section.classList.remove('is-horizontal');
      gsap.set(track, { clearProps: 'transform' });
    };
  });

  mm.add('(max-width: 1023px)', function () {
    gsap.utils.toArray('.step').forEach(function (step) {
      gsap.from(step, {
        y: 50,
        autoAlpha: 0,
        duration: 1.2,
        ease: 'expo.out',
        scrollTrigger: { trigger: step, start: 'top 88%' }
      });
    });
  });

  /* Recalcula posições quando imagens terminam de carregar */
  window.addEventListener('load', function () { ScrollTrigger.refresh(); });
})();
