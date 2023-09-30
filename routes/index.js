const router = require('express').Router();


const homeRoutes = require('./homeRoutes');
const userRoutes = require('./userRoutes');
const ratingRoutes = require('./ratingRoutes');
const savedRoutes = require('./savedRoutes');

router.use('/', homeRoutes);
router.use('/users', userRoutes)
router.use('/ratings', ratingRoutes)
router.use('/saved', savedRoutes)


module.exports = router;