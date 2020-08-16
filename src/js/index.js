import Search from "./models/Search";

// Global State of our app
// -Search Object
// -Current ObjectShopping List
// -Liked Recipies
const state = {};

const controlSearch = async () => {
    //1.get search query
    const query = "pizza";
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

document.querySelector(".search").addEventListener("submit", (event) => {
    event.preventDefault();
    controlSearch();
});

const search = new Search("pizza");
search.getResults();