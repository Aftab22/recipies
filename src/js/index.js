import Search from "./models/Search";
import * as searchView from "./views/searchView";
import { uiElements } from "./views/uiElements";

// Global State of our app
// -Search Object
// -Current ObjectShopping List
// -Liked Recipies
const state = {
  search: null,
};

const controlSearch = async () => {
  //step2 perform search
  //1.get search query
  const query = searchView.getInput();
  if (query) {
    //2.create new search object and add to state
    state.search = new Search(query);
    //3.Prepare the UI for search results
    //4.perform search api call for search object
    await state.search.getResults();
    //5.Render the result of API call
    console.warn(state.search.results);
  }
};

//step1 listen to query search bar
uiElements.searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  controlSearch();
});
