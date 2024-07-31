document.addEventListener('DOMContentLoaded', () => {
  const deleteButton = document.getElementById('delete-post-btn');
  if (deleteButton) {
    deleteButton.addEventListener('click', function() {
      const postId = document.getElementById('delete-post-form').dataset.id;
      console.log(`Attempting to delete post id: ${postId}`);

      fetch(`/dashboard/delete/${postId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        if (response.ok) {
          console.log('Post deleted successfully');
          window.location.href = '/dashboard';
        } else {
          alert('Failed to delete post');
        }
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Failed to delete post');
      });
    });
  }
});
