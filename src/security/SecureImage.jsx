import React, { useEffect, useState } from 'react';
import { getCachedSecureMedia, loadSecureMedia } from './mediaVault';

/**
 * SecureImage — Drop-in replacement for <img> using the NerdTech Secure Media Vault.
 * Renders images exclusively via decoded in-memory Blob URLs so no `/images/` folder
 * or plain `.jpg` filenames appear in DevTools Sources.
 */
export default function SecureImage({ src, alt = '', className = '', ...rest }) {
  const [resolvedUrl, setResolvedUrl] = useState(() => getCachedSecureMedia(src));

  useEffect(() => {
    let active = true;
    const cached = getCachedSecureMedia(src);
    if (cached) {
      setResolvedUrl(cached);
      return;
    }

    loadSecureMedia(src).then((url) => {
      if (active && url) {
        setResolvedUrl(url);
      }
    });

    return () => {
      active = false;
    };
  }, [src]);

  if (!resolvedUrl) {
    return (
      <div
        aria-label={alt}
        className={`bg-prison-900 animate-pulse ${className}`}
      />
    );
  }

  return (
    <img
      src={resolvedUrl}
      alt={alt}
      draggable={false}
      className={className}
      {...rest}
    />
  );
}
