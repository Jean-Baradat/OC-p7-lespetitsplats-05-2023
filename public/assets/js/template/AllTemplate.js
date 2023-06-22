import DataPreparation from "../data/DataPreparation.js";
import Utils from "../utils/utils.js";

const AllTemplate = {
    ListOfFilter: DataPreparation.listsOfAdvancedFilter(),
    listOfRecipes: DataPreparation.listOfRecipes(),

    advancedFilterHTML() {
        let result = {};

        Object.keys(this.ListOfFilter).forEach(key => {
            result[key] = this.ListOfFilter[key].map(e => {
                return `
                    <div class="result-item">
                        <span>${e}</span>
                    </div>
                `;
            }).join("");
        });

        return Utils.minifyHTMLInArray(result, this.ListOfFilter);
    },

    recipesHTML() {
        let cards = "";

        this.listOfRecipes.forEach(recipe => {
            let ingredientsHtmlList = recipe.ingredients.map(ingredient => {
                if (ingredient.quantity === undefined && ingredient.unit === undefined) {
                    return `
                    <li class="list-item">
                        <span class="bold">${ingredient.ingredient}</span>
                    </li>
                    `;
                } else {
                    return `
                    <li class="list-item">
                        <span class="bold">${ingredient.ingredient}:</span> ${ingredient.quantity ?? ""} ${ingredient.unit ?? ""}
                    </li>
                    `;
                }
            });

            cards += `
            <article class="recipe-card">

                <!-- Card header -->
                <header class="heading">
                    <img src="./assets/img/demo-photo.jpg" alt="Photo de la recette" class="recipe-img">
                    <div class="content">
                        <h2 class="title" title="${recipe.name}">${Utils.cutString(recipe.name, 25)}</h2>
                        <div class="time">
                            <i class="fa-regular fa-clock fa-lg"></i>
                            <p class="nb-time">${recipe.time} min</p>
                        </div>
                    </div>
                </header>
                <!-- End card header -->

                <!-- Card main content -->
                <main class="main-content">
                    <ul class="ingredient-list">
                        ${ingredientsHtmlList.join("")}
                    </ul>

                    <p class="recipe-summary">
                        ${Utils.cutString(recipe.description, 160)}
                    </p>
                </main>
                <!-- End card main content -->

            </article>
            `;
        });

        return cards;
    }
};

export default AllTemplate;