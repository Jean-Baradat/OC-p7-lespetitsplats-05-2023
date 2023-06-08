import getData from "./api/Api.js";

window.addEventListener("load", () => {
    // DOM ---------------------------------------------------------------------
    let cardsArea = document.querySelector(".cards-area");
    let advancedSearchFields = document.querySelectorAll(".advanced-search-field");

    // VARIABLES ---------------------------------------------------------------
    let DATA_URL = "./../../../../data/recipes.js";

    // EVENTS ------------------------------------------------------------------
    advancedSearchFields.forEach((advancedSearchField) => {
        advancedSearchField.addEventListener("click", (e) => ASFevent(e));
    });

    // API ---------------------------------------------------------------------
    getData(DATA_URL)
        .then(recipes => {
            recipes.forEach(recipe => {

                let ingredientsList = recipe.ingredients.map(ingredient => {
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
                            ${ingredientsList.join("")}
                        </ul>

                        <p class="recipe-summary">
                            ${cutString(recipe.description, 160)}
                        </p>
                    </main>
                    <!-- End card main content -->

                </article>
                `;
            });
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


        // switch (clickedElement.dataset.field) {
        //     case "ingredients":
        //         console.log("ingredients");
        //         clickedElement.classList.toggle("asf-active");

        //         break;
        //     case "machines":
        //         console.log("machines");
        //         clickedElement.classList.toggle("asf-active");

        //         break;
        //     case "tools":
        //         console.log("tools");
        //         clickedElement.classList.toggle("asf-active");

        //         break;
        //     default:
        //         console.log("default");
        //         break;
        // }
    };

    const ASFswitchToggle = (ASF, isASFClicked) => {
        if (isASFClicked) {
            // toggle active class on clicked advancedSearchField
            ASF.classList.toggle("asf-active");
            // switch chevron icon on clicked advancedSearchField
            ASF.querySelector("i").classList.toggle("fa-chevron-down");
            ASF.querySelector("i").classList.toggle("fa-chevron-up");
            // switch hidden class on clicked advancedSearchField content
            ASF.querySelector("p").classList.toggle("hidden");
            ASF.querySelector("input").classList.toggle("hidden");
            // toggle width-100 class on clicked advancedSearchField content
            ASF.querySelector(".advanced-filter-switch").classList.toggle("width-100");
        } else {
            // remove active class on sibling advancedSearchField
            ASF.classList.remove("asf-active");
            // reset to default chevron icon on sibling advancedSearchField
            ASF.querySelector("i").classList.add("fa-chevron-down");
            ASF.querySelector("i").classList.remove("fa-chevron-up");
            // reset to default content on sibling advancedSearchField
            ASF.querySelector("p").classList.remove("hidden");
            ASF.querySelector("input").classList.add("hidden");
            // reset to default width-100 class on sibling advancedSearchField content
            ASF.querySelector(".advanced-filter-switch").classList.remove("width-100");

        }
    }


});