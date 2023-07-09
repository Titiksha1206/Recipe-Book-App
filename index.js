const recipeLists = document.getElementById("Recipe-lists");

const API_KEY = "2f7225371cc84db085c82071242f9e1f";
async function getRecipies() {
  const response = await fetch(
    `https://api.spoonacular.com/recipes/random?number=10&apiKey=${API_KEY}`
  );
  const data = await response.json();
  return data.recipes;
}
displayRecipes = (recipes) => {
  recipeLists.innerHTML = "";
  recipes.forEach((recipe) => {
    const recipeItems = document.createElement("li");
    // className for li.
    recipeItems.classList.add("Recipe-items");

    const recipeImage = document.createElement("img");
    recipeImage.src = recipe.image;
    recipeImage.alt = "recipe-image";

    const recipeTitle = document.createElement("h2");
    recipeTitle.innerText = recipe.title;

    const recipeIngredients = document.createElement("p");
    recipeIngredients.innerHTML = `
    <strong>Ingredients:</strong> ${recipe.extendedIngredients
      .map((ingredient) => ingredient.original)
      .join(", ")}
    `;

    const recipeLink = document.createElement("a");
    recipeLink.href = recipe.sourceUrl;
    recipeLink.innerHTML = "View Recipe";

    recipeItems.appendChild(recipeImage);
    recipeItems.appendChild(recipeTitle);
    recipeItems.appendChild(recipeIngredients);
    recipeItems.appendChild(recipeLink);
    recipeLists.appendChild(recipeItems);
  });
};
async function init() {
  const recipes = await getRecipies();
  displayRecipes(recipes);
}
init();
