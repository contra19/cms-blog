const router = require('express').Router();
// Import the routes. This is how we make our routes modular.
const userRoutes = require('./userRoutes');

// When a request is made to the /users path, it will be directed to the index.js in the /users folder.
router.use('/users', userRoutes);

module.exports = router;