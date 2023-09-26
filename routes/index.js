const router = require('express').Router();


const homeRoutes = require('./homeRoutes');
const userRoutes = require('./userRoutes');

router.use('/', homeRoutes);
router.use('/users', userRoutes)


module.exports = router;