export const uiElements = {
  searchForm: document.querySelector(".search"),
  searchInput: document.querySelector(".search__field"),
  listOfRecipies: document.querySelector(".results__list"),
  resultsContainer: document.querySelector(".results"),
};

export const elementStrings = {
  loader: "loader",
};

export const renderLoader = (container) => {
  const loader = `
  <div class="${elementStrings.loader}">
    <svg>
      <use href="img/icons.svg#icon-cw"></use>
    </svg>
  </div>
  `;
  container.insertAdjacentHTML("afterbegin", loader);
};

export const clearLoader = () => {
  const loader = document.querySelector(`.${elementStrings.loader}`);
  if (loader) {
    loader.parentElement.removeChild(loader);
  }
};
