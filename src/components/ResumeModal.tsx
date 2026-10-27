import { resumeUrl } from '../data/content';
import { useModalEscape } from '../hooks/useModalEscape';

interface ResumeModalProps {
  open: boolean;
  onClose: () => void;
}

/**
 * Previews the resume PDF in a popup, with a download link as a reliable
 * fallback. The preview goes through Google's Docs Viewer rather than
 * loading the PDF directly in the iframe — browsers' own built-in PDF
 * renderers (notably iOS Safari/WebKit, which every iOS browser uses) don't
 * reliably fit the page to the iframe's width, cutting off the right edge
 * of every line on a narrow phone screen. Google's viewer renders
 * responsively regardless of browser, at the cost of needing the PDF to be
 * reachable at a public URL (so this only resolves once deployed, not in a
 * local/offline preview).
 */
export default function ResumeModal({ open, onClose }: ResumeModalProps) {
  useModalEscape(open, onClose);

  const absoluteUrl = typeof window !== 'undefined' ? `${window.location.origin}${resumeUrl}` : resumeUrl;
  const viewerSrc = `https://docs.google.com/viewer?url=${encodeURIComponent(absoluteUrl)}&embedded=true`;

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
          <iframe src={viewerSrc} title="Mickey Singh Resume" />
        </div>
      )}
    </div>
  );
}
