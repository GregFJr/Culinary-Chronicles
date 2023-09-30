const router = require('express').Router();
const { Rating } = require('../models');

router.post('/', async (req, res) => {
    console.log(req.body);
    try {
        const value = parseFloat(req.body.value);
        
        // Error handling for if a user tries to rate a recipe without a star value
        if (isNaN(value) || value < 1 || value > 5) {
            req.flash('error', 'Please rate before submission.');
            
            return res.redirect('/');
        }

        const newRating = await Rating.create({
            value: value,
            recipe_id: req.body.recipe_id,
            comment: req.body.comment,
            user_id: req.session.user_id
        });

        // res.redirect('/');
    } catch (err) {
        res.status(400).json(err);
    }
});





module.exports = router;
