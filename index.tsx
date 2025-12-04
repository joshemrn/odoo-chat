import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Configuration
const WIDGET_ROOT_ID = 'emrn-ai-widget-container';

const loadStyles = () => {
  // 1. Inject Tailwind CSS (Play CDN for portability)
  // Check if Tailwind is already present to avoid double-loading
  if (!document.querySelector('script[src*="tailwindcss"]')) {
    const script = document.createElement('script');
    script.src = "https://cdn.tailwindcss.com";
    document.head.appendChild(script);
  }

  // 2. Inject Fonts (Inter)
  if (!document.querySelector('link[href*="fonts.googleapis.com"]')) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap';
    document.head.appendChild(link);
  }

  // 3. Inject Custom Styles for Scrollbar hiding and Font Family
  const style = document.createElement('style');
  style.innerHTML = `
    #${WIDGET_ROOT_ID} {
      font-family: 'Inter', sans-serif;
    }
    /* Custom Scrollbar for Chat */
    .scrollbar-hide::-webkit-scrollbar {
        display: none;
    }
    .scrollbar-hide {
        -ms-overflow-style: none;
        scrollbar-width: none;
    }
  `;
  document.head.appendChild(style);
};

const mountWidget = () => {
  loadStyles();

  // Check if the container already exists
  let rootElement = document.getElementById(WIDGET_ROOT_ID);

  // If not, create it and append to body
  if (!rootElement) {
    rootElement = document.createElement('div');
    rootElement.id = WIDGET_ROOT_ID;
    
    // POSITIONING & CLICK-THROUGH
    // We set inset to 0 but pointer-events to 'none' so this div doesn't block
    // clicks on the actual website. The ChatWidget buttons will re-enable pointer-events.
    Object.assign(rootElement.style, {
      position: 'fixed',
      zIndex: '99999',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      pointerEvents: 'none'
    });
    
    document.body.appendChild(rootElement);
  }

  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
};

// Initialize the widget
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mountWidget);
} else {
  mountWidget();
}