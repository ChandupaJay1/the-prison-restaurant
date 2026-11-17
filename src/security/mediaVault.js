import { VAULT_KEY, VAULT_MAP } from 'virtual:secure-vault';

const blobCache = new Map();
const inFlight = new Map();

function decodeBytes(uint8Array) {
  const out = new Uint8Array(uint8Array.length);
  for (let i = 0; i < uint8Array.length; i++) {
    out[i] = uint8Array[i] ^ ((VAULT_KEY + i * 7) & 0xff);
  }
  return out;
}

/**
 * Fetches an obfuscated binary `.dat` asset from the NerdTech Secure Media Vault,
 * decodes it in RAM, and returns an in-memory Blob URL (keeping `/images/` completely absent from DevTools Sources).
 */
export function loadSecureMedia(logicalPath) {
  if (!logicalPath) return Promise.resolve('');

  // Normalize path key
  const normalized = logicalPath.startsWith('./')
    ? logicalPath
    : logicalPath.startsWith('/')
    ? `.${logicalPath}`
    : `./${logicalPath}`;

  if (blobCache.has(normalized)) {
    return Promise.resolve(blobCache.get(normalized));
  }

  if (inFlight.has(normalized)) {
    return inFlight.get(normalized);
  }

  const entry = VAULT_MAP[normalized];
  if (!entry) {
    // Fallback if external URL or non-vault asset
    return Promise.resolve(logicalPath);
  }

  const promise = fetch(entry.u)
    .then((res) => {
      if (!res.ok) throw new Error('Secure media load failed');
      return res.arrayBuffer();
    })
    .then((arrayBuffer) => {
      const decoded = decodeBytes(new Uint8Array(arrayBuffer));
      const blob = new Blob([decoded], { type: entry.m });
      const blobUrl = URL.createObjectURL(blob);
      blobCache.set(normalized, blobUrl);
      inFlight.delete(normalized);
      return blobUrl;
    })
    .catch(() => {
      inFlight.delete(normalized);
      return '';
    });

  inFlight.set(normalized, promise);
  return promise;
}

/**
 * Synchronous lookup if already decoded in RAM cache.
 */
export function getCachedSecureMedia(logicalPath) {
  if (!logicalPath) return '';
  const normalized = logicalPath.startsWith('./')
    ? logicalPath
    : logicalPath.startsWith('/')
    ? `.${logicalPath}`
    : `./${logicalPath}`;
  return blobCache.get(normalized) || '';
}
