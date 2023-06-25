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


    listOfRecipes(searchValue) {
        let listOfRecipes = [];

        this.recipes.forEach(recipe => {
            // Search in the name of the recipe
            if (recipe.name.toLowerCase().includes(searchValue)) {
                if (!listOfRecipes.includes(recipe)) {
                    listOfRecipes.push(recipe);
                }
            }
            // Search in the ingredients of the recipe
            recipe.ingredients.forEach(ingredient => {
                if (ingredient.ingredient.toLowerCase().includes(searchValue)) {
                    if (!listOfRecipes.includes(recipe)) {
                        listOfRecipes.push(recipe);
                    }
                }
            });
            // Search in the description of the recipe
            if (recipe.description.toLowerCase().includes(searchValue)) {
                if (!listOfRecipes.includes(recipe)) {
                    listOfRecipes.push(recipe);
                }
            }
        });

        return listOfRecipes;
    }

}

export default DataPreparation;