import getData from "../api/Api.js";

const DataPreparation = {

    recipes: await getData(),
    listOfIngredients: [],
    listOfMachines: [],
    listOfTools: [],

    listsOfAdvancedFilter() {
        this.recipes.forEach(recipe => {

            recipe.ingredients.map(ingredient => {
                let ingredientName = ingredient.ingredient.toLowerCase();

                if (!this.listOfIngredients.includes(ingredientName)) {
                    this.listOfIngredients.push(ingredientName);
                }
            });

            // ---------------------------------------------------------------
            let applianceName = recipe.appliance.toLowerCase();
            if (!this.listOfMachines.includes(applianceName)) {
                this.listOfMachines.push(applianceName);
            }

            // ---------------------------------------------------------------
            recipe.ustensils.map(tool => {
                let toolName = tool.toLowerCase();

                if (!this.listOfTools.includes(toolName)) {
                    this.listOfTools.push(toolName);
                }
            });
        });
        return {
            listOfIngredients: this.listOfIngredients,
            listOfMachines: this.listOfMachines,
            listOfTools: this.listOfTools
        };
    },

    /**
     * Returns a list of recipes that match the search value.
     * @param {string} searchValue - The value to search for in the recipe name, ingredients, and description.
     * @returns {Array} - An array of recipe objects that match the search value.
     */
    listOfRecipes(searchValue) {
        let listOfRecipes = [];

        for (const recipe of this.recipes) {
            if (this.searchRecipeName(recipe, searchValue) ||
                this.searchRecipeIngredients(recipe, searchValue) ||
                this.searchRecipeDescription(recipe, searchValue)) {
                listOfRecipes.push(recipe);
            }
        };

        return listOfRecipes;
    },

    /**
     * Returns true if the recipe name includes the search value.
     * @param {Object} recipe - The recipe object to search.
     * @param {string} searchValue - The value to search for in the recipe name.
     * @returns {boolean} - True if the recipe name includes the search value, false otherwise.
     */
    searchRecipeName(recipe, searchValue) {
        return recipe.name.toLowerCase().includes(searchValue);
    },

    /**
     * Returns true if the recipe contains an ingredient that includes the search value.
     * @param {Object} recipe - The recipe object to search.
     * @param {string} searchValue - The value to search for in the recipe ingredients.
     * @returns {boolean} - True if the recipe contains an ingredient that includes the search value, false otherwise.
     */
    searchRecipeIngredients(recipe, searchValue) {
        for (const ingredient of recipe.ingredients) {
            if (ingredient.ingredient.toLowerCase().includes(searchValue)) {
                return true;
            }
        }
        return false;
    },

    /**
     * Returns true if the recipe description includes the search value.
     * @param {Object} recipe - The recipe object to search.
     * @param {string} searchValue - The value to search for in the recipe description.
     * @returns {boolean} - True if the recipe description includes the search value, false otherwise.
     */
    searchRecipeDescription(recipe, searchValue) {
        return recipe.description.toLowerCase().includes(searchValue);
    },
}

export default DataPreparation;