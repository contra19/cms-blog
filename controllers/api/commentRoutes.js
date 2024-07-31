const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../middleware/auth');

// Route to create a new comment
router.post('/', withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      body: req.body.comment,
      blogid: req.body.post_id,
      userid: req.session.user_id,
    });

    req.flash('successMessage', 'Comment added successfully!');
    res.redirect(`/post/${req.body.post_id}`);
  } catch (err) {
    console.error(err);
    req.flash('errorMessage', 'Failed to add comment.');
    res.redirect(`/post/${req.body.post_id}`);
  }
});

module.exports = router;
