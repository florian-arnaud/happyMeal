// Fonction pour récupérer les données JSON
async function fetchRecipes() {
  try {
    const response = await fetch("data.json");
    const jsonData = await response.json();
    return jsonData.recettes;
  } catch (error) {
    console.error("Erreur lors du chargement des recettes:", error);
  }
}

// Fonction pour afficher les recettes
function displayRecipes(recipes) {
  const container = document.querySelector("section");
  container.innerHTML = "";

  recipes.forEach((recipe) => {
    const ingredientsHtml = recipe.ingredients.map(
      (ingredient) => `<li class="list-group-item">${ingredient.nom}: ${ingredient.quantite}</li>`
    ).join("");

    const stepsHtml = recipe.etapes.map(
      (step) => `<li class="list-group-item">${step}</li>`
    ).join("");

    const recipeHtml = `
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

    container.innerHTML += recipeHtml;
  });
}

// Fonction pour filtrer les recettes
function filterRecipes(recipes, searchTerm) {
  const lowerCaseSearchTerm = searchTerm.toLowerCase();
  return recipes.filter((recipe) => {
    return (
      recipe.nom.toLowerCase().includes(lowerCaseSearchTerm) ||
      recipe.ingredients.some((ingredient) => ingredient.nom.toLowerCase().includes(lowerCaseSearchTerm))
    );
  });
}

// Démarrage de l'application
fetchRecipes().then((recipes) => {
  // Accéder et afficher les recettes
  console.log(recipes);
  displayRecipes(recipes);

  // Fonction de recherche
  const searchBar = document.getElementById("search");
  searchBar.addEventListener("input", (event) => {
    const filteredRecipes = filterRecipes(recipes, event.target.value);
    displayRecipes(filteredRecipes);
  });
});
