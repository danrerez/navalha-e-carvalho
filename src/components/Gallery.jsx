import { gallery, img } from '../data/content';
import { ArrowUpRight, Eyebrow, SplitTitle } from './ui';

export default function Gallery() {
  return (
    <section className="section gallery" id="galeria">
      <div className="container">
        <div className="section__head section__head--row">
          <div>
            <Eyebrow num="04">Galeria</Eyebrow>
            <SplitTitle text="O ofício," em="de perto." />
          </div>
          <a href="https://instagram.com" className="link-arrow" target="_blank" rel="noopener noreferrer" data-fade>
            @navalhaecarvalho <ArrowUpRight />
          </a>
        </div>

        <div className="gallery__grid">
          {gallery.map((g, i) => (
            <figure className={`g g--${i + 1}`} key={g.photo}>
              <img src={img(g.photo, g.w)} alt={g.alt} loading="lazy" />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
