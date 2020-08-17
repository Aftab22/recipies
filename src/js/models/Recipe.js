import axios from 'axios';

export default class Recipe {
    constructor(recipeId) {
        this.recipeId = recipeId;
    }
    async getRecipeDetails() {
        try {
            const res = await axios(
                `https://forkify-api.herokuapp.com/api/get?rId=${this.recipeId}`
            );
            this.recipeTitle = res.data.recipe.title;
            this.recipeAuthor = res.data.recipe.publisher;
            this.recipeImage = res.data.recipe.image_url;
            this.recipeURL = res.data.recipe.source_url;
            this.recipeIngridients = res.data.recipe.ingredients;
            this.recipeServes = 4;
        } catch (error) {
            alert(error);
        }
    }

    calculateCookTime() {
        const numberOfIngredients = this.recipeIngridients.length;
        const fifteenMinPeriods = Math.ceil(numberOfIngredients / 3);
        this.recipeCookTime = fifteenMinPeriods * 15;
    }

}