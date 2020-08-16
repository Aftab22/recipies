import { uiElements } from "./uiElements";

//method to return the search field value
export const getInput = () => {
  return uiElements.searchInput.value;
};

//clear the previously typed search query
export const clearInput = () => {
  uiElements.searchInput.value = "";
};

//clear previous search results
export const clearResults = () => {
  uiElements.listOfRecipies.innerHTML = "";
};

const limitRecipeTitle = (title, limit = 17) => {
  if (title.length > limit) {
    let titleSplitted = title.split(" ");
    let newTitle = [];
    titleSplitted.reduce((totalLength, currentTitle) => {
      if (totalLength + currentTitle.length <= limit) {
        newTitle.push(currentTitle);
      }
      return totalLength + currentTitle.length;
    }, 0);
    return `${newTitle.join(",")}...`;
  }
  return title;
};

//create a HTML list element for each recipe , fill each field passed by renderResults forEach loop and add it to HTML
const renderRecipe = (recipe) => {
  const markup = `
  <li>
      <a class="results__link results__link--active" href="${recipe.recipe_id}">
          <figure class="results__fig">
              <img src="${recipe.image_url}" alt="Test">
          </figure>
          <div class="results__data">
              <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
              <p class="results__author">${recipe.publisher}</p>
          </div>
      </a>
  </li>
  `;
  uiElements.listOfRecipies.insertAdjacentHTML("beforeend", markup);
};

//recieve recipes , loop and pass to renderer
export const renderResults = (recipes) => {
  recipes.forEach((recipe) => {
    renderRecipe(recipe);
  });
};
