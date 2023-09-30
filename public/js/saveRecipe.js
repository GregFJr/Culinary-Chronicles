document.querySelectorAll('.save-button').forEach(button => {
    button.addEventListener('click', async function() {
        const recipeId = this.getAttribute('data-recipe-id');
        try {
            const response = await fetch('/saved/saved-recipe', {
                method: 'POST',
                body: JSON.stringify({ recipe_id: recipeId }),
                headers: { 'Content-Type': 'application/json' }
            });
            if (response.ok) {
                alert('Recipe saved successfully!');
            } else {
                alert('Failed to save recipe.');
            }
        } catch (err) {
            console.error(err);
            alert('Failed to save recipe.');
        }
    });
});
