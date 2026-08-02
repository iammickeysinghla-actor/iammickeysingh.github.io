import { useEffect, useRef, useState } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { filmCredits, theaterCredits, tvCredits, type Credit } from '../data/content';
import { useScrollRig } from '../hooks/useScrollRig';

type Tab = 'film' | 'tv' | 'theater';

function CreditRow({ credit }: { credit: Credit }) {
  return (
    <div className="cr fade">
      <div>
        <div className="cr-title">{credit.title}</div>
        <div className="cr-sub">{credit.sub}</div>
      </div>
      <div className="cr-role">{credit.role}</div>
    </div>
  );
}

export default function Credits({ immersive }: { immersive: boolean }) {
  const [tab, setTab] = useState<Tab>('film');
  const wrapRef = useRef<HTMLDivElement>(null);

  useScrollRig(wrapRef, immersive, [tab]);

  useEffect(() => {
    // Panels swap via display:none, so ScrollTrigger needs a nudge once the
    // newly visible rows have real layout to measure.
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [tab]);

  return (
    <section className="sec" id="credits" style={{ background: 'var(--teal)' }}>
      <div className="credits-wrap" ref={wrapRef}>
        <p className="sec-label fade">Selected Credits</p>
        <h2 className="sec-title fade">
          Film &amp; <em>Television</em>
        </h2>
        <div className="tabs fade">
          <button className={`tab ${tab === 'film' ? 'on' : ''}`} onClick={() => setTab('film')}>
            Film
          </button>
          <button className={`tab ${tab === 'tv' ? 'on' : ''}`} onClick={() => setTab('tv')}>
            Television
          </button>
          <button className={`tab ${tab === 'theater' ? 'on' : ''}`} onClick={() => setTab('theater')}>
            Theater
          </button>
        </div>
        <div className={`panel ${tab === 'film' ? 'on' : ''}`}>
          {filmCredits.map((c) => (
            <CreditRow credit={c} key={c.title} />
          ))}
        </div>
        <div className={`panel ${tab === 'tv' ? 'on' : ''}`}>
          {tvCredits.map((c) => (
            <CreditRow credit={c} key={c.title} />
          ))}
        </div>
        <div className={`panel ${tab === 'theater' ? 'on' : ''}`}>
          {theaterCredits.map((c) => (
            <CreditRow credit={c} key={c.title} />
          ))}
        </div>
      </div>
    </section>
  );
}
