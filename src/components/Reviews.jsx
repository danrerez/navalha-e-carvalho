import { reviews } from '../data/content';
import { Eyebrow, SplitTitle } from './ui';

export default function Reviews() {
  return (
    <section className="section reviews" id="depoimentos">
      <div className="container">
        <div className="section__head">
          <Eyebrow num="07">Quem senta, volta</Eyebrow>
          <SplitTitle text="A melhor propaganda" em="é a cadeira cheia." />
        </div>

        <div className="reviews__grid" data-stagger>
          {reviews.map((r) => (
            <figure className="review" key={r.name}>
              <div className="review__stars" aria-label="5 estrelas">★★★★★</div>
              <blockquote>{r.quote}</blockquote>
              <figcaption><strong>{r.name}</strong> {r.info}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
