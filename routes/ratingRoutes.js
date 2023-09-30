const router = require('express').Router();
const { Rating, User, Recipe } = require('../models');

router.post('/', async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'User not authenticated' });
        }

        const value = parseFloat(req.body.value);
        
        if (isNaN(value) || value < 1 || value > 5) {
            return res.status(400).json({ message: 'Invalid rating value' });
        }

        const existingRating = await Rating.findOne({
            where: {
                user_id: req.user.id,
                recipe_id: req.body.recipe_id
            }
        });

        if (existingRating) {
            existingRating.value = value;
            existingRating.comment = req.body.comment;
            await existingRating.save();
        } else {
            await Rating.create({
                value: value,
                recipe_id: req.body.recipe_id,
                comment: req.body.comment,
                user_id: req.user.id
            });
        }

        res.json({ message: 'Rating saved successfully' });
    } catch (err) {
        res.status(400).json(err);
    }
});



router.get('/rating/:id', async (req, res) => {
    try {
        const userRating = await Rating.findOne({
            where: {
                user_id: req.user.id,
                id: req.params.id
            }
        });

        if (!userRating) {
            return res.status(404).json({ message: "No rating found for this user and recipe" });
        }

        res.status(200).json(userRating);

    } catch (err) {
        res.status(500).json(err);
    }
});






module.exports = router;
