import { contactEmail, socials } from '../data/content';

export default function Contact() {
  return (
    <section className="sec sec-coral" id="contact">
      <div className="contact-wrap">
        <p className="sec-label fade" style={{ color: 'rgba(255,190,195,0.8)' }}>
          Contact
        </p>
        <h2 className="sec-title fade">
          Let's <em>Work</em>
        </h2>
        <p className="contact-body fade">
          For casting inquiries, representation, or collaboration —<br />
          reach out directly.
        </p>
        <a href={`mailto:${contactEmail}`} className="c-email fade">
          {contactEmail}
        </a>
        <div className="socials fade" style={{ display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap', marginTop: 0 }}>
          {socials.map((s) => (
            <a href={s.href} target="_blank" rel="noopener noreferrer" key={s.label}>
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
