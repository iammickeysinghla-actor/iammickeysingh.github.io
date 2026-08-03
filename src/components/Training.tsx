import { training } from '../data/content';

export default function Training() {
  return (
    <section className="sec sec-teal" id="training">
      <div className="train-wrap">
        <p className="sec-label fade">Training</p>
        <h2 className="sec-title fade">
          The <em>Foundation</em>
        </h2>
        {training.map((t) => (
          <div className="tr fade" key={t.school}>
            <div>
              <div className="tr-school">{t.school}</div>
              <div className="tr-course">{t.course}</div>
            </div>
            <div className="tr-year">{t.year}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
