import getData from "./api/Api.js";

window.addEventListener("load", () => {
    // DOM ---------------------------------------------------------------------
    let cardsArea = document.querySelector(".cards-area");
    let ASFsearchArea = document.querySelectorAll(".advanced-search-field .search-area");
    let advancedSearchFields = document.querySelectorAll(".advanced-search-field");
    let ASFingredientsResultContent = document.querySelector(".result-area.ingredients .result-content");
    let ASFmachinesResultContent = document.querySelector(".result-area.machines .result-content");
    let ASFtoolsResultContent = document.querySelector(".result-area.tools .result-content");

    // VARIABLES ---------------------------------------------------------------
    let DATA_URL = "./../../../../data/recipes.js";
    let listOfIngredients = [];
    let listOfMachines = [];
    let listOfTools = [];

    // EVENTS ------------------------------------------------------------------
    ASFsearchArea.forEach((advancedSearchField) => {
        advancedSearchField.addEventListener("click", (e) => ASFevent(e));
    });

    // API ---------------------------------------------------------------------
    getData(DATA_URL)
        .then(recipes => {
            recipes.forEach(recipe => {

                // ---------------------------------------------------------------
                recipe.ingredients.map(ingredient => {
                    let ingredientName = ingredient.ingredient.toLowerCase();

                    if (!listOfIngredients.includes(ingredientName)) {
                        listOfIngredients.push(ingredientName);
                    }
                });

                ASFingredientsResultContent.innerHTML = `
                ${listOfIngredients.map(ingredient => {
                    return `
                    <div class="result-item">
                        <span>${ingredient}</span>
                    </div>
                    `;
                }).join("")}
                `;
                // ---------------------------------------------------------------

                // ---------------------------------------------------------------
                let applianceName = recipe.appliance.toLowerCase();
                if (!listOfMachines.includes(applianceName)) {
                    listOfMachines.push(applianceName);
                }

                ASFmachinesResultContent.innerHTML = `
                ${listOfMachines.map(machine => {
                    return `
                    <div class="result-item">
                        <span>${machine}</span>
                    </div>
                    `;
                }).join("")}
                `;
                // ---------------------------------------------------------------

                // ---------------------------------------------------------------
                recipe.ustensils.map(tool => {
                    let toolName = tool.toLowerCase();

                    if (!listOfTools.includes(toolName)) {
                        listOfTools.push(toolName);
                    }
                });

                ASFtoolsResultContent.innerHTML = `
                ${listOfTools.map(tool => {
                    return `
                    <div class="result-item">
                        <span>${tool}</span>
                    </div>
                    `;
                }).join("")}
                `;
                // ---------------------------------------------------------------


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

                cardsArea.innerHTML += `
                <article class="recipe-card">

                    <!-- Card header -->
                    <header class="heading">
                        <img src="./assets/img/demo-photo.jpg" alt="Photo de la recette" class="recipe-img">
                        <div class="content">
                            <h2 class="title" title="${recipe.name}">${cutString(recipe.name, 25)}</h2>
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
                            ${cutString(recipe.description, 160)}
                        </p>
                    </main>
                    <!-- End card main content -->

                </article>
                `;
            });

            console.log(listOfIngredients);
            console.log(listOfMachines);
            console.log(listOfTools);
        })
        .catch(err => {
            console.log(err);
        });

    // FONCTIONS -----------------------------------------------------------

    /**
     * 
     * @param {*} string 
     * @returns 
     */
    const cutString = (string, lenghtMax) => {
        if (string.length >= lenghtMax) {
            string = string.substr(0, lenghtMax);
            if (string.length >= 100) {
                string = string.substr(0, Math.min(string.length, string.lastIndexOf(" ")));
            }
            string += "...";
        }
        return string;
    }

    /**
     * 
     * @param {*} e 
     */
    const ASFevent = (e) => {
        const clickedASF = e.target.closest(".advanced-search-field");

        // switch active on clicked advancedSearchField
        ASFswitchToggle(clickedASF, true);

        // get focus on clicked advancedSearchField input
        clickedASF.querySelector("input").focus();

        // remove active class on other advancedSearchFields
        advancedSearchFields.forEach((advancedSearchField) => {
            if (advancedSearchField !== clickedASF) {
                // switch to default on other advancedSearchFields
                ASFswitchToggle(advancedSearchField, false);
            }
        });
    };


    /**
     * 
     * @param {*} ASF 
     * @param {*} isASFClicked 
     */
    const ASFswitchToggle = (ASF, isASFClicked) => {
        if (isASFClicked) {
            ASF.classList.toggle("active");
            // ---------------------------------------------------------------
            ASF.querySelector("i").classList.toggle("fa-chevron-down");
            ASF.querySelector("i").classList.toggle("fa-chevron-up");
            // ---------------------------------------------------------------
            ASF.querySelector("p").classList.toggle("hidden");
            ASF.querySelector("input").classList.toggle("hidden");
            // ---------------------------------------------------------------
            ASF.querySelector(".advanced-filter-switch").classList.toggle("width-100");
            // ---------------------------------------------------------------
            ASF.querySelector(".result-area").classList.toggle("active");
            ASF.querySelector(".result-area .result-content").classList.toggle("hidden");
        } else {
            // ---------------------------------------------------------------
            ASF.classList.remove("active");
            // ---------------------------------------------------------------
            ASF.querySelector("i").classList.add("fa-chevron-down");
            ASF.querySelector("i").classList.remove("fa-chevron-up");
            // ---------------------------------------------------------------
            ASF.querySelector("p").classList.remove("hidden");
            ASF.querySelector("input").classList.add("hidden");
            // ---------------------------------------------------------------
            ASF.querySelector(".advanced-filter-switch").classList.remove("width-100");
            // ---------------------------------------------------------------
            ASF.querySelector(".result-area").classList.remove("active");
            ASF.querySelector(".result-area .result-content").classList.add("hidden");
        }
    }


});