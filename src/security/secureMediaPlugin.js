import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const VIRTUAL_MODULE_ID = 'virtual:secure-vault';
const RESOLVED_VIRTUAL_ID = '\0' + VIRTUAL_MODULE_ID;
const XOR_KEY = 0x5a;

function encodeBuffer(buffer) {
  const out = Buffer.allocUnsafe(buffer.length);
  for (let i = 0; i < buffer.length; i++) {
    out[i] = buffer[i] ^ ((XOR_KEY + i * 7) & 0xff);
  }
  return out;
}

/**
 * Vite Secure Media Vault Plugin (NerdTech Labs)
 * Encodes all images in src/security/vault/ into opaque binary `.dat` assets
 * so no plain `images/` folder or readable `.jpg` files appear in `dist/` or DevTools Sources.
 */
export function secureMediaVaultPlugin() {
  let vaultDir = '';
  let isBuild = false;
  const entries = new Map(); // logicalKey -> { filePath, hashName, mime }

  const scanVault = (rootDir) => {
    entries.clear();
    vaultDir = path.resolve(rootDir, 'src/security/vault');
    if (!fs.existsSync(vaultDir)) return;

    const files = fs.readdirSync(vaultDir);
    for (const file of files) {
      const fullPath = path.join(vaultDir, file);
      if (!fs.statSync(fullPath).isFile()) continue;

      const ext = path.extname(file).toLowerCase();
      const mime =
        ext === '.png'
          ? 'image/png'
          : ext === '.webp'
          ? 'image/webp'
          : ext === '.svg'
          ? 'image/svg+xml'
          : 'image/jpeg';

      const hash = crypto
        .createHash('sha256')
        .update('nerdtech-prison-vault:' + file)
        .digest('hex')
        .slice(0, 10);

      const hashName = `v-${hash}.dat`;
      entries.set(`./images/${file}`, { filePath: fullPath, hashName, mime });
    }
  };

  return {
    name: 'nerdtech-secure-media-vault',

    configResolved(config) {
      isBuild = config.command === 'build';
      scanVault(config.root);
    },

    resolveId(id) {
      if (id === VIRTUAL_MODULE_ID) {
        return RESOLVED_VIRTUAL_ID;
      }
    },

    load(id) {
      if (id === RESOLVED_VIRTUAL_ID) {
        const manifest = {};
        for (const [logicalPath, info] of entries.entries()) {
          const url = isBuild ? `./assets/${info.hashName}` : `/_v/${info.hashName}`;
          manifest[logicalPath] = { u: url, m: info.mime };
        }
        return `export const VAULT_KEY = ${XOR_KEY};\nexport const VAULT_MAP = ${JSON.stringify(manifest)};\n`;
      }
    },

    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (!req.url || !req.url.startsWith('/_v/')) return next();
        const requested = req.url.replace('/_v/', '').split('?')[0];

        for (const info of entries.values()) {
          if (info.hashName === requested) {
            const raw = fs.readFileSync(info.filePath);
            const encoded = encodeBuffer(raw);
            res.setHeader('Content-Type', 'application/octet-stream');
            res.setHeader('Cache-Control', 'public, max-age=3600');
            res.end(encoded);
            return;
          }
        }
        next();
      });
    },

    generateBundle() {
      for (const info of entries.values()) {
        const raw = fs.readFileSync(info.filePath);
        const encoded = encodeBuffer(raw);
        this.emitFile({
          type: 'asset',
          fileName: `assets/${info.hashName}`,
          source: encoded,
        });
      }
    },
  };
}
