import { useModalEscape } from '../hooks/useModalEscape';

interface VideoModalProps {
  videoId: string | null;
  onClose: () => void;
}

/** Plays a YouTube video inline in a lightbox instead of redirecting offsite. */
export default function VideoModal({ videoId, onClose }: VideoModalProps) {
  useModalEscape(!!videoId, onClose);

  return (
    <div className={`vm ${videoId ? 'open' : ''}`} onClick={onClose}>
      <button className="vm-close" onClick={onClose} aria-label="Close">
        ×
      </button>
      {videoId && (
        <div onClick={(e) => e.stopPropagation()}>
          <div className="vm-frame">
            <iframe
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&playsinline=1&rel=0`}
              title="Mickey Singh Demo Reel"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
          <p className="vm-hint">Starts muted — tap the speaker icon in the player to unmute</p>
        </div>
      )}
    </div>
  );
}
