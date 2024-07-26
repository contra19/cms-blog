const router = require('express').Router();
const apiRoutes = require('./api');
const mainRoutes = require('./mainRoutes');
const blogRoutes = require('./blogRoutes');


router.use('/api', apiRoutes);
router.use('/', mainRoutes);
router.use('/', blogRoutes);

module.exports = router;
