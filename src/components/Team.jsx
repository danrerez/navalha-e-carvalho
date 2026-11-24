import { barbers, img } from '../data/content';
import { Eyebrow, SplitTitle } from './ui';

export default function Team() {
  return (
    <section className="section team" id="barbeiros">
      <div className="container">
        <div className="section__head">
          <Eyebrow num="05">Mestres barbeiros</Eyebrow>
          <SplitTitle text="Mãos que conhecem" em="o ofício." />
        </div>

        <div className="team__grid" data-stagger>
          {barbers.map((b) => (
            <article className="barber" key={b.name}>
              <div className="barber__media">
                <img src={img(b.photo, 800)} alt={`${b.name} trabalhando na barbearia`} loading="lazy" />
              </div>
              <div className="barber__info">
                <h3>{b.name}</h3>
                <p className="barber__role">{b.role}</p>
                <p>{b.bio}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
