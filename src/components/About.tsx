import { aboutImg, stats } from '../data/content';

export default function About() {
  return (
    <section className="sec sec-coral" id="about">
      <div className="about-wrap">
        <div className="img-wrap fade">
          <img src={aboutImg} alt="Mickey Singh" />
          <div className="img-border" style={{ borderColor: 'rgba(255,255,255,0.2)' }} />
        </div>
        <div className="fade">
          <p className="sec-label">About</p>
          <h2 className="sec-title">
            Mickey
            <br />
            <em>Singh</em>
          </h2>
          <p className="bio-p">
            Mickey Singh is a <strong>SAG-AFTRA</strong> actor based in LA, trilingual in <strong>English, Hindi, and Punjabi</strong>.
            He excels as the leading man and romantic lead, the grounded, analytical character the room trusts when things go
            sideways, and the quietly dangerous, twisted one hiding in plain sight.
          </p>
          <p className="bio-p">
            He runs <strong>Sunset III</strong>, his own production company, writing, producing, and sometimes casting his own
            work — including his debut short <em>In Another Life, Tonight</em>, in post-production for summer 2026 — and trains
            continuously at <strong>The Acting Center</strong>, with additional training at <strong>Juilliard Extension</strong>,{' '}
            <strong>T. Schreiber Studio</strong> (Shakespeare), and the <strong>Meisner Technique Studio</strong>.
          </p>
          <p className="bio-p">
            Recent credits include the <strong>lead in <em>Between Places</em></strong> (Cinema 3.0, Dir. Amir Jaffar) and a
            recurring role in <em>Strings Attached</em> Season 2.
          </p>
          <div className="stats-grid">
            {stats.map((s) => (
              <div className="stat" key={s.l}>
                <div className="stat-n">{s.n}</div>
                <div className="stat-l">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
