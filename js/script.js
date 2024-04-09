// Récupération des données JSON
async function getRecipes() {
  try {
    const response = await fetch("data.json");
    let recipes = await response.json();
    recipes = recipes.recettes // Plus facile à manipuler
    displayRecipes(recipes);
  } catch (error) {
    console.error("Erreur lors du chargement des tâches:", error);
  }
}

function displayRecipes(recipes) {
  const containerRecipes = document.querySelector("section");
  recipes.forEach((recipe) => {
    const ingredientsHtml = recipe.ingredients.map(
      (ingredient) => `<li class="list-group-item">${ingredient.nom}: ${ingredient.quantite}</li>`
    ).join("");
    console.log(ingredientsHtml);
    const stepsHtml = recipe.etapes.map(
      (step) => `<li class="list-group-item">${step}</li>`
    ).join("");

    // Création des éléments HTML à chaque ittération
    containerRecipes.innerHTML += `
      <article class="col-sm-12 col-md-4">
        <ul class="list-group list-group-flush">
          <li class="list-group-item">
            <h3>${recipe.nom}</h3>
          </li>
          <li class="list-group-item">
            <h4>${recipe.categorie}</h4>
            <p><i class="fa-regular fa-clock"></i>${recipe.temps_preparation}</p>
          </li>
          <li class="list-group-item">
            <h4>Ingrédients</h4>
            <ul class="list-group list-group-flush">${ingredientsHtml}</ul>
          </li>
          <li class="list-group-item">
            <h4>Étapes</h4>
            <ol class="list-group list-group-numbered list-group-flush">${stepsHtml}</ol>
          </li>
        </ul>
      </article>`;
  });
}

getRecipes();
