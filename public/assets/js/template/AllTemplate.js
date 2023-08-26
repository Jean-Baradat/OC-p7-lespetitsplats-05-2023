import DataPreparation from "../data/DataPreparation.js";
import Utils from "../utils/Utils.js";

/**
 * Contains all the methods for generating HTML content.
 * 
 * @namespace AllTemplate
 * @version 1.0.0
 * @since 1.0.0
 * 
 * @created 2023-05
 * @updated 2023-08-26
 * 
 * @author Jean Baradat
 * @modifiedby Jean Baradat
 * 
 * @property {method} advancedFilterHTML - Generates the HTML for the advanced filter section.
 * @property {method} recipesHTML - Generates the HTML for the recipe cards based on the search value and selected advanced filters.
 */
const AllTemplate = {

    /**
     * Generates the HTML for the advanced filter section.
     * 
     * @memberof AllTemplate
     * @method advancedFilterHTML
     * 
     * @param {boolean} isInit - Indicates whether the function is being called for the first time.
     * @param {Object} ASFValues - The values of the advanced search filters.
     * @param {Object} listOfAdvancedFilterSelected - The list of selected advanced filters.
     * @returns {string} The generated HTML for the advanced filter section.
     */
    advancedFilterHTML(isInit, ASFValues, listOfAdvancedFilterSelected) {
        let result = {};
        let ListOfFilter = DataPreparation.listsOfAdvancedFilter(isInit, ASFValues, listOfAdvancedFilterSelected);

        for (const [key, value] of Object.entries(ListOfFilter)) {
            if (value.length != 0) {
                result[key] = value.map(e => {
                    return `
                        <div class="advanced-filter-item" data-name="${e}" data-list-type="${key}">
                            <p class="text">${e.charAt(0).toUpperCase() + e.slice(1)}</p>
                            <button class="btn-close">
                                <i class="fa-regular fa-circle-xmark fa-xl"></i>
                            </button>
                        </div>
                    `;
                }).join("");
            } else {
                result[key] = `
                    <div class="empty">
                        <span>Aucun résultat</span>
                    </div>
                `;
            }
        }

        return Utils.minifyHTMLInArray(result, Object.keys(ListOfFilter));
    },

    /**
     * Generates the HTML for the recipe cards based on the search value and selected advanced filters.
     * 
     * @memberof AllTemplate
     * @method recipesHTML
     * 
     * @param {string} searchValue - The search value.
     * @param {Object} listOfAdvancedFilterSelected - The list of selected advanced filters.
     * @returns {string} The generated HTML for the recipe cards.
     */
    recipesHTML(searchValue, listOfAdvancedFilterSelected) {
        let cards = "";
        let listOfRecipes = DataPreparation.handleListOfRecipes(searchValue, listOfAdvancedFilterSelected);

        if (listOfRecipes.length === 0) {
            cards = `
            <div class="no-result">
                <p>
                    Aucune recette ne correspond à votre critère « ${searchValue} » vous pouvez chercher « tarte aux pommes », « poisson », etc.
                </p>
            </div>
            `;
        }

        listOfRecipes.forEach(recipe => {
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
    },
};

export default AllTemplate;