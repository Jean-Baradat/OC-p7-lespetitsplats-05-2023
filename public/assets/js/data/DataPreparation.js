import getData from "../api/Api.js";

const DataPreparation = {

    recipes: await getData(),
    listOfIngredients: [],
    listOfMachines: [],
    listOfTools: [],
    listOfRecipes: [],

    listsOfAdvancedFilter(isInit, ASFValues) {
        this.listOfIngredients = [];
        this.listOfMachines = [];
        this.listOfTools = [];

        if (isInit) {
            this.listOfRecipes = this.recipes;
        }

        this.listOfRecipes.forEach(recipe => {

            recipe.ingredients.map(ingredient => {
                let ingredientName = ingredient.ingredient.toLowerCase();

                if (!this.listOfIngredients.includes(ingredientName) && ingredientName.includes(ASFValues.ingredient)) {
                    this.listOfIngredients.push(ingredientName);
                }
            });

            // ---------------------------------------------------------------
            let applianceName = recipe.appliance.toLowerCase();
            if (!this.listOfMachines.includes(applianceName) && applianceName.includes(ASFValues.machine)) {
                this.listOfMachines.push(applianceName);
            }

            // ---------------------------------------------------------------
            recipe.ustensils.map(tool => {
                let toolName = tool.toLowerCase();

                if (!this.listOfTools.includes(toolName) && toolName.includes(ASFValues.tool)) {
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
    handleListOfRecipes(searchValue, listOfAdvancedFilterSelected) {
        this.listOfRecipes = [];

        for (const recipe of this.recipes) {
            if (this.searchRecipeName(recipe, searchValue) ||
                this.searchRecipeIngredients(recipe, searchValue) ||
                this.searchRecipeDescription(recipe, searchValue)) {
                if (this.filterRecipesByIngredients(recipe, listOfAdvancedFilterSelected.listOfIngredients) &&
                    this.filterRecipesByMachines(recipe, listOfAdvancedFilterSelected.listOfMachines) &&
                    this.filterRecipesByTools(recipe, listOfAdvancedFilterSelected.listOfTools)) {

                    this.listOfRecipes.push(recipe);
                }
            }
        };

        console.log(this.listOfRecipes);
        return this.listOfRecipes;
    },

    filterRecipesByIngredients(recipe, ingredients) {
        if (ingredients.length !== 0) {
            return ingredients.every(ingredient => {
                return recipe.ingredients.some(ingredientData => {
                    return ingredientData.ingredient.toLowerCase() === ingredient;
                });
            });
        } else {
            return true;
        }
    },

    filterRecipesByMachines(recipe, machines) {
        if (machines.length !== 0) {
            return machines.every(machine => {
                return recipe.appliance.toLowerCase() === machine;
            });
        } else {
            return true;
        }
    },

    filterRecipesByTools(recipe, tools) {
        if (tools.length !== 0) {
            return tools.every(tool => {
                return recipe.ustensils.some(ustensil => {
                    return ustensil.toLowerCase() === tool;
                });
            });
        } else {
            return true;
        }
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