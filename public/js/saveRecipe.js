document.querySelectorAll('.save-button').forEach(button => {
    button.addEventListener('click', async function() {
        const recipeId = this.getAttribute('data-recipe-id');
        const feedbackElement = this.nextElementSibling; 
        
        try {
            const response = await fetch('/saved/saved-recipe', {
                method: 'POST',
                body: JSON.stringify({ recipe_id: recipeId }),
                headers: { 'Content-Type': 'application/json' }
            });
            
            if (response.ok) {

                button.style.display = 'none';
                feedbackElement.classList.add('active');
                

                setTimeout(() => {
                    feedbackElement.classList.remove('active');
                    button.style.display = 'inline-block';
                }, 2000);
            } else {

            }
        } catch (err) {
            console.error(err);

        }
    });
});




//For deleting saved recipes
document.addEventListener("DOMContentLoaded", function() {
    const deleteButtons = document.querySelectorAll(".delete-btn");

    deleteButtons.forEach(button => {
        button.addEventListener("click", async (event) => {
            const id = event.target.getAttribute("data-id");
            const recipeCard = event.target.closest('.recipe-card'); 

            button.disabled = true;
            button.innerText = "Deleting...";

            try {
                await fetch(`/saved/saved-recipe/${id}`, {
                    method: "DELETE"
                });

                recipeCard.style.transition = "opacity 0.8s";
                recipeCard.style.opacity = 0;

                setTimeout(() => {
                    recipeCard.remove();
                }, 500);
                
            } catch (error) {
                console.error("Error:", error);
                button.disabled = false;
                button.innerText = "Delete";
                alert('Failed to delete recipe.');
            }
        });
    });
});
