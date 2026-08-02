import { channelUrl, comingSoon, films } from '../data/content';
import { useYoutubeStats } from '../hooks/useYoutubeStats';
import DeckCarousel, { type CarouselItem } from './DeckCarousel';

function FilmThumbContent({
  imgSrc,
  alt,
  badge,
  title,
  meta,
}: {
  imgSrc: string;
  alt: string;
  badge?: string;
  title: string;
  meta: string;
}) {
  return (
    <>
      <div className="film-thumb">
        <img src={imgSrc} alt={alt} />
        <div className="film-overlay">
          <div className="film-play" />
        </div>
        {badge && <div className="film-badge">{badge}</div>}
      </div>
      <div className="film-info">
        <div className="film-title">{title}</div>
        <div className="film-meta">{meta}</div>
      </div>
    </>
  );
}

function ChannelTileContent({ totalViews }: { totalViews: string }) {
  return (
    <>
      <div
        className="film-thumb"
        style={{ background: 'var(--teal-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 180 }}
      >
        <div style={{ textAlign: 'center', padding: 24 }}>
          <div style={{ fontFamily: 'var(--serif)', fontSize: '2.5rem', color: 'var(--coral)', marginBottom: 8 }}>{totalViews}</div>
          <div style={{ fontSize: '0.62rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--muted)' }}>Total Views</div>
        </div>
      </div>
      <div className="film-info">
        <div className="film-title">View Full Channel</div>
        <div className="film-meta">youtube.com/@iammickeysingh</div>
      </div>
    </>
  );
}

export default function FilmsSection({ immersive }: { immersive: boolean }) {
  const { videoViewsLabel, totalViewsLabel } = useYoutubeStats();

  const filmSlides: CarouselItem[] = films.map((film) => ({
    key: film.id,
    href: `https://youtu.be/${film.id}`,
    ariaLabel: film.title,
    content: (
      <FilmThumbContent
        imgSrc={`https://img.youtube.com/vi/${film.id}/maxresdefault.jpg`}
        alt={film.alt}
        badge={videoViewsLabel(film.id, film.isNew) ?? (film.isNew ? `New · ${film.fallbackViews}` : film.fallbackViews)}
        title={film.title}
        meta={film.role}
      />
    ),
  }));

  const channelSlide: CarouselItem = {
    key: 'channel',
    href: channelUrl,
    ariaLabel: 'View full channel',
    content: <ChannelTileContent totalViews={totalViewsLabel()} />,
  };

  const slides = [...filmSlides, channelSlide];

  return (
    <section className="sec" id="films" style={{ background: 'var(--teal-mid)' }}>
      <div style={{ maxWidth: 1060, margin: '0 auto' }}>
        <div style={{ marginBottom: 28 }} className="fade">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'nowrap', gap: 16 }}>
            <div>
              <p className="sec-label" style={{ color: 'var(--coral-light)' }}>
                Short Films
              </p>
              <h2 className="sec-title" style={{ marginBottom: 0 }}>
                On <em>Screen</em>
              </h2>
            </div>
            <a href={channelUrl} target="_blank" rel="noopener noreferrer" className="btn-g" style={{ flexShrink: 0, marginTop: 4 }}>
              View All ↗
            </a>
          </div>
        </div>
        <p className="fade" style={{ fontSize: '0.85rem', color: 'var(--muted)', lineHeight: 1.9, maxWidth: 560, marginBottom: 32 }}>
          Original films written, directed, and produced under{' '}
          <strong style={{ color: '#1c1c1c' }}>Sunset III</strong> — Mickey Singh's production company.
        </p>

        {immersive ? (
          <div className="fade">
            <DeckCarousel items={slides} cardClassName="film-card" variant="flat" />
          </div>
        ) : (
          <div
            className="films-grid"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 2, background: 'var(--teal-mid)', border: '1px solid var(--teal-mid)' }}
          >
            {slides.map((slide) => (
              <a key={slide.key} href={slide.href} target="_blank" rel="noopener noreferrer" className="film-card fade">
                {slide.content}
              </a>
            ))}
          </div>
        )}

        <div
          className="coming-soon-bar fade"
          style={{
            marginTop: 40,
            paddingTop: 36,
            borderTop: '1px solid rgba(24,18,12,0.15)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 16,
          }}
        >
          <div>
            <div
              style={{
                fontSize: '0.58rem',
                letterSpacing: '0.28em',
                textTransform: 'uppercase',
                color: 'var(--coral-light)',
                marginBottom: 8,
                display: 'flex',
                alignItems: 'center',
                gap: 10,
              }}
            >
              <span style={{ display: 'block', width: 18, height: 1, background: 'var(--coral-light)' }} />
              {comingSoon.eyebrow}
            </div>
            <div style={{ fontFamily: 'var(--serif)', fontSize: '1.8rem', fontWeight: 300, color: '#1c1c1c', marginBottom: 6, fontStyle: 'italic' }}>
              {comingSoon.title}
            </div>
            <div style={{ fontSize: '0.62rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--muted)' }}>{comingSoon.meta}</div>
          </div>
          <div
            style={{
              fontSize: '0.6rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#1c1c1c',
              border: '1px solid rgba(24,18,12,0.25)',
              padding: '11px 22px',
              whiteSpace: 'nowrap',
            }}
          >
            Coming Soon
          </div>
        </div>
      </div>
    </section>
  );
}
