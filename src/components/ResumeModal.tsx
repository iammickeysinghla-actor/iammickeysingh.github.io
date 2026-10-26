import { resumeUrl } from '../data/content';
import { useModalEscape } from '../hooks/useModalEscape';

interface ResumeModalProps {
  open: boolean;
  onClose: () => void;
}

/** Previews the resume PDF in a popup, with a download link as fallback for
 * browsers (mostly mobile) that won't render a PDF inline in an iframe. */
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
          <iframe src={resumeUrl} title="Mickey Singh Resume" />
        </div>
      )}
    </div>
  );
}
