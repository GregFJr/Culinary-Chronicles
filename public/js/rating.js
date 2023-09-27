document.addEventListener('DOMContentLoaded', (event) => {
    const ratings = document.querySelectorAll('.rating');

    ratings.forEach(rating => {
        rating.addEventListener('click', function (e) {
            if (e.target.classList.contains('star')) {
                const clickedStarRating = parseInt(e.target.getAttribute('data-rating'));
                const stars = this.querySelectorAll('.star');

                stars.forEach(star => {
                    if (parseInt(star.getAttribute('data-rating')) <= clickedStarRating) {
                        star.style.color = 'gold';
                    } else {
                        star.style.color = 'gray';
                    }
                });

                // If needed in the future:
                // const recipeId = this.getAttribute('data-recipe-id');
            }
        });
    });
});


    document.getElementById('submitRating').addEventListener('click', async () => {
        const comment = document.getElementById('comment').value;

        const response = await fetch('/api/ratings', {
            method: 'POST',
            body: JSON.stringify({
                value: selectedRating,
                comment: comment,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            alert('Rating submitted successfully!');
        } else {
            alert('Failed to submit rating.');
        }
    });

