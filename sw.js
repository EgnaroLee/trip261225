// 오프라인 열람용: 네트워크 우선, 실패하면 마지막으로 본 내용을 보여줍니다 (같은 사이트 파일만 저장)
const C='pb-v2';
const key=r=>{const u=new URL(r.url);return u.origin+u.pathname};
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(C).then(c=>c.addAll(['./','index.html'])).catch(()=>{}))});
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C).map(k=>caches.delete(k)))).then(()=>clients.claim())));
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET'||new URL(e.request.url).origin!==location.origin)return;
  e.respondWith(fetch(e.request).then(r=>{if(r.ok){const k=r.clone();caches.open(C).then(c=>c.put(key(e.request),k)).catch(()=>{})}return r})
    .catch(()=>caches.match(key(e.request)).then(m=>m||caches.match('index.html'))));
});
