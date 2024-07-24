document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded and parsed');
    const flashMessages = document.querySelectorAll('.flash-message');
    console.log('Flash messages:', flashMessages);
    if (flashMessages.length > 0) {
      flashMessages.forEach(message => {
        setTimeout(() => {
          console.log('Hiding message:', message);
          message.style.transition = 'opacity 0.5s';
          message.style.opacity = '0';
          setTimeout(() => {
            console.log('Removing message:', message);
            message.remove();
          }, 500); // Match this delay to the transition duration
        }, 3000); // Change this value to set the duration the message is displayed (e.g., 3000ms = 3 seconds)
      });
    }
});
