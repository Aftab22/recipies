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
  uiElements.buttonsContainer.innerHTML = "";
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

//type can be 'previous' or 'next'
const createButton = (page, type, numOfPages) =>
  `
  <button class="btn-inline results__btn--${
    type === "previous" ? "prev" : "next"
  }" data-gotopage=${type === "previous" ? page - 1 : page + 1}>
      <svg class="search__icon">
          <use href="img/icons.svg#icon-triangle-${
            type === "previous" ? "left" : "right"
          }"></use>
      </svg>
      <span>Page ${type === "previous" ? page - 1 : page + 1}${
    type === "next" && numOfPages > 1 ? "/" + numOfPages : ""
  }</span>
  </button>
  `;

const renderPaginationButtons = (page, totalRecipies, recipesPerPage) => {
  const numOfPages = Math.ceil(totalRecipies / recipesPerPage);
  let button;
  if (page === 1 && numOfPages > 1) {
    //Button to go to next page
    button = createButton(page, "next", numOfPages);
  } else if (page < numOfPages && numOfPages > 1) {
    //Button to go to next page AND previous page
    button = `
    ${createButton(page, "next", numOfPages)}
    ${createButton(page, "previous")}
    `;
  } else if (page === numOfPages && numOfPages > 1) {
    //Button to go to previous page
    button = createButton(page, "previous");
  }
  uiElements.buttonsContainer.insertAdjacentHTML("afterbegin", button);
};
//recieve recipes , loop and pass to renderer
//add pagination
export const renderResults = (recipes, page = 1, recipesPerPage = 5) => {
  const start = (page - 1) * recipesPerPage;
  const end = page * recipesPerPage;
  recipes.slice(start, end).forEach((recipe) => {
    renderRecipe(recipe);
  });
  renderPaginationButtons(page, recipes.length, recipesPerPage);
};
