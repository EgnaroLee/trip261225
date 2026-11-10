// 오프라인 열람용: 네트워크 우선, 실패하면 마지막으로 본 내용을 보여줍니다
const C='pb-v1';
const key=r=>{const u=new URL(r.url);return u.origin===location.origin?u.origin+u.pathname:r};
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(C).then(c=>c.addAll(['./','index.html'])).catch(()=>{}))});
self.addEventListener('activate',e=>e.waitUntil(clients.claim()));
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  e.respondWith(fetch(e.request).then(r=>{const k=r.clone();caches.open(C).then(c=>c.put(key(e.request),k)).catch(()=>{});return r})
    .catch(()=>caches.match(key(e.request)).then(m=>m||caches.match('index.html'))));
});
