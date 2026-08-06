// ---------------------------------------------------------------------------
// DISABLED — Scholarship photo editor API (dev-only)
//
// This was a local-only tool for swapping the photos on /scholarships cards.
// It is parked here on purpose: folders starting with "_" are private in the
// Next.js App Router, so nothing in here is routed, built or served.
//
// To bring it back:
//   1. move this file to src/app/api/dev/scholarship-image/route.js
//   2. uncomment everything below (strip the leading "// " from each line)
//   3. npm run dev  ->  http://localhost:3000/scholarships-edit
//
// Both files must be restored together; the page is useless without the API.
// ---------------------------------------------------------------------------

// import fs from 'node:fs/promises';
// import path from 'node:path';
// import https from 'node:https';
// import http from 'node:http';
//
// // Dev-only helper for swapping scholarship card photos. It writes into
// // public/ and src/data/, so it must never exist in a deployed build.
// const DEV_ONLY = process.env.NODE_ENV !== 'production';
//
// const DATA_FILE = path.join(process.cwd(), 'src', 'data', 'scholarships.json');
// const IMAGE_DIR = path.join(process.cwd(), 'public', 'image', 'scholarships');
// const PUBLIC_PREFIX = '/image/scholarships/';
//
// const BROWSER_UA =
//   'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36';
//
// const notFound = () => new Response('Not found', { status: 404 });
// const bad = (message, status = 400) =>
//   Response.json({ ok: false, error: message }, { status });
//
// async function readData() {
//   return JSON.parse(await fs.readFile(DATA_FILE, 'utf8'));
// }
//
// async function writeData(data) {
//   await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2) + '\n');
// }
//
// // Trust the file's magic bytes rather than the server's Content-Type —
// // plenty of CDNs mislabel images.
// function sniffExtension(buf) {
//   if (buf.length > 12) {
//     if (buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) return '.jpg';
//     if (buf.readUInt32BE(0) === 0x89504e47) return '.png';
//     if (buf.subarray(0, 4).toString('ascii') === 'RIFF' && buf.subarray(8, 12).toString('ascii') === 'WEBP')
//       return '.webp';
//   }
//   return null;
// }
//
// // Follows redirects, tolerates the self-signed certs some school sites use,
// // and sends a browser UA so hotlink protection lets us through.
// function download(url, depth = 0) {
//   return new Promise((resolve, reject) => {
//     if (depth > 6) return reject(new Error('Too many redirects'));
//     let target;
//     try {
//       target = new URL(url);
//     } catch {
//       return reject(new Error('Invalid URL'));
//     }
//     if (target.protocol !== 'http:' && target.protocol !== 'https:') {
//       return reject(new Error('Only http(s) URLs are supported'));
//     }
//
//     const mod = target.protocol === 'http:' ? http : https;
//     const req = mod.request(
//       target,
//       {
//         method: 'GET',
//         headers: {
//           'User-Agent': BROWSER_UA,
//           Accept: 'image/avif,image/webp,image/png,image/jpeg,*/*;q=0.8',
//           Referer: target.origin,
//         },
//         rejectUnauthorized: false,
//         timeout: 30000,
//       },
//       (res) => {
//         const status = res.statusCode || 0;
//         if (status >= 300 && status < 400 && res.headers.location) {
//           res.resume();
//           return resolve(download(new URL(res.headers.location, url).href, depth + 1));
//         }
//         if (status !== 200) {
//           res.resume();
//           return reject(new Error(`Source responded with HTTP ${status}`));
//         }
//         const chunks = [];
//         let size = 0;
//         res.on('data', (c) => {
//           size += c.length;
//           if (size > 25 * 1024 * 1024) {
//             req.destroy();
//             reject(new Error('Image is larger than 25 MB'));
//             return;
//           }
//           chunks.push(c);
//         });
//         res.on('end', () => resolve(Buffer.concat(chunks)));
//       }
//     );
//     req.on('timeout', () => req.destroy(new Error('Source timed out')));
//     req.on('error', (e) => reject(new Error(e.message)));
//     req.end();
//   });
// }
//
// async function removeManagedImage(entry) {
//   const current = entry.carousel[0];
//   if (!current || !current.startsWith(PUBLIC_PREFIX)) return;
//   const name = current.slice(PUBLIC_PREFIX.length);
//   // only ever touch the file this entry owns
//   if (!name.startsWith(entry.slug + '.')) return;
//   await fs.rm(path.join(IMAGE_DIR, name), { force: true });
// }
//
// export async function GET() {
//   if (!DEV_ONLY) return notFound();
//   return Response.json({ ok: true, schools: await readData() });
// }
//
// export async function POST(request) {
//   if (!DEV_ONLY) return notFound();
//
//   const contentType = request.headers.get('content-type') || '';
//   let id;
//   let action = 'set';
//   let sourceUrl = null;
//   let uploaded = null;
//
//   try {
//     if (contentType.includes('multipart/form-data')) {
//       const form = await request.formData();
//       id = Number(form.get('id'));
//       const file = form.get('file');
//       if (!file || typeof file === 'string') return bad('No file in the request');
//       uploaded = Buffer.from(await file.arrayBuffer());
//     } else {
//       const body = await request.json();
//       id = Number(body.id);
//       action = body.action === 'clear' ? 'clear' : 'set';
//       sourceUrl = typeof body.url === 'string' ? body.url.trim() : null;
//     }
//   } catch {
//     return bad('Malformed request');
//   }
//
//   if (!Number.isFinite(id)) return bad('Missing school id');
//
//   const data = await readData();
//   const entry = data.find((s) => s.id === id);
//   if (!entry) return bad(`No school with id ${id}`, 404);
//
//   if (action === 'clear') {
//     await removeManagedImage(entry);
//     entry.carousel = [];
//     await writeData(data);
//     return Response.json({ ok: true, school: entry });
//   }
//
//   let buf;
//   if (uploaded) {
//     buf = uploaded;
//   } else {
//     if (!sourceUrl) return bad('Paste an image URL or drop a file');
//     try {
//       buf = await download(sourceUrl);
//     } catch (e) {
//       return bad(e.message);
//     }
//   }
//
//   const ext = sniffExtension(buf);
//   if (!ext) return bad('That is not a JPG, PNG or WebP image (the URL may point at a web page, not the file itself)');
//   if (buf.length < 4096) return bad(`Image is only ${buf.length} bytes — looks like a placeholder`);
//
//   await removeManagedImage(entry);
//   const filename = `${entry.slug}${ext}`;
//   await fs.mkdir(IMAGE_DIR, { recursive: true });
//   await fs.writeFile(path.join(IMAGE_DIR, filename), buf);
//
//   entry.carousel = [PUBLIC_PREFIX + filename];
//   await writeData(data);
//
//   return Response.json({ ok: true, school: entry, bytes: buf.length });
// }
//
