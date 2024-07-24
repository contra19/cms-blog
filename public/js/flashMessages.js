document.addEventListener('DOMContentLoaded', function() {
  const flashMessages = document.querySelectorAll('.flash-message');
  if (flashMessages.length > 0) {
      flashMessages.forEach(message => {
          setTimeout(() => {
              message.style.transition = 'opacity 0.5s';
              message.style.opacity = '0';
              setTimeout(() => {
                  message.remove();
              }, 500); // Match this delay to the transition duration
          }, 5000); // Change this value to set the duration the message is displayed (e.g., 3000ms = 3 seconds)
      });
  }
});
