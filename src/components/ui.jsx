import { useEffect, useRef, useState } from 'react';

/* Título dividido em palavras para a animação de entrada */
export function SplitTitle({ as: Tag = 'h2', className = 'title', text, em, hero = false }) {
  const words = (str) =>
    str.split(/\s+/).filter(Boolean).map((w, i) => (
      <span className="w" key={i}><span>{w}</span></span>
    )).reduce((acc, el, i) => (i ? [...acc, ' ', el] : [el]), []);

  return (
    <Tag className={className} data-split={hero ? 'hero' : ''}>
      {words(text)}
      {em && <>{' '}<em>{words(em)}</em></>}
    </Tag>
  );
}

export function Eyebrow({ num, children, className = '' }) {
  return (
    <p className={`eyebrow ${className}`.trim()}>
      {num && <span>{num}</span>} {children}
    </p>
  );
}

/* Contador animado quando entra na tela */
export function Counter({ value, decimals = 0, suffix = '' }) {
  const ref = useRef(null);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const el = ref.current;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) { setCurrent(value); return; }
    let raf;
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const tick = (now) => {
        const p = Math.min((now - start) / 1800, 1);
        setCurrent(value * (1 - Math.pow(1 - p, 4)));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, { threshold: 0.6 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [value]);

  return (
    <strong ref={ref}>
      {current.toLocaleString('pt-BR', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}
      {suffix && <small>{suffix}</small>}
    </strong>
  );
}

export const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
);

export const ArrowUpRight = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9" /></svg>
);

export const WhatsAppIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.4.1-.2 0-.3 0-.5l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.1 5.1 0 0 0 1.1 2.7 11.6 11.6 0 0 0 4.4 3.9c1.6.7 2.3.8 3.1.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1 0-.3-.1-.5-.2Z" />
  </svg>
);
