import { resumePageImages, resumeUrl } from '../data/content';
import { useModalEscape } from '../hooks/useModalEscape';

interface ResumeModalProps {
  open: boolean;
  onClose: () => void;
}

/**
 * Previews the resume as plain scrollable page images, with a download link
 * for the actual PDF. Not an iframe to the PDF itself: iOS Safari (and so
 * every iOS browser, since they all run on WebKit) can't actually render a
 * PDF inside an iframe — it breaks out and takes over the whole tab instead
 * of staying embedded, which happened with both a direct PDF src and
 * Google's Docs Viewer (which itself redirects straight to the file on
 * iOS). Plain images sidestep that entirely and are responsive by default.
 */
export default function ResumeModal({ open, onClose }: ResumeModalProps) {
  useModalEscape(open, onClose);

  return (
    <div className={`rm ${open ? 'open' : ''}`} onClick={onClose}>
      <button className="rm-close" onClick={onClose} aria-label="Close">
        ×
      </button>
      {open && (
        <div className="rm-panel" onClick={(e) => e.stopPropagation()}>
          <div className="rm-bar">
            <span>Mickey Singh — Resume</span>
            <a href={resumeUrl} download className="btn-p rm-download">
              Download ↓
            </a>
          </div>
          <div className="rm-pages">
            {resumePageImages.map((src) => (
              <img key={src} src={src} alt="Mickey Singh resume" />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
