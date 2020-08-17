import Search from "./models/Search";
import Recipe from "./models/Recipe";
import * as searchView from "./views/searchView";
import {
  uiElements,
  renderLoader,
  clearLoader
} from "./views/uiElements";

// Global State of our app
// -Search Object
// -Current ObjectShopping List
// -Liked Recipes
const state = {
  search: null,
};




//Search Controller
const controlSearch = async () => {
  //step2 perform search
  //1.get search query
  const query = searchView.getInput();
  if (query) {
    //2.create new search object and add to state
    state.search = new Search(query);
    //3.Prepare the UI for search results
    searchView.clearInput();
    searchView.clearResults();
    renderLoader(uiElements.resultsContainer);
    //4.perform search api call for search object
    try {
      await state.search.getResults();
      //5.Render the result of API call
      clearLoader();
      searchView.renderResults(state.search.results);
      console.warn(state.search.results);
    } catch (error) {
      alert(error)
      clearLoader();
    }
  }
};

//step1 listen to query search bar
uiElements.searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  controlSearch();
});

uiElements.buttonsContainer.addEventListener("click", (event) => {
  const btn = event.target.closest(".btn-inline");
  if (btn) {
    searchView.clearResults();
    const goToPage = parseInt(btn.dataset.gotopage, 10);
    searchView.renderResults(state.search.results, goToPage);
  }
});



//Recipe Controller

const controlRecipe = async () => {
  const id = window.location.hash.replace("#", '');
  if (id) {
    state.recipe = new Recipe(id)
    try {
      await state.recipe.getRecipeDetails();
      state.recipe.calculateCookTime();
      console.warn(state.recipe);
    } catch (error) {
      alert(error)
    }

  }
}


window.addEventListener("hashchange", controlRecipe);
window.addEventListener("load", controlRecipe);
["hashchange", "load"].forEach((event) => {
  window.addEventListener(event, controlRecipe)
})