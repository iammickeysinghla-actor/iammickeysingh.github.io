import { channelUrl, reelVideoId } from '../data/content';

export default function Reel() {
  return (
    <section className="sec sec-teal" id="reel">
      <div className="reel-inner">
        <div className="reel-head fade">
          <div>
            <p className="sec-label">Reel</p>
            <h2 className="sec-title">
              The <em>Work</em>
            </h2>
          </div>
          <a href={channelUrl} target="_blank" rel="noopener noreferrer" className="btn-g">
            Short Films ↗
          </a>
        </div>
        <div className="reel-frame fade">
          <a
            href={`https://youtu.be/${reelVideoId}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 20,
              textDecoration: 'none',
              background: 'var(--teal-dark)',
            }}
          >
            <img
              src={`https://img.youtube.com/vi/${reelVideoId}/maxresdefault.jpg`}
              alt="Mickey Singh Demo Reel"
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7 }}
            />
            <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
              <div
                style={{
                  width: 72,
                  height: 72,
                  border: '2px solid #fff',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'rgba(139,26,42,0.85)',
                  backdropFilter: 'blur(4px)',
                }}
              >
                <div style={{ borderLeft: '22px solid #fff', borderTop: '13px solid transparent', borderBottom: '13px solid transparent', marginLeft: 5 }} />
              </div>
              <p style={{ fontSize: '0.65rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#fff', opacity: 0.9 }}>
                Watch Demo Reel
              </p>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
