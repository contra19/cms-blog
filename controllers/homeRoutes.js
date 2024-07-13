const router = require('express').Router();

router.get('/', async (req, res) => {
  // Get and render the home page
  res.render('home');
});

module.exports = router;
