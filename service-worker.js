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