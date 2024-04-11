fetchRecipes().then((recipes) => {
  // Accéder et afficher les recettes

  displayRecipes(recipes)

  // Fonction de recherche
  const searchBar = document.getElementById("search");
  searchBar.addEventListener("input", (event) => {
    const filteredRecipes = filterRecipes(recipes, event.target.value);
    displayRecipes(filteredRecipes);
  });
});

  // Démarrage de l'application
  fetchRecipes().then((recipes) => {
    // Accéder et afficher les recettes
    displayRandomRecipes(recipes)
  
    // Fonction de recherche
    const searchBar = document.getElementById("search");
    searchBar.addEventListener("input", (event) => {
      const filteredRecipes = filterRecipes(recipes, event.target.value);
      displayRecipes(filteredRecipes);
    });
  });
  