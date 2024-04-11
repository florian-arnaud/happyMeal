
function displayRecipes(recipes) {
    let id = 1;
    const container = document.querySelector("#all-recipes");
    container.innerHTML = "";
    console.log(recipes);

    recipes.forEach((recipe) => {
      const ingredientsHtml = recipe.ingredients.map(
        (ingredient) => `<li class="list-group-item">${ingredient.nom}: ${ingredient.quantite} <i class="fa-solid fa-plus" onclick="addIngredientToList('${ingredient.nom}')"></i></li>`
      ).join("");
      const stepsHtml = recipe.etapes.map(
        (step) => `<li class="list-group-item">${step}</li>`
      ).join("");
  
      const recipeHtml = `
        <article class="col-sm-12 col-md-4">
          <ul class="list-group list-group-flush">
            <li class="list-group-item">
              <h3 data-bs-toggle="collapse" data-bs-target=".recipeDetails-${recipe.id}">${recipe.nom} <i id='${recipe.id}' class="fa-regular fa-star" onclick="addFavorite('${recipe.nom}', '${recipe.id}')"></i></h3>
            </li>
            <li class="list-group-item">
              <h4>${recipe.categorie}</h4>
              <p><i class="fa-regular fa-clock"></i>${recipe.temps_preparation}</p>
            </li>
            <li class="list-group-item collapse recipeDetails-${recipe.id}">
              <h4>Ingrédients</h4>
              <ul class="list-group list-group-flush">${ingredientsHtml}</ul>
            </li>
            <li class="list-group-item collapse recipeDetails-${recipe.id}">
              <h4>Étapes</h4>
              <ol class="list-group list-group-numbered list-group-flush">${stepsHtml}</ol>
            </li>
          </ul>
        </article>`;
  
      container.innerHTML += recipeHtml;
    });
  }

  /* FONCTIONS LOCAL STORAGE*/
  // Ajoute la recette en favori et change l'icone de favori
function addFavorite(recipeName, id) {
    document.getElementById(id).classList.remove("fa-regular")
    document.getElementById(id).classList.add("fa-solid")
    document.getElementById(id).removeAttribute("onclick")
    document.getElementById(id).setAttribute("onclick", `removeFavorite('${recipeName}', '${id}')`)
    localStorage.setItem(recipeName, 1)
    console.log(localStorage);
}
  // Enlève la recette des favoris et change l'icone de favori

function removeFavorite(recipeName, id) {
    document.getElementById(id).classList.remove("fa-solid")
    document.getElementById(id).classList.add("fa-regular")
    document.getElementById(id).removeAttribute("onclick")
    document.getElementById(id).setAttribute("onclick", `addFavorite('${recipeName}', '${id}')`)
    localStorage.removeItem(recipeName, 1)
}

function addIngredientToList(ingredient) {
    console.log(ingredient);
    let ingredientsList = []
    localStorage.setItem("Liste des courses", ingredient)
    ingredientsList.push(localStorage.getItem("Liste des courses"))

}
function checkFavorite(recipes) {
recipes.forEach(recipe => {
    if(localStorage.getItem(recipe.nom))
    {
        addFavorite(recipe.nom, recipe.id)
    }

});
    
}
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
  function generateRandomNumbers(recipes) {
    const numbers = [];
    let numberOfRecipes = recipes.length
    while (numbers.length < 3) {
      const randomNumber = Math.floor(Math.random() * numberOfRecipes);
      if (!numbers.includes(randomNumber)) {
        numbers.push(randomNumber);
      }
    }
    return numbers;
  }
  
  function displayRandomRecipes(recipes) {
    let numbers = generateRandomNumbers(recipes)
    const container = document.querySelector("#random-recipes");
    container.innerHTML = "";
    for (let i = 0; i < numbers.length; i++) {
      const ingredientsHtml = recipes[numbers[i]].ingredients.map(
        (ingredient) => `<li class="list-group-item">${ingredient.nom}: ${ingredient.quantite}</li>`
      ).join("");
  
      const stepsHtml = recipes[numbers[i]].etapes.map(
        (step) => `<li class="list-group-item">${step}</li>`
      ).join("");

      const recipeHtml = `
      <article class="col-sm-12 col-md-4">
        <ul class="list-group list-group-flush">
          <li class="list-group-item">
            <h3 data-bs-toggle="collapse" data-bs-target=".recipeDetails-random-${recipes[numbers[i]].id}">${recipes[numbers[i]].nom} <i id='${recipes[numbers[i]].id}' class="fa-regular fa-star" onclick="addFavorite('${recipes[numbers[i]].nom}', '${recipes[numbers[i]].id}')"></i></h3>

          </li>
          <li class="list-group-item">
            <h4>${recipes[numbers[i]].categorie}</h4>
            <p><i class="fa-regular fa-clock"></i>${recipes[numbers[i]].temps_preparation}</p>
          </li>
          <li class="list-group-item collapse recipeDetails-random-${recipes[numbers[i]].id}">
            <h4>Ingrédients</h4>
            <ul class="list-group list-group-flush">${ingredientsHtml}</ul>
          </li>
          <li class="list-group-item collapse recipeDetails-random-${recipes[numbers[i]].id}"">
            <h4>Étapes</h4>
            <ol class="list-group list-group-numbered list-group-flush">${stepsHtml}</ol>
          </li>
        </ul>
      </article>`;
  
      container.innerHTML += recipeHtml;


      
    }
  
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
  
