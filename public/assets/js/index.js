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
    let inputIngredients = document.getElementById("input-ingredients");
    let inputMachines = document.getElementById("input-machines");
    let inputTools = document.getElementById("input-tools");

    // VARIABLES ---------------------------------------------------------------
    let searchValue = "";
    let ASFValues = {
        "ingredient": "",
        "machine": "",
        "tool": ""
    };
    let listOfAdvancedFilter = [
        {
            "DOM": ASFingredientsResultContent,
            "type": "listOfIngredients"
        },
        {
            "DOM": ASFmachinesResultContent,
            "type": "listOfMachines"
        },
        {
            "DOM": ASFtoolsResultContent,
            "type": "listOfTools"
        }
    ];

    // DOM FUNCTIONS -----------------------------------------------------------
    const ASFinnerHTML = (listOfAF, isInit, searchValue = null, type = null) => {
        if (searchValue !== null && type !== null) {
            ASFValues[type] = searchValue;
        }

        listOfAF.forEach(advancedFilter => {
            advancedFilter.DOM.innerHTML = AllTemplate.advancedFilterHTML(isInit, ASFValues)[advancedFilter.type];
        });
    };

    // EVENTS ------------------------------------------------------------------
    ASFsearchArea.forEach((advancedSearchField) => {
        advancedSearchField.addEventListener("click", (e) => ASFevent(e));
    });

    searchInput.addEventListener("input", (e) => {
        searchValue = e.target.value.toLowerCase();
        if (searchValue.length >= 3) {
            cardsArea.innerHTML = AllTemplate.recipesHTML(searchValue);
            ASFinnerHTML(listOfAdvancedFilter, false);
        } else {
            cardsArea.innerHTML = AllTemplate.recipesHTML();
            ASFinnerHTML(listOfAdvancedFilter, false);
        }
    });

    inputIngredients.addEventListener("input", (e) => {
        ASFinnerHTML(listOfAdvancedFilter, false, e.target.value.toLowerCase(), "ingredient");
    });

    inputMachines.addEventListener("input", (e) => {
        ASFinnerHTML(listOfAdvancedFilter, false, e.target.value.toLowerCase(), "machine");
    });

    inputTools.addEventListener("input", (e) => {
        ASFinnerHTML(listOfAdvancedFilter, false, e.target.value.toLowerCase(), "tool");
    });

    // INIT --------------------------------------------------------------------
    cardsArea.innerHTML = AllTemplate.recipesHTML();
    ASFinnerHTML(listOfAdvancedFilter, true);

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