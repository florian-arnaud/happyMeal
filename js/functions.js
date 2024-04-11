
function displayRecipes(recipes) {
    const container = document.querySelector("#all-recipes");
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
        console.log(recipes[numbers[i]].ingredients);
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
            <h3>${recipes[numbers[i]].nom}</h3>
          </li>
          <li class="list-group-item">
            <h4>${recipes[numbers[i]].categorie}</h4>
            <p><i class="fa-regular fa-clock"></i>${recipes[numbers[i]].temps_preparation}</p>
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
  