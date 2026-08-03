import { useEffect } from 'react';

interface LightboxProps {
  src: string | null;
  onClose: () => void;
}

export default function Lightbox({ src, onClose }: LightboxProps) {
  useEffect(() => {
    if (!src) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKey);
    };
  }, [src, onClose]);

  return (
    <div className={`lb ${src ? 'open' : ''}`} onClick={onClose}>
      <button className="lb-close" onClick={onClose} aria-label="Close">
        ×
      </button>
      {src && <img src={src} alt="" />}
    </div>
  );
}
