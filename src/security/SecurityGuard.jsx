import React, { useEffect, useState, useRef } from 'react';
import { ShieldAlert, Lock } from 'lucide-react';
import { SECURITY_CONFIG } from './securityConfig';

/**
 * SecurityGuard — Dedicated Frontend Security Layer by NerdTech Labs
 * Provides anti-casual-inspection, shortcut blocking, image drag/copy deterrence,
 * console hardening, and a protective blur curtain when docked DevTools are detected.
 */
export default function SecurityGuard() {
  const [devToolsOpen, setDevToolsOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  const toastTimerRef = useRef(null);

  useEffect(() => {
    if (!SECURITY_CONFIG.enabled) return;

    const triggerToast = (message) => {
      if (!SECURITY_CONFIG.showSecurityToast) return;
      setToastMsg(message);
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
      toastTimerRef.current = setTimeout(() => setToastMsg(''), 2400);
    };

    // 1. Console Hardening & Branded Security Warning
    if (SECURITY_CONFIG.hardenConsole) {
      try {
        console.clear();
        console.log(
          '%cSTOP! PROTECTED ZONE',
          'color: #f59e0b; font-size: 32px; font-weight: 900; text-shadow: 2px 2px 0 #000;'
        );
        console.log(
          `%c${SECURITY_CONFIG.brandName} — Secured by ${SECURITY_CONFIG.securityProvider} (${SECURITY_CONFIG.securityUrl})\nUnauthorized inspection, scraping, or copying of assets is prohibited.`,
          'color: #e2e8f0; font-size: 13px; line-height: 1.6;'
        );

        const noop = () => {};
        console.debug = noop;
        console.info = noop;
        console.trace = noop;
      } catch (e) {}
    }

    // 2. Disable Right-Click Context Menu
    const handleContextMenu = (e) => {
      if (!SECURITY_CONFIG.disableContextMenu) return;
      // Allow right-click inside form inputs/textareas for copy-paste usability
      const tag = e.target?.tagName?.toLowerCase();
      if (tag === 'input' || tag === 'textarea') return;

      e.preventDefault();
      triggerToast(`Protected by ${SECURITY_CONFIG.securityProvider}`);
    };

    // 3. Block DevTools & View Source Keyboard Shortcuts
    const handleKeyDown = (e) => {
      if (!SECURITY_CONFIG.blockDevToolsShortcuts) return;

      const key = e.key?.toLowerCase();
      const ctrlOrCmd = e.ctrlKey || e.metaKey;

      const isF12 = e.key === 'F12' || e.keyCode === 123;
      const isInspect = ctrlOrCmd && e.shiftKey && (key === 'i' || key === 'j' || key === 'c');
      const isMacInspect = e.metaKey && e.altKey && (key === 'i' || key === 'j' || key === 'c' || key === 'u');
      const isViewSource = ctrlOrCmd && key === 'u';
      const isSavePage = ctrlOrCmd && key === 's';

      if (isF12 || isInspect || isMacInspect || isViewSource || isSavePage) {
        e.preventDefault();
        e.stopPropagation();
        triggerToast('Inspection shortcuts are disabled');
        return false;
      }
    };

    // 4. Protect Images & Canvases from Dragging / Copying
    const handleDragStart = (e) => {
      if (!SECURITY_CONFIG.protectImages) return;
      const tag = e.target?.tagName?.toLowerCase();
      if (tag === 'img' || tag === 'canvas' || tag === 'svg') {
        e.preventDefault();
      }
    };

    // 5. Docked DevTools Detection (Desktop Only)
    let devToolsInterval = null;
    const isDesktop = !window.matchMedia('(pointer: coarse)').matches;

    const checkDevTools = () => {
      if (!SECURITY_CONFIG.detectDockedDevTools || !isDesktop) return;
      // Ignore headless / zero outer dimensions
      if (!window.outerWidth || !window.outerHeight) return;

      const widthDiff = window.outerWidth - window.innerWidth;
      const heightDiff = window.outerHeight - window.innerHeight;
      const suspected = widthDiff > 240 || heightDiff > 260;
      setDevToolsOpen(suspected);
    };

    if (SECURITY_CONFIG.detectDockedDevTools && isDesktop) {
      checkDevTools();
      devToolsInterval = setInterval(checkDevTools, 1000);
      window.addEventListener('resize', checkDevTools);
    }

    document.addEventListener('contextmenu', handleContextMenu);
    window.addEventListener('keydown', handleKeyDown, true);
    document.addEventListener('dragstart', handleDragStart);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      window.removeEventListener('keydown', handleKeyDown, true);
      document.removeEventListener('dragstart', handleDragStart);
      if (devToolsInterval) clearInterval(devToolsInterval);
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
      window.removeEventListener('resize', checkDevTools);
    };
  }, []);

  if (!SECURITY_CONFIG.enabled) return null;

  return (
    <>
      {/* Subtle Non-Intrusive Security Toast */}
      {toastMsg && !devToolsOpen && (
        <div className="fixed bottom-6 left-6 z-[9998] pointer-events-none flex items-center gap-2 px-4 py-2.5 rounded-xl bg-prison-950/95 border border-prison-gold/50 text-prison-gold text-xs font-bold uppercase tracking-wider shadow-2xl backdrop-blur-md">
          <Lock className="w-3.5 h-3.5 shrink-0" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Protective Blur Curtain When Docked DevTools Are Detected */}
      {devToolsOpen && (
        <div className="fixed inset-0 z-[9999] bg-prison-950/95 backdrop-blur-2xl flex flex-col items-center justify-center p-6 text-center select-none">
          <div className="max-w-md w-full rounded-2xl bg-prison-900/90 border border-prison-gold/40 p-8 shadow-2xl">
            <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-prison-gold/15 border border-prison-gold/40 flex items-center justify-center text-prison-gold">
              <ShieldAlert className="w-8 h-8" />
            </div>

            <div className="text-[11px] font-bold uppercase tracking-[0.25em] text-prison-gold mb-2">
              Security Lockdown Active
            </div>

            <h2 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-wide text-white">
              Developer Tools Restricted
            </h2>

            <p className="mt-3 text-sm text-slate-300 leading-relaxed">
              This website and its media assets are protected. Please close Developer Tools to continue browsing{' '}
              <strong className="text-white">{SECURITY_CONFIG.brandName}</strong>.
            </p>

            <div className="mt-6 pt-4 border-t border-prison-800 text-xs text-slate-400">
              Secured by{' '}
              <a
                href={SECURITY_CONFIG.securityUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-prison-gold hover:underline font-bold"
              >
                {SECURITY_CONFIG.securityProvider}
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
