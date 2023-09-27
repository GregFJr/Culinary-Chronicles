const router = require('express').Router();
const { Rating } = require('../models');

router.post('/', async (req, res) => {
    try {
        const newRating = await Rating.create({
            ...req.body,
            user_id: req.session.user_id
        });
        res.status(200).json(newRating);
    } catch (err) {
        res.status(400).json(err);
    }
});


module.exports = router;
