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
            Mickey Singh is a Los Angeles-based actor, writer, and producer, and <strong>SAG-AFTRA member</strong>, whose work
            spans independent film, television, and theater across three languages. Trained at the <strong>Meisner Technique Studio</strong> in San Francisco (two
            years), <strong>Juilliard Extension</strong>, <strong>T. Schreiber Studio</strong> (Shakespeare), and ongoing scene
            study at <strong>The Acting Center</strong> in Los Angeles.
          </p>
          <p className="bio-p">
            Recent credits include the <strong>lead in <em>Between Places</em></strong> (Cinema 3.0, Dir. Amir Jaffar) and a
            recurring role in <em>Strings Attached</em> Season 2. As founder of <strong>Sunset III</strong>, he
            develops original work — including his debut short <em>In Another Life, Tonight</em>, in post-production for
            summer 2026.
          </p>
          <p className="bio-p">
            He performs fluently in <strong>English, Hindi, and Punjabi</strong>.
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
