const router = require('express').Router();


const homeRoutes = require('./homeRoutes');
const userRoutes = require('./userRoutes');
const ratingRoutes = require('./ratingRoutes');
const savedRoutes = require('./savedRoutes');
const socialRoutes = require('./socialRoutes');

router.use('/', homeRoutes);
router.use('/users', userRoutes)
router.use('/ratings', ratingRoutes)
router.use('/saved', savedRoutes)
router.use('/social', socialRoutes)


module.exports = router;