/**
 * NerdTech Labs - Frontend Security Configuration
 * Central control panel for client-side asset & inspection protection layers.
 */
export const SECURITY_CONFIG = {
  // Active automatically in production & preview builds; set true to test in `npm run dev`
  enabled: import.meta.env.PROD,

  // Block right-click context menu ("Inspect", "Save Image As", "View Page Source")
  disableContextMenu: true,

  // Block DevTools & View Source keyboard shortcuts (F12, Ctrl+Shift+I/J/C, Ctrl+U, Ctrl+S)
  blockDevToolsShortcuts: true,

  // Prevent image dragging & right-click downloading
  protectImages: true,

  // Detect docked DevTools panel and display protective blur curtain
  detectDockedDevTools: true,

  // Silence console logs & print branded security warning in production
  hardenConsole: true,

  // Show subtle security toast when blocked shortcut / right-click is attempted
  showSecurityToast: true,

  // Branding shown on security notices
  brandName: 'The Prison Restaurant & Lounge',
  securityProvider: 'NerdTech Labs',
  securityUrl: 'http://nerdtechlabs.info/',
};
