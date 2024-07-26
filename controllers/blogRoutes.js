const router = require('express').Router();
const { BlogPost, User, Comment } = require('../models');

// Route to get a single blog post by id
router.get('/post/:id', async (req, res) => {
  try {
    const blogData = await BlogPost.findOne({
      where: { blogid: req.params.id },
      include: [
        {
          model: User,
          attributes: ['username'],
        },
        {
          model: Comment,
          include: [User],
        },
      ],
    });

    if (!blogData) {
      res.status(404).json({ message: 'No blog post found with this id' });
      return;
    }

    const blog = blogData.get({ plain: true });

    res.render('post', {
      blog,
      logged_in: req.session.logged_in,
      user_id: req.session.user_id,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;
