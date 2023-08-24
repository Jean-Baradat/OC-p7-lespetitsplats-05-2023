import getData from "../api/Api.js";

const DataPreparation = {

    recipes: await getData(),
    listOfIngredients: [],
    listOfMachines: [],
    listOfTools: [],
    listOfRecipes: [],

    /**
     * This function filters the lists of ingredients, machines, and tools based on the 
     * main search value, the advanced filter search fields, and the selected advanced search filters
     * 
     * @param {boolean} isInit - Whether this is the initial filter or not.
     * @param {Object} ASFValues - An object containing the values for the advanced filter fields.
     * @param {Object} listOfAdvancedFilterSelected - An object containing the selected advanced search filters.
     * @returns {Object} An object containing the filtered lists of ingredients, machines, and tools.
     */
    listsOfAdvancedFilter(isInit, ASFValues, listOfAdvancedFilterSelected) {
        this.listOfIngredients = [];
        this.listOfMachines = [];
        this.listOfTools = [];

        if (isInit) {
            this.listOfRecipes = this.recipes;
        }

        this.listOfRecipes.forEach(recipe => {

            recipe.ingredients.map(ingredient => {
                let ingredientName = ingredient.ingredient.toLowerCase();

                if (!this.listOfIngredients.includes(ingredientName) &&
                    ingredientName.includes(ASFValues.ingredient) &&
                    !listOfAdvancedFilterSelected.listOfIngredients.includes(ingredientName)) {
                    this.listOfIngredients.push(ingredientName);
                }
            });

            // ---------------------------------------------------------------
            let applianceName = recipe.appliance.toLowerCase();
            if (!this.listOfMachines.includes(applianceName) &&
                applianceName.includes(ASFValues.machine) &&
                !listOfAdvancedFilterSelected.listOfMachines.includes(applianceName)) {
                this.listOfMachines.push(applianceName);
            }

            // ---------------------------------------------------------------
            recipe.ustensils.map(tool => {
                let toolName = tool.toLowerCase();

                if (!this.listOfTools.includes(toolName) &&
                    toolName.includes(ASFValues.tool) &&
                    !listOfAdvancedFilterSelected.listOfTools.includes(toolName)) {
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
     * This function filters the list of recipes based on the main search value and the selected advanced search filters.
     * 
     * @param {string} searchValue - The search value of the search bar.
     * @param {Object} listOfAdvancedFilterSelected - An object containing the selected advanced search filters.
     * @returns {Object} An object containing the filtered list of recipes.
     */
    handleListOfRecipes(searchValue, listOfAdvancedFilterSelected) {
        this.listOfRecipes = [];

        for (const recipe of this.recipes) {
            if (this.searchRecipeName(recipe, searchValue) ||
                this.searchRecipeIngredients(recipe, searchValue) ||
                this.searchRecipeDescription(recipe, searchValue)) {
                if (this.filterRecipeByIngredients(recipe, listOfAdvancedFilterSelected.listOfIngredients) &&
                    this.filterRecipeByMachines(recipe, listOfAdvancedFilterSelected.listOfMachines) &&
                    this.filterRecipeByTools(recipe, listOfAdvancedFilterSelected.listOfTools)) {

                    this.listOfRecipes.push(recipe);
                }
            }
        };

        return this.listOfRecipes;
    },

    /**
     * Returns true if the list of ingredients selected by the advanced search is/are in the recipe, otherwise false.
     * 
     * @param {Object} recipe - The recipe.
     * @param {Array} ingredients - List of ingredients selected by the advanced search.
     * @returns {boolean}
     */
    filterRecipeByIngredients(recipe, ingredients) {
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

    /**
     * Returns true if the list of machines selected by the advanced search is/are in the recipe, otherwise false.
     * 
     * @param {Object} recipe - The recipe.
     * @param {Array} machines - List of machines selected by the advanced search.
     * @returns {boolean}
     */
    filterRecipeByMachines(recipe, machines) {
        if (machines.length !== 0) {
            return machines.every(machine => {
                return recipe.appliance.toLowerCase() === machine;
            });
        } else {
            return true;
        }
    },

    /**
     * Returns true if the list of tools selected by the advanced search is/are in the recipe, otherwise false.
     * 
     * @param {Object} recipe - The recipe.
     * @param {Array} tools - List of tools selected by the advanced search.
     * @returns {boolean}
     */
    filterRecipeByTools(recipe, tools) {
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
     * 
     * @param {Object} recipe - The recipe object to search.
     * @param {string} searchValue - The value to search for in the recipe name.
     * @returns {boolean} - True if the recipe name includes the search value, false otherwise.
     */
    searchRecipeName(recipe, searchValue) {
        return recipe.name.toLowerCase().includes(searchValue);
    },

    /**
     * Returns true if the recipe contains an ingredient that includes the search value.
     * 
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
     * 
     * @param {Object} recipe - The recipe object to search.
     * @param {string} searchValue - The value to search for in the recipe description.
     * @returns {boolean} - True if the recipe description includes the search value, false otherwise.
     */
    searchRecipeDescription(recipe, searchValue) {
        return recipe.description.toLowerCase().includes(searchValue);
    },
}

export default DataPreparation;