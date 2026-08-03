import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
  /** Rendered instead of children if a descendant throws. Defaults to nothing (silently drop the enhancement). */
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

/**
 * Contains a render/effect crash to the subtree it wraps instead of letting
 * it unmount the entire app. Used around every "enhancement" layer (tilt,
 * particles, carousels, scroll rig) so a failure on some device/browser we
 * can't test directly loses that one feature, never the whole page.
 */
export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // eslint-disable-next-line no-console
    console.error('[ErrorBoundary] caught:', error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? null;
    }
    return this.props.children;
  }
}
