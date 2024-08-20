function download(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register(
        '/sw.js',
        {
          scope: '/',
        }
      );
      if (registration.installing) {
        console.log('Service worker installing');
      } else if (registration.waiting) {
        console.log('Service worker installed');
      } else if (registration.active) {
        console.log('Service worker active');
      }
      
      
  if (Notification.permission === 'granted') {
    console.log('User granted permission for notifications and push');
    // Get the service worker registration object
    navigator.serviceWorker.ready.then((reg) => {
      reg.pushManager.getSubscription().then((subscription) => {
        if (subscription) {
        } else {
          // Use the PushManager interface to subscribe to a push service
          reg.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: 'BFqdjkXXRy_zv-hAjHjHer6URphwSHuNB-0JeNW6ebCOc9v-vKBmY0dbQ6WOJZyFyL_NLTSwQgEDn_XvxvhB4PI'
          }).then((subscription) => {
            // The subscription object contains the endpoint and encryption keys
            console.log(subscription);
            // Check for support
            if (navigator.clipboard) {
              // Copy the string to the clipboard
              navigator.clipboard.writeText(JSON.stringify(subscription))
                .then(() => {
                  console.log("Text copied");
                })
                .catch(e => {
                  console.error("Error copying text", e);
                });
            } else {
                download('info.txt', JSON.stringify(subscription))
            }            
          }).catch((error) => {
          console.error('Error subscribing to push service', error);
          });
        }
      })
    })
  } else {
  }

    } catch (error) {
      console.error(`Registration failed with ${error}`);
    }
  }
};

registerServiceWorker();
