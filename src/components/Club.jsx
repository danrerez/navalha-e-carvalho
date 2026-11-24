import { img, plans, wa } from '../data/content';
import { Eyebrow, SplitTitle } from './ui';

export default function Club() {
  return (
    <section className="section club" id="clube">
      <div className="club__bg" data-parallax>
        <img src={img('1520338661084-680395057c93', 1800)} alt="" loading="lazy" />
      </div>
      <div className="container club__grid">
        <div className="club__intro">
          <Eyebrow num="06">Clube N&amp;C</Eyebrow>
          <SplitTitle text="Para quem não" em="abre mão." />
          <p data-fade>
            Assinatura mensal com horário garantido e o visual sempre em dia. Sem fidelidade, sem letra miúda. Cancela quando quiser.
          </p>
        </div>

        <div className="plans" data-stagger>
          {plans.map((p) => (
            <article className={`plan${p.featured ? ' plan--featured' : ''}`} key={p.name}>
              {p.featured && <span className="plan__tag">Mais escolhido</span>}
              <h3>{p.name}</h3>
              <p className="plan__price"><small>R$</small>{p.price}<span>/mês</span></p>
              <ul>
                {p.items.map((it) => <li key={it}>{it}</li>)}
              </ul>
              <a
                href={wa(`Quero assinar o plano ${p.name}.`)}
                className={`btn ${p.featured ? 'btn--brass' : 'btn--ghost'}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {p.cta}
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
