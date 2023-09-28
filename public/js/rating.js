document.querySelector('body').addEventListener('click', function(e) {
    if (e.target.classList.contains('star')) {
        const rating = e.target.getAttribute('data-rating');
        const parentRatingDiv = e.target.closest('.rating');
        const ratingInput = parentRatingDiv.querySelector('#ratingValue');


        ratingInput.value = rating;
        

        const stars = parentRatingDiv.querySelectorAll('.star');
        stars.forEach(star => {
            if (parseInt(star.getAttribute('data-rating')) <= parseInt(rating)) {
                star.style.color = 'gold';
            } else {
                star.style.color = 'black';
            }
        });
    }
});


document.querySelectorAll('.star').forEach(star => {
    star.addEventListener('click', function(e) {
        const rating = e.target.getAttribute('data-rating');
        document.getElementById('ratingValue').value = rating;
        console.log('Rating set to:', rating);
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

document.querySelectorAll('.recipe-card').forEach(card => {
    const recipeId = card.querySelector('input[name="recipe_id"]').value;

    card.querySelector(`#commentButton-${recipeId}`).onclick = function() {
        document.getElementById(`commentModal-${recipeId}`).style.display = "block";
    }

    // Close the modal when 'x' is clicked
    card.querySelector('.close-button').onclick = function() {
        document.getElementById(`commentModal-${recipeId}`).style.display = "none";
    }
});

// Close the modal if anywhere outside of the modal content is clicked
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = "none";
    }
}


