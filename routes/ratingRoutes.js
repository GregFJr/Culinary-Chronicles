const router = require('express').Router();
const { Rating } = require('../models');

router.post('/', async (req, res) => {
    console.log(req.body);
    try {
        const value = parseFloat(req.body.value);
        
        // Validating the rating value, mostly for testing purposes
        if (isNaN(value) || value < 1 || value > 5) {
            return res.status(400).json({ error: 'Invalid rating value' });
        }

        const newRating = await Rating.create({
            value: value,
            recipe_id: req.body.recipe_id,
            comment: req.body.comment,
            user_id: req.session.user_id
        });

        res.status(200).json(newRating);
    } catch (err) {
        res.status(400).json(err);
    }
});





module.exports = router;
