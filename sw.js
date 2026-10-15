/* Service worker: menyimpan seluruh game agar bisa dimainkan tanpa internet. File ini dibuat otomatis. */
const CACHE = 'main-bilal-b9e0372d19';
const ASSETS = [
 "./",
 "index.html",
 "manifest.webmanifest",
 "fonts/fonts.css",
 "fonts/baloo-2-latin-600-normal.woff2",
 "fonts/baloo-2-latin-800-normal.woff2",
 "fonts/nunito-latin-600-normal.woff2",
 "fonts/nunito-latin-800-normal.woff2",
 "icons/apple-touch-icon.png",
 "icons/icon-192.png",
 "icons/icon-512.png",
 "icons/icon-maskable-512.png",
 "audio/bagus.mp3",
 "audio/c-biru.mp3",
 "audio/c-hijau.mp3",
 "audio/c-kuning.mp3",
 "audio/c-merah.mp3",
 "audio/c-oranye.mp3",
 "audio/c-pelangi.mp3",
 "audio/c-pink.mp3",
 "audio/c-ungu.mp3",
 "audio/corat-gambar.mp3",
 "audio/corat-pilih.mp3",
 "audio/corat.mp3",
 "audio/intro-anjing.mp3",
 "audio/intro-ayam.mp3",
 "audio/intro-bebek.mp3",
 "audio/intro-gajah.mp3",
 "audio/intro-gurita.mp3",
 "audio/intro-katak.mp3",
 "audio/intro-kelinci.mp3",
 "audio/intro-kepiting.mp3",
 "audio/intro-kucing.mp3",
 "audio/intro-kura-kura.mp3",
 "audio/intro-lumba-lumba.mp3",
 "audio/intro-panda.mp3",
 "audio/intro-paus.mp3",
 "audio/intro-serigala.mp3",
 "audio/kenalan.mp3",
 "audio/mewarnai.mp3",
 "audio/num-1.mp3",
 "audio/num-10.mp3",
 "audio/num-2.mp3",
 "audio/num-3.mp3",
 "audio/num-4.mp3",
 "audio/num-5.mp3",
 "audio/num-6.mp3",
 "audio/num-7.mp3",
 "audio/num-8.mp3",
 "audio/num-9.mp3",
 "audio/oops.mp3",
 "audio/q-anjing.mp3",
 "audio/q-ayam.mp3",
 "audio/q-bebek.mp3",
 "audio/q-gajah.mp3",
 "audio/q-gurita.mp3",
 "audio/q-hitung-bintang.mp3",
 "audio/q-hitung-bola.mp3",
 "audio/q-hitung-ikan.mp3",
 "audio/q-katak.mp3",
 "audio/q-kelinci.mp3",
 "audio/q-kepiting.mp3",
 "audio/q-kucing.mp3",
 "audio/q-kura-kura.mp3",
 "audio/q-lumba-lumba.mp3",
 "audio/q-panda.mp3",
 "audio/q-paus.mp3",
 "audio/q-serigala.mp3",
 "audio/q-warna-biru.mp3",
 "audio/q-warna-hijau.mp3",
 "audio/q-warna-kuning.mp3",
 "audio/q-warna-merah.mp3",
 "audio/q-warna-oranye.mp3",
 "audio/q-warna-pink.mp3",
 "audio/q-warna-ungu.mp3",
 "audio/q-warna2-biru.mp3",
 "audio/q-warna2-hijau.mp3",
 "audio/q-warna2-kuning.mp3",
 "audio/q-warna2-merah.mp3",
 "audio/q-warna2-oranye.mp3",
 "audio/q-warna2-pink.mp3",
 "audio/q-warna2-ungu.mp3",
 "audio/sound-on.mp3",
 "audio/w-anjing.mp3",
 "audio/w-ayam.mp3",
 "audio/w-bebek.mp3",
 "audio/w-gajah.mp3",
 "audio/w-gurita.mp3",
 "audio/w-katak.mp3",
 "audio/w-kelinci.mp3",
 "audio/w-kepiting.mp3",
 "audio/w-kucing.mp3",
 "audio/w-kura-kura.mp3",
 "audio/w-lumba-lumba.mp3",
 "audio/w-panda.mp3",
 "audio/w-paus.mp3",
 "audio/w-serigala.mp3",
 "audio/w-warna-biru.mp3",
 "audio/w-warna-hijau.mp3",
 "audio/w-warna-kuning.mp3",
 "audio/w-warna-merah.mp3",
 "audio/w-warna-oranye.mp3",
 "audio/w-warna-pink.mp3",
 "audio/w-warna-ungu.mp3",
 "audio/welcome.mp3",
 "audio/win-hitung-1.mp3",
 "audio/win-hitung-10.mp3",
 "audio/win-hitung-2.mp3",
 "audio/win-hitung-3.mp3",
 "audio/win-hitung-4.mp3",
 "audio/win-hitung-5.mp3",
 "audio/win-hitung-6.mp3",
 "audio/win-hitung-7.mp3",
 "audio/win-hitung-8.mp3",
 "audio/win-hitung-9.mp3"
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k.startsWith('main-bilal-') && k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

async function rangeResponse(req, res) {
  const m = /bytes=(\d*)-(\d*)/.exec(req.headers.get('range') || '');
  if (!m) return res;
  const buf = await res.arrayBuffer();
  const size = buf.byteLength;
  let start = m[1] === '' ? Math.max(0, size - Number(m[2])) : Number(m[1]);
  let end = m[1] === '' || m[2] === '' ? size - 1 : Math.min(Number(m[2]), size - 1);
  if (start > end || start >= size) return new Response(null, { status: 416, headers: { 'Content-Range': 'bytes */' + size } });
  return new Response(buf.slice(start, end + 1), {
    status: 206,
    statusText: 'Partial Content',
    headers: {
      'Content-Type': res.headers.get('Content-Type') || 'audio/mpeg',
      'Content-Range': 'bytes ' + start + '-' + end + '/' + size,
      'Content-Length': String(end - start + 1),
    },
  });
}

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return;
  e.respondWith((async () => {
    const cache = await caches.open(CACHE);
    let res = await cache.match(req, { ignoreSearch: true, ignoreVary: true });
    if (!res && req.mode === 'navigate') res = await cache.match('index.html');
    if (!res) {
      try {
        res = await fetch(req);
        if (res && res.ok && !req.headers.get('range')) cache.put(req, res.clone());
      } catch (err) {
        return new Response('Sedang tidak ada internet.', { status: 503, headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
      }
      return res;
    }
    if (req.headers.get('range')) return rangeResponse(req, res);
    return res;
  })());
});
