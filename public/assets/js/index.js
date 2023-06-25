import AllTemplate from "./template/AllTemplate.js";

window.addEventListener("load", () => {
    // DOM ---------------------------------------------------------------------
    let cardsArea = document.querySelector(".cards-area");
    let ASFsearchArea = document.querySelectorAll(".advanced-search-field .search-area");
    let advancedSearchFields = document.querySelectorAll(".advanced-search-field");
    let ASFingredientsResultContent = document.querySelector(".result-area.ingredients .result-content");
    let ASFmachinesResultContent = document.querySelector(".result-area.machines .result-content");
    let ASFtoolsResultContent = document.querySelector(".result-area.tools .result-content");
    let searchInput = document.querySelector(".search-input");

    // VARIABLES ---------------------------------------------------------------
    let searchValue = "";

    // EVENTS ------------------------------------------------------------------
    ASFsearchArea.forEach((advancedSearchField) => {
        advancedSearchField.addEventListener("click", (e) => ASFevent(e));
    });

    searchInput.addEventListener("input", (e) => {
        searchValue = e.target.value.toLowerCase();
        if (searchValue.length >= 3) {
            cardsArea.innerHTML = AllTemplate.recipesHTML(searchValue);
        } else {
            cardsArea.innerHTML = AllTemplate.recipesHTML();
        }
    });

    // INIT --------------------------------------------------------------------
    ASFingredientsResultContent.innerHTML = AllTemplate.advancedFilterHTML()["listOfIngredients"];
    ASFmachinesResultContent.innerHTML = AllTemplate.advancedFilterHTML()["listOfMachines"];
    ASFtoolsResultContent.innerHTML = AllTemplate.advancedFilterHTML()["listOfTools"];
    cardsArea.innerHTML = AllTemplate.recipesHTML();


    // FONCTIONS ---------------------------------------------------------------
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