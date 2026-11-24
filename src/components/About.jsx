import { img, stats } from '../data/content';
import { Counter, Eyebrow, SplitTitle } from './ui';

export default function About() {
  return (
    <section className="section about" id="casa">
      <div className="container about__grid">
        <div className="about__text">
          <Eyebrow num="01">A Casa</Eyebrow>
          <SplitTitle text="Aqui não tem pressa, fila ou" em="música alta." />
          <p className="about__lead" data-fade>
            Tem cadeira de couro, navalha afiada e um barbeiro que lembra como você gosta. A Navalha &amp; Carvalho nasceu em 2009 numa sala de 30 metros, com duas cadeiras e uma ideia simples: tratar barba e cabelo com o mesmo cuidado de um alfaiate.
          </p>
          <p data-fade>
            Dezessete anos depois, o endereço cresceu, mas o jeito continua o mesmo. Madeira de demolição, ferramentas afiadas à mão e atendimento com hora marcada. Você entra, senta e esquece o resto do dia por uma hora.
          </p>

          <ul className="stats" data-stagger>
            {stats.map((s) => (
              <li key={s.label}>
                <Counter value={s.value} decimals={s.decimals} suffix={s.suffix} />
                <span>{s.label}</span>
              </li>
            ))}
          </ul>
        </div>

        <figure className="about__media">
          <div className="frame" data-parallax>
            <img src={img('1503951914875-452162b0f3f1', 1100)} alt="Barbeiro fazendo a barba de um cliente com navalha" loading="lazy" />
          </div>
          <figcaption>Barba na navalha, do jeito que sempre foi.</figcaption>
        </figure>
      </div>
    </section>
  );
}
