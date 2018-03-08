
var CACHE_NAME = 'sudoku-app-cache-v1';
var urlsToCache = [
  '/',
  '/static/images/icons/icon-72x72.png',
  '/static/images/icons/icon-96x96.png',
  '/static/images/icons/icon-128x128.png',
  '/static/images/icons/icon-144x144.png',
  '/static/images/icons/icon-152x152.png',
  '/static/images/icons/icon-192x192.png',
  '/static/images/icons/icon-384x384.png',
  '/static/images/icons/icon-512x512.png',
  '/static/styles/sudoku.css',
  'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css',
  'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css',
  '/static/ui.js'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});
