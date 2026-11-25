// גרסה חדשה תמיד כשיש רשת; עותק שמור כשאין.
const CACHE="gym-v12";
const CORE=["./","index.html","manifest.webmanifest","confetti.js","lottie.js","dude.json","fonts/ibm-plex-sans-hebrew-hebrew-400-normal.woff2","fonts/ibm-plex-sans-hebrew-hebrew-500-normal.woff2","fonts/ibm-plex-sans-hebrew-hebrew-600-normal.woff2","fonts/ibm-plex-sans-hebrew-latin-400-normal.woff2","fonts/ibm-plex-sans-hebrew-latin-500-normal.woff2","fonts/ibm-plex-sans-hebrew-latin-600-normal.woff2","fonts/barlow-condensed-latin-500-normal.woff2","fonts/barlow-condensed-latin-600-normal.woff2","fonts/barlow-condensed-latin-700-normal.woff2","icon-192.png","icon-512.png","icon-maskable-512.png","apple-touch-icon.png"];
self.addEventListener("install",e=>{self.skipWaiting();e.waitUntil(caches.open(CACHE).then(c=>Promise.all(CORE.map(u=>c.add(u).catch(()=>{})))))});
self.addEventListener("activate",e=>e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener("fetch",e=>{
  if(e.request.method!=="GET"||new URL(e.request.url).origin!==location.origin)return;
  e.respondWith(fetch(e.request,{cache:"no-cache"}).then(res=>{if(res.ok){const copy=res.clone();caches.open(CACHE).then(c=>c.put(e.request,copy))}return res})
    .catch(()=>caches.match(e.request,{ignoreSearch:true}).then(r=>r||caches.match("./"))));
});
