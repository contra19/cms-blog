const router = require('express').Router();
const { User, BlogPost } = require('../models');
const withAuth = require('../middleware/auth');

// Dashboard route
router.get('/', withAuth, async (req, res) => {
  try {
    const user = await User.findByPk(req.session.user_id, {
        include: [{
          model: BlogPost,
          separate: true,
          order: [['date', 'DESC']], 
        }],
      });

    if (!user) {
      req.flash('errorMessage', 'User not found');
      res.redirect('/login');
      return;
    }

    const userPosts = user.BlogPosts.map((post) => post.get({ plain: true }));

    console.log('userPosts:', userPosts);
    res.render('dashboard', {
      logged_in: req.session.logged_in,
      user_id: req.session.user_id,
      posts: userPosts,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to render the form for adding a new blog post
router.get('/new', withAuth, (req, res) => {
  res.render('new-post', {
    logged_in: req.session.logged_in,
  });
});

// Route to handle creating a new blog post
router.post('/new', withAuth, async (req, res) => {
  try {
    const newPost = await BlogPost.create({
      title: req.body.title,
      body: req.body.body, // Note the change from req.body.content to req.body.body
      userid: req.session.user_id,
    });

    req.flash('successMessage', 'New blog post created successfully!');
    res.redirect('/dashboard');
  } catch (err) {
    console.error(err);
    req.flash('errorMessage', 'Failed to create new blog post.');
    res.redirect('/dashboard');
  }
});

module.exports = router;
