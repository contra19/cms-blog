const router = require('express').Router();
const apiRoutes = require('./api');
const mainRoutes = require('./mainRoutes');
const blogRoutes = require('./blogRoutes');
const dashboardRoutes = require('./dashboardRoutes');


router.use('/api', apiRoutes);
router.use('/', mainRoutes);
router.use('/', blogRoutes);
router.use('/dashboard', dashboardRoutes);

module.exports = router;
