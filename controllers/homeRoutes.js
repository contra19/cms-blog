const router = require('express').Router();
const { BlogPost } = require('../models');

router.get('/', async (req, res) => {
  try {
    // Fetch all blog posts from the database
    const blogPosts = await BlogPost.findAll({
      order: [['date', 'DESC']], // Order by date in descending order
    });

    // Format dates and pass blog posts data to the view
    const formattedBlogPosts = blogPosts.map(post => ({
      ...post.toJSON(),
      formattedDate: new Date(post.date).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
    }));

    // Render the home page template with formatted blog posts data
    res.render('home', { blogPosts: formattedBlogPosts });
  } catch (err) {
    console.error('Error fetching blog posts:', err);
    res.status(500).json({ error: 'Failed to fetch blog posts' });
  }
});

router.get('/login', (req, res) => {
  res.render('login', { userId: req.session.user_id });
});

router.get('/register', (req, res) => {
  res.render('register', { userId: req.session.user_id });
});

module.exports = router;
