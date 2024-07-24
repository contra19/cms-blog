const router = require('express').Router();
const { User, BlogPost } = require('../../models');
const bcrypt = require('bcrypt');
const withAuth = require('../../middleware/auth');

// Registration route
router.post('/register', async (req, res) => {
  try {
    const userData = await User.create({
      username: req.body.username,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: req.body.password,
    });

    // Automatically log in the user after successful registration
    req.session.save(() => {
      req.session.user_id = userData.userid;
      req.session.logged_in = true;
      req.flash('successMessage', 'You are now logged in!');
      res.redirect('/dashboard');
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// Login route
router.post('/login', async (req, res) => {
  console.log('Login request received:', req.body);

  try {
    const userData = await User.findOne({ where: { username: req.body.username } });

    if (!userData) {
      console.log('User not found');
      req.flash('errorMessage', 'Incorrect username or password, please try again');
      res.redirect('/login');
      return;
    }
    
    // Compare the input password with the stored hashed password
    const validPassword = await bcrypt.compare(req.body.password, userData.password);
    
    if (!validPassword) {
      console.log('Invalid password');
      req.flash('errorMessage', 'Incorrect username or password, please try again');
      res.redirect('/login');
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.userid;
      req.session.logged_in = true;
      console.log('User logged in:', req.session.user_id);
      req.flash('successMessage', 'You are now logged in!');
      res.redirect('/dashboard');
    });

  } catch (err) {
    console.log('Error during login:', err);
    req.flash('errorMessage', 'An error occurred, please try again');
    res.redirect('/login');
  }
});

// Logout route
router.get('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.redirect('/'); // Redirect to home page after logging out
    });
  } else {
    res.status(404).end();
  }
});

// Dashboard route
router.get('/dashboard', withAuth, async (req, res) => {
  console.log('Dashboard route accessed');
  try {
    const user = await User.findByPk(req.session.user_id, {
      include: [{ model: BlogPost }],
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

module.exports = router;
