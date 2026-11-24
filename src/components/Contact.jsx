import { hours, wa } from '../data/content';
import { Eyebrow, SplitTitle, WhatsAppIcon } from './ui';

export default function Contact() {
  return (
    <section className="section contact" id="contato">
      <div className="container contact__grid">
        <div className="contact__text">
          <Eyebrow num="08">Visite a casa</Eyebrow>
          <SplitTitle className="title title--xl" text="Seu horário" em="está esperando." />
          <p className="contact__lead" data-fade>
            Agende pelo WhatsApp em menos de um minuto. A gente confirma na hora e guarda sua cadeira.
          </p>

          <div className="contact__info" data-stagger>
            <div>
              <h3>Endereço</h3>
              <p>Rua dos Ourives, 214<br />Vila Madalena, São Paulo, SP</p>
              <p className="muted">Estacionamento conveniado na rua de trás</p>
            </div>
            <div>
              <h3>Horários</h3>
              <ul className="hours">
                {hours.map(([day, time]) => (
                  <li key={day}><span>{day}</span><span>{time}</span></li>
                ))}
              </ul>
            </div>
            <div>
              <h3>Contato</h3>
              <p>
                <a href="tel:+551130000000">(11) 3000-0000</a><br />
                <a href="mailto:contato@navalhaecarvalho.com.br">contato@navalhaecarvalho.com.br</a>
              </p>
            </div>
          </div>

          <a href={wa()} className="btn btn--brass btn--lg" target="_blank" rel="noopener noreferrer" data-fade>
            <WhatsAppIcon className="ico-wa" /> Agendar pelo WhatsApp
          </a>
        </div>

        <div className="contact__map" data-fade>
          <iframe
            title="Mapa com a localização da barbearia na Vila Madalena"
            src="https://www.google.com/maps?q=Vila%20Madalena%2C%20S%C3%A3o%20Paulo&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}
