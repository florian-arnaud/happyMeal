fetchRecipes().then((recipes) => {
  // Accéder et afficher les recettes
  displayRecipes(recipes)
  displayRandomRecipes(recipes)
  checkFavorite(recipes)
  // Fonction de recherche
  const searchBar = document.getElementById("search");
  searchBar.addEventListener("input", (event) => {
    const filteredRecipes = filterRecipes(recipes, event.target.value);
    displayRecipes(filteredRecipes);
  });
});

generateIngredientsFile()
