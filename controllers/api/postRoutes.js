const router = require('express').Router();
const { BlogPost } = require('../../models');
const withAuth = require('../../middleware/auth');

router.post('/posts', withAuth, async (req, res) => {
  try {
    const newPost = await BlogPost.create({
      title: req.body.title,
      content: req.body.content,
      user_id: req.session.user_id,
    });

    req.flash('successMessage', 'Blog post created successfully!');
    res.redirect('/dashboard');
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
