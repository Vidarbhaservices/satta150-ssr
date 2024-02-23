// const cacheName = 'my-cache-v1';
//
// self.addEventListener('fetch', event => {
//     if (event.request.url.includes('styles.scss')) {
//         event.respondWith(
//             fetch(event.request.url + '?timestamp=' + Date.now())
//         );
//         console.log('in styles', event.request.url);
//
//     } else {
//         event.respondWith(
//             caches.match(event.request).then(response => {
//                 return response || fetch(event.request);
//             })
//         );
//         console.log('styles worker error')
//     }
// });
//
// self.addEventListener('activate', event => {
//     event.waitUntil(
//         caches.keys().then(cacheNames => {
//             return Promise.all(
//                 cacheNames.filter(name => name !== cacheName).map(name => caches.delete(name))
//             );
//         })
//     );
//     console.log('activated')
// });
self.addEventListener('fetch', function(event) {
    console.log('Fetch event:', event.request.url);

    event.respondWith(
        caches.match(event.request).then(function(response) {
            if (response) {
                console.log('Found in cache:', event.request.url);
                return response;
            }

            console.log('Not found in cache, fetching:', event.request.url);
            return fetch(event.request);
        })
    );
});
workbox.routing.registerRoute(
    new RegExp('^https://matkaapi.com/'),
    new workbox.strategies.NetworkFirst() // Or any other suitable strategy
);
