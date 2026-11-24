# Navalha & Carvalho

Site institucional de uma barbearia clássica e rústica (marca fictícia), feito como projeto acadêmico.

- React 18 + Vite
- GSAP + ScrollTrigger para animações e Lenis para rolagem suave
- Layout mobile-first e responsivo
- Hospedado na Vercel

## Estrutura

```
src/
  App.jsx              monta a página e controla o menu mobile
  components/          uma seção por componente (Hero, Services, Ritual...)
  data/content.js      textos, preços, fotos e links em um só lugar
  hooks/useMotion.js   rolagem suave, preloader e animações de scroll
  styles/global.css    estilos e tokens de cor/tipografia
```

## Rodar localmente

```bash
npm install
npm run dev
```

Build de produção: `npm run build` (gera a pasta `dist`).

Fotos: [Unsplash](https://unsplash.com).
