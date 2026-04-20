'use client';

import { useEffect, useState } from 'react';

const WIDTH_THRESHOLD = 260;
const HEIGHT_THRESHOLD = 320;
const REQUIRED_SUSPICIOUS_CHECKS = 3;

function isDevToolsLikelyOpen() {
  if (typeof window === 'undefined') {
    return false;
  }

  // Ignore mobile/tablet sizes to avoid false positives from browser chrome.
  if (window.innerWidth < 1024) {
    return false;
  }

  const widthGap = window.outerWidth - window.innerWidth > WIDTH_THRESHOLD;
  const heightGap = window.outerHeight - window.innerHeight > HEIGHT_THRESHOLD;

  return widthGap || heightGap;
}

export default function SecurityGuard() {
  const [devToolsOpen, setDevToolsOpen] = useState(false);

  useEffect(() => {
    let suspiciousCount = 0;

    const onContextMenu = (event: MouseEvent) => {
      event.preventDefault();
    };

    const onKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      const ctrlOrMeta = event.ctrlKey || event.metaKey;
      const ctrlShift = ctrlOrMeta && event.shiftKey;

      const blockedShortcut =
        key === 'f12' ||
        (ctrlShift && (key === 'i' || key === 'j' || key === 'c')) ||
        (ctrlOrMeta && key === 'u');

      if (blockedShortcut || key === 'printscreen') {
        event.preventDefault();
        event.stopPropagation();

        if (blockedShortcut) {
          setDevToolsOpen(true);
        }

        if (key === 'printscreen' && navigator.clipboard) {
          navigator.clipboard.writeText('Screenshots are disabled on this page.').catch(() => {});
        }
      }
    };

    const updateDevToolsState = () => {
      if (!document.hasFocus()) {
        return;
      }

      if (isDevToolsLikelyOpen()) {
        suspiciousCount += 1;
      } else {
        suspiciousCount = 0;
      }

      setDevToolsOpen(suspiciousCount >= REQUIRED_SUSPICIOUS_CHECKS);
    };

    document.body.classList.add('security-protected');
    window.addEventListener('contextmenu', onContextMenu);
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('resize', updateDevToolsState);

    const interval = window.setInterval(updateDevToolsState, 1500);
    updateDevToolsState();

    return () => {
      document.body.classList.remove('security-protected');
      window.removeEventListener('contextmenu', onContextMenu);
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('resize', updateDevToolsState);
      window.clearInterval(interval);
    };
  }, []);

  if (!devToolsOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[9999] grid place-items-center bg-black/95 p-6 text-center text-white">
      <div>
        <h2 className="text-2xl font-semibold">Security Lock</h2>
        <p className="mt-2 text-sm text-zinc-300">Developer tools are not allowed on this page.</p>
      </div>
    </div>
  );
}
