const router = require('express').Router();
const { User, BlogPost } = require('../models');
const withAuth = require('../middleware/auth');

router.get('/', async (req, res) => {
  try {
    const blogData = await BlogPost.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
      order: [['date', 'DESC']],
    });

    const blogs = blogData.map((blog) => blog.get({ plain: true }));

    res.render('home', {
      blogs,
      logged_in: req.session.logged_in,
      user_id: req.session.user_id,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/register', (req, res) => {
  res.render('register');
});

module.exports = router;
