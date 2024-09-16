
  self.addEventListener('notificationclick', function(event) {
	event.notification.close(); 
  
	event.waitUntil(
	  clients.matchAll({
		type: 'window',
		includeUncontrolled: true 
	  }).then(function(clientList) {
		for (let i = 0; i < clientList.length; i++) {
		  const client = clientList[i];
		  if (client.url ===  'https://miguelamato.github.io/Tobichat/' && 'focus' in client) {
			return client.focus();
		  }
		}
		if (clients.openWindow) {
		  return clients.openWindow( 'https://miguelamato.github.io/Tobichat/');
		}
	  })
	);
  });