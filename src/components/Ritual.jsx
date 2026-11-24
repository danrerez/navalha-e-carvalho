import { img, steps } from '../data/content';
import { Eyebrow, SplitTitle } from './ui';

export default function Ritual() {
  return (
    <section className="ritual" id="ritual">
      <div className="ritual__pin">
        <div className="ritual__head container">
          <Eyebrow num="03">O Ritual</Eyebrow>
          <SplitTitle text="Uma hora que é" em="só sua." />
        </div>
        <div className="ritual__track">
          {steps.map((s, i) => (
            <article className="step" key={s.title}>
              <div className="step__media">
                <img src={img(s.photo, 900)} alt={s.alt} loading="lazy" />
              </div>
              <span className="step__num">{String(i + 1).padStart(2, '0')}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
