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
                        star.style.color = 'black';
                    }
                });
            }

        });
    });
});

document.querySelectorAll('.star').forEach(star => {
    star.addEventListener('click', function(e) {
        const rating = e.target.getAttribute('data-rating');
        document.getElementById('ratingValue').value = rating;
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

// Get the modal, button, and close elements
var modal = document.getElementById("commentModal");
var btn = document.getElementById("commentButton"); // Assuming you have a button with this ID to trigger the modal
var span = document.getElementsByClassName("close-button")[0];

// Open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// Close the modal when 'x' is clicked
span.onclick = function() {
  modal.style.display = "none";
}

// Close the modal if anywhere outside of the modal content is clicked
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

document.getElementById('commentBtn').addEventListener('click', function() {
    document.getElementById('ratingForm').submit();
});
