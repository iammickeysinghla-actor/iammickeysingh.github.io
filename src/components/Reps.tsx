import { reps } from '../data/content';

export default function Reps() {
  return (
    <section className="sec" id="representation" style={{ background: 'var(--teal-mid)' }}>
      <p className="sec-label fade">Representation</p>
      <h2 className="sec-title fade">
        The <em>Team</em>
      </h2>
      <div className="reps-grid fade">
        {reps.map((r) => (
          <div className="rep-card" key={r.category}>
            <div className="rep-cat">{r.category}</div>
            {r.website ? (
              <a href={r.website} target="_blank" rel="noopener noreferrer" className="rep-agency">
                {r.agency}
              </a>
            ) : (
              <div className="rep-agency">{r.agency}</div>
            )}
            <div className="rep-name">{r.repName}</div>
            <a href={`tel:${r.phone}`} className="rep-line">
              {r.phone}
            </a>
            <a href={`mailto:${r.email}`} className="rep-line">
              {r.email}
            </a>
            <div className="rep-line rep-address">{r.address}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
