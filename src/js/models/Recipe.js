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
    parseIngredients() {
        const unitsLong = ['tablespoons', 'tablespoon', 'ounce', 'ounces', 'teaspoon', 'teaspoons', 'cup', 'cups', 'pound', 'pounds'];
        const unitsShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'cup', 'pound', 'pound'];
        const parsedIngredients = this.recipeIngridients.map((element) => {
            let ingredient = element.toLowerCase();
            unitsLong.forEach((unit, i) => {
                ingredient = ingredient.replace(unit, unitsShort[i]);
            });
            ingredient = ingredient.replace(/[\])}[{(]/g, '');

            const arrayIngreddient = ingredient.split(' ');
            const unitIndex = arrayIngreddient.findIndex(el =>unitsShort.includes(el));
            let objectIngredient;
            if (unitIndex > -1) {
                const arrCount = arrayIngreddient.slice(0, unitIndex); // 4 1/2 gets converted to [4,1/2]
                let count;
                if (arrCount.length === 1) {
                    count = eval(arrayIngreddient[0].replace('-', '+'));
                } else {
                    count = eval(arrayIngreddient.slice(0, unitIndex).join('+'))
                }
                objectIngredient = {
                    count,
                    unit: arrayIngreddient[unitIndex],
                    ingredient: arrayIngreddient.slice(unitIndex + 1).join(' ')
                }
            } else if (parseInt(arrayIngreddient[0], 10)) {
                objectIngredient = {
                    count: parseInt(arrayIngreddient[0], 10),
                    unit: '',
                    ingredient: arrayIngreddient.slice(1).join(' ')
                }
            } else if (unitIndex === -1) {
                objectIngredient = {
                    count: 1,
                    unit: '',
                    ingredient
                }
            }
            return objectIngredient;

        });
        this.recipeIngridients = parsedIngredients;
    }

}