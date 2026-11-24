import { img, services, wa } from '../data/content';
import { Eyebrow, SplitTitle } from './ui';

export default function Services() {
  return (
    <section className="section services" id="servicos">
      <div className="container">
        <div className="section__head">
          <Eyebrow num="02">Serviços</Eyebrow>
          <SplitTitle text="Feito à mão," em="sem atalho." />
          <p className="section__sub" data-fade>Cada serviço tem o tempo que precisa. Nada de encaixe, nada de correria.</p>
        </div>

        <ul className="menu-list" data-stagger>
          {services.map((s) => (
            <li className="service" key={s.name}>
              <div className="service__row">
                <h3>{s.name}</h3><i />
                <span className="service__price">R$ {s.price}</span>
              </div>
              <p>{s.desc}</p>
              <small>{s.time}</small>
            </li>
          ))}
        </ul>

        <article className="signature" data-fade>
          <div className="signature__media">
            <img src={img('1512690459411-b9245aed614b', 900)} alt="Cadeira de barbeiro de couro marrom capitonê" loading="lazy" />
          </div>
          <div className="signature__body">
            <Eyebrow>Assinatura da casa</Eyebrow>
            <h3>Experiência Carvalho</h3>
            <p>
              Corte, barba na navalha, barboterapia e uma dose de single malt para acompanhar. Duas horas para sair outro homem, ou o mesmo, só que bem melhor.
            </p>
            <div className="signature__foot">
              <span className="signature__price">R$ 220 <small>· 2h</small></span>
              <a href={wa('Quero agendar a Experiência Carvalho.')} className="btn btn--brass" target="_blank" rel="noopener noreferrer">
                Reservar experiência
              </a>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
