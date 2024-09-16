const CACHE_NAME = 'tobichat-cache-v1';

/*
const urlsToCache = [
    '/',
    '/Tobichat/index.html',
    '/Tobichat/TobiCon.png',        
    '/Tobichat/src/styles/chat.css', 
    '/Tobichat/src/main.jsx',        
    '/Tobichat/src/components/MessageInput.jsx',
    '/Tobichat/src/components/MessageList.jsx',
    '/Tobichat/src/components/ThemeContext.jsx',
    '/Tobichat/src/components/ThemeToggle.jsx',
    '/Tobichat/src/components/TobiChat.jsx',
    '/Tobichat/src/App.jsx'
];
*/

const urlsToCache = [
    '/',
    '/index.html',
    '/TobiCon.png',        
    '/src/styles/chat.css', 
    '/src/main.jsx',        
    '/src/components/MessageInput.jsx',
    '/src/components/MessageList.jsx',
    '/src/components/ThemeContext.jsx',
    '/src/components/ThemeToggle.jsx',
    '/src/components/TobiChat.jsx',
    '/src/App.jsx'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Archivos en caché');
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                if (response) {
                    return response; 
                }
                return fetch(event.request); 
            })
    );
});


self.addEventListener('activate', (event) => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

self.addEventListener('push', (event) => {
	const options = {
	  body: event.data.text(),
	  icon: '/TobiCon.png',
	  badge: '/TobiCon.png'
	};
  
	event.waitUntil(
	  self.registration.showNotification('TobiChat', options)
	);
});

self.addEventListener('notificationclick', (event) => {
	event.notification.close();
	event.waitUntil(
	  clients.openWindow('/')
	);
});