import { Fragment } from 'react';
import { img, tickerItems, wa } from '../data/content';
import { ArrowIcon, SplitTitle } from './ui';

const HERO = '1585747860715-2ba37e788b70';

export default function Hero() {
  return (
    <>
      <section className="hero" id="inicio">
        <div className="hero__media">
          <img
            src={img(HERO, 1800)}
            srcSet={`${img(HERO, 800)} 800w, ${img(HERO, 1400)} 1400w, ${img(HERO, 2200)} 2200w`}
            sizes="100vw"
            alt="Interior da barbearia com parede de tijolos, luminárias pendentes e cadeiras de couro"
            fetchpriority="high"
          />
        </div>
        <div className="hero__shade" />

        <div className="hero__content container">
          <p className="eyebrow hero__eyebrow">Barbearia clássica · Desde 2009</p>
          <SplitTitle as="h1" className="hero__title" text="Tradição não sai" em="de moda." hero />
          <div className="hero__bottom">
            <p className="hero__lead">
              Corte, barba na navalha e uma hora que é só sua. Para o homem que já sabe o que quer e não tem tempo a perder.
            </p>
            <div className="hero__ctas">
              <a href={wa()} className="btn btn--brass" target="_blank" rel="noopener noreferrer">
                Agendar horário <ArrowIcon />
              </a>
              <a href="#servicos" className="btn btn--ghost">Ver serviços</a>
            </div>
          </div>
        </div>

        <div className="hero__meta container" aria-hidden="true">
          <span>Ter a Sáb</span>
          <span className="hero__scroll">Role<i /></span>
          <span>Vila Madalena, SP</span>
        </div>
      </section>

      <div className="ticker" aria-hidden="true">
        <div className="ticker__track">
          {[...tickerItems, ...tickerItems].map((t, i) => (
            <Fragment key={i}>
              <span>{t}</span><b>✦</b>
            </Fragment>
          ))}
        </div>
      </div>
    </>
  );
}
