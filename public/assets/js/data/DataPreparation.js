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


    listOfRecipes() {
        let listOfRecipes = [];

        this.recipes.forEach(recipe => {
            listOfRecipes.push(recipe);
        });

        return listOfRecipes;
    }

}

export default DataPreparation;