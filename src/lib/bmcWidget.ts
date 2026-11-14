/**
 * Centralized Buy Me a Coffee widget integration.
 *
 * The official script is injected at most once per page load (lazily, the
 * first time a page asks for it). Showing/hiding afterwards is a CSS class
 * toggle on <html> (see index.css), so client-side navigation and React
 * StrictMode double-mounts can never create a second widget instance.
 */

export const BMC_PAGE_URL = 'https://www.buymeacoffee.com/donotdm';

const SCRIPT_SRC = 'https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js';
const VISIBLE_CLASS = 'bmc-widget-visible';

const WIDGET_CONFIG: Record<string, string> = {
  name: 'BMC-Widget',
  cfasync: 'false',
  id: 'donotdm',
  description: 'Support me on Buy me a coffee!',
  message: '',
  color: '#BD5FFF',
  position: 'Right',
  x_margin: '18',
  y_margin: '18',
};

let injected = false;

function injectOnce() {
  if (injected || typeof document === 'undefined') return;
  injected = true;

  // Guard against a copy that already exists (e.g. after HMR).
  if (document.querySelector('script[data-name="BMC-Widget"]') || document.getElementById('bmc-wbtn')) {
    return;
  }

  const script = document.createElement('script');
  script.src = SCRIPT_SRC;
  script.async = true;
  for (const [key, value] of Object.entries(WIDGET_CONFIG)) {
    script.dataset[key] = value;
  }
  script.onload = () => {
    // The widget only builds its button inside a window-level
    // DOMContentLoaded listener, which has already fired in an SPA.
    // Re-dispatch it on window only (nothing else in the app listens there).
    if (!document.getElementById('bmc-wbtn')) {
      window.dispatchEvent(new Event('DOMContentLoaded'));
    }
  };
  script.onerror = () => {
    // Blocked (ad blocker / offline): the page's own support button still works.
    console.warn('Buy Me a Coffee widget could not be loaded.');
  };
  document.body.appendChild(script);
}

/** Show the floating widget (loading it on first use). */
export function showBmcWidget() {
  injectOnce();
  document.documentElement.classList.add(VISIBLE_CLASS);
}

/** Hide the floating widget without removing it. */
export function hideBmcWidget() {
  document.documentElement.classList.remove(VISIBLE_CLASS);
}
