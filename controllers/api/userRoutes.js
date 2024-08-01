const router = require('express').Router();
const { User, BlogPost } = require('../../models');
const bcrypt = require('bcrypt');

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
    console.error('Error during registration:', err); 
    req.flash('errorMessage', 'Error during registration: ' + err.message);
    res.redirect('/register');
  }
});

// Login route
router.post('/login', async (req, res) => {
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
      console.log('User logged in with id:', req.session.user_id);
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

module.exports = router;
