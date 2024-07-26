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
      body: req.body.body,
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

// Route to render the form for editing a blog post
router.get('/edit/:id', withAuth, async (req, res) => {
  try {
    const postData = await BlogPost.findByPk(req.params.id);

    if (!postData) {
      req.flash('errorMessage', 'Post not found');
      res.redirect('/dashboard');
      return;
    }

    const post = postData.get({ plain: true });

    res.render('edit-post', {
      logged_in: req.session.logged_in,
      user_id: req.session.user_id,
      post,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to handle updating a blog post
router.post('/edit/:id', withAuth, async (req, res) => {
  try {
    await BlogPost.update(
      {
        title: req.body.title,
        body: req.body.body,
      },
      {
        where: {
          blogid: req.params.id,
        },
      }
    );

    req.flash('successMessage', 'Blog post updated successfully!');
    res.redirect('/dashboard');
  } catch (err) {
    console.error(err);
    req.flash('errorMessage', 'Failed to update blog post.');
    res.redirect('/dashboard');
  }
});

// Route to handle deleting a blog post
router.delete('/delete/:id', withAuth, async (req, res) => {
  try {
    const deleted = await BlogPost.destroy({
      where: {
        blogid: req.params.id,
      },
    });

    if (!deleted) {
      req.flash('errorMessage', 'No post found with this id!');
      return res.status(404).json({ message: 'No post found with this id!' });
    }

    req.flash('successMessage', 'Post deleted successfully');
    return res.status(200).json({ message: 'Post deleted successfully' });
  } catch (err) {
    console.error(err);
    req.flash('errorMessage', 'Failed to delete post');
    return res.status(500).json({ message: 'Failed to delete post' });
  }
});

module.exports = router;
