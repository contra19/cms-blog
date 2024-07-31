document.addEventListener('DOMContentLoaded', function() {
  const flashMessages = document.querySelectorAll('.flash-message');
  if (flashMessages.length > 0) {
      flashMessages.forEach(message => {
          setTimeout(() => {
              message.style.transition = 'opacity 0.5s';
              message.style.opacity = '0';
              setTimeout(() => {
                  message.remove();
              }, 500); // Transition duration
          }, 5000); // Duration the message is displayed (e.g., 3000ms = 3 seconds)
      });
  }
});
