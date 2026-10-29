// Descarga las imágenes del sitio WordPress actual a public/images/.
// Ejecútalo UNA vez desde tu computador (antes de apagar WordPress):  npm run images
import { readFile, writeFile, mkdir, access } from 'node:fs/promises';

const list = (await readFile(new URL('./image-urls.txt', import.meta.url), 'utf8'))
  .split('\n').map((l) => l.trim()).filter(Boolean);
const outDir = new URL('../public/images/', import.meta.url);
await mkdir(outDir, { recursive: true });

let ok = 0, skip = 0, fail = 0;
for (const url of list) {
  const name = url.split('/wp-content/uploads/')[1].replaceAll('/', '-');
  const dest = new URL(name, outDir);
  try { await access(dest); skip++; continue; } catch {}
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(res.status);
    await writeFile(dest, Buffer.from(await res.arrayBuffer()));
    ok++; console.log('✓', name);
  } catch (e) {
    fail++; console.log('✗', name, e.message);
  }
}
console.log(`\nListo: ${ok} descargadas, ${skip} ya existían, ${fail} con error.`);
