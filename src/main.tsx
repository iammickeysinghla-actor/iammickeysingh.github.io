import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import ErrorBoundary from './components/ErrorBoundary';
import { contactEmail } from './data/content';
import './styles/global.css';

const lastResortFallback = (
  <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 40, textAlign: 'center' }}>
    <div>
      <h1 style={{ fontFamily: 'var(--serif)', fontSize: '2.5rem', marginBottom: 16 }}>Mickey Singh</h1>
      <p style={{ marginBottom: 8 }}>Actor · Los Angeles</p>
      <p>
        <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
      </p>
    </div>
  </div>
);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary fallback={lastResortFallback}>
      <App />
    </ErrorBoundary>
  </StrictMode>
);
