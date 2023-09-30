document.querySelector("body").addEventListener("click", function (e) {
    if (e.target.classList.contains("star")) {
      const rating = e.target.getAttribute("data-rating");
      const parentRatingDiv = e.target.closest(".rating");
      const ratingInput = parentRatingDiv.querySelector("#ratingValue");
      const recipeId = parentRatingDiv.getAttribute("data-recipe-id"); // Assuming each rating div has a data-recipe-id attribute
  
      ratingInput.value = rating;
  
      const stars = parentRatingDiv.querySelectorAll(".star");
      stars.forEach((star) => {
        if (parseInt(star.getAttribute("data-rating")) <= parseInt(rating)) {
          star.textContent = "★"; 
          star.classList.remove("outlined");
          star.classList.add("filled");
        } else {
          star.textContent = "☆"; 
          star.classList.remove("filled");
          star.classList.add("outlined");
        }
      });

      fetch('/ratings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            value: rating,
            recipe_id: recipeId
        })
      })
      .then(response => response.json())
      .then(data => {
          if (data.message) {
              console.log(data.message);
          }
      })
      .catch(error => {
          console.error('Error:', error);
      });
    }
  });

  

document.querySelectorAll(".star").forEach((star) => {
  star.addEventListener("click", function (e) {
    const rating = e.target.getAttribute("data-rating");
    document.getElementById("ratingValue").value = rating;
    console.log("Rating set to:", rating);
  });
});


document.querySelectorAll(".recipe-card").forEach((card) => {
  const recipeId = card.querySelector('input[name="recipe_id"]').value;

  // Open the modal
  card.querySelector(`#commentButton-${recipeId}`).onclick = function () {
    document.getElementById(`commentModal-${recipeId}`).style.display = "block";
  };

  // Submit the comment
  card.querySelector(".submit-comment").onclick = function () {

    // After successful submission:
    const successMessage = document.getElementById(
      `successMessage-${recipeId}`
    );
    successMessage.style.display = "block";
    setTimeout(() => {
      successMessage.style.display = "none"; 
    }, 2000);

  };

  // Close the modal when 'x' is clicked
  card.querySelector(".close-button").onclick = function () {
    document.getElementById(`commentModal-${recipeId}`).style.display = "none";
  };
});

// Close the modal if anywhere outside of the modal is clicked
window.onclick = function (event) {
  if (event.target.classList.contains("modal")) {
    event.target.style.display = "none";
  }
};

//for drink selectors, still need further updates but will work for demo purposes

document.querySelectorAll(".drinks-card").forEach((card) => {
    const drinkId = card.querySelector('input[name="recipe_id"]').value;
  
    // Open the modal
    card.querySelector(`#commentButton-${drinkId}`).onclick = function () {
      document.getElementById(`commentModal-${drinkId}`).style.display = "block";
    };
  
    // Submit the comment
    card.querySelector(".submit-comment").onclick = function () {
  
      // After successful submission:
      const successMessage = document.getElementById(
        `successMessage-${drinkId}`
      );
      successMessage.style.display = "block";
      setTimeout(() => {
        successMessage.style.display = "none"; 
      }, 2000);
  
    };
  
    // Close the modal when 'x' is clicked
    card.querySelector(".close-button").onclick = function () {
      document.getElementById(`commentModal-${drinkId}`).style.display = "none";
    };
  });
  
  // Close the modal if anywhere outside of the modal content is clicked
  window.onclick = function (event) {
    if (event.target.classList.contains("modal")) {
      event.target.style.display = "none";
    }
  };
  