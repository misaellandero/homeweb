const staticCacheName = 'site-static-v1';
const dynamicCacheName = 'site-dynamic-v1';
const assets = [ 
  '#',
  'error.html',
  'index.html', 
  'App.js',
  'index.js',  
  'style.css',  
  'Imagenes/defaultUser.png', 
  'Imagenes/logo.svg', 
  'dateFormat.js', 
  'https://code.jquery.com/jquery-3.5.1.slim.min.js', 
  'https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.bundle.min.js',
  'https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.5.2/css/bootstrap.css',
   /*
  'https://www.gstatic.com/firebasejs/7.24.0/firebase-app.js',
  'https://www.gstatic.com/firebasejs/7.24.0/firebase-auth.js',
  'https://www.gstatic.com/firebasejs/7.24.0/firebase-firestore.js',
  'https://www.gstatic.com/firebasejs/7.24.0/firebase-storage.js', 
   */
];

//Install test 
self.addEventListener('install', evt =>{
    evt.waitUntil(
        caches.open(staticCacheName).then((cache) =>{
            console.log("Installando caches");
           cache.addAll(assets);
        })
    );
});

// activate event nueva version 1.3
self.addEventListener('activate', evt => {
    //console.log('service worker activated');
    evt.waitUntil(
      caches.keys().then(keys => {
        //console.log(keys);
        return Promise.all(keys
          .filter(key => key !== staticCacheName && key !== dynamicCacheName)
          .map(key => caches.delete(key))
        );
      })
    );
  });

 

// fetch event
self.addEventListener('fetch', evt => {
    //console.log('fetch event', evt);
    if(evt.request.url.indexOf('firestore.googleapis.com') === -1){
        evt.respondWith(
            caches.match(evt.request).then(cacheRes => {
              return cacheRes || fetch(evt.request).then(fetchRes => {
                return caches.open(dynamicCacheName).then(cache => {
                  cache.put(evt.request.url, fetchRes.clone());
                  return fetchRes;
                })
              });
            }).catch(() => {
                if(evt.request.url.indexOf('.html') > -1){
                  return caches.match('error.html');
                }
              })
          );
    }
   
  });

 

  