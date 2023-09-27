const router = require('express').Router();


const homeRoutes = require('./homeRoutes');
const userRoutes = require('./userRoutes');
const ratingRoutes = require('./ratingRoutes');

router.use('/', homeRoutes);
router.use('/users', userRoutes)
router.use('/ratings', ratingRoutes)


module.exports = router;