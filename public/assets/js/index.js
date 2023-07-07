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
    let advancedSearchTags = document.querySelector(".advanced-search-tags");

    // VARIABLES ---------------------------------------------------------------
    let searchValue = "";
    let ASFValues = {
        "ingredient": "",
        "machine": "",
        "tool": ""
    };
    let listOfAdvancedFilterSelected = {
        "listOfIngredients": [],
        "listOfMachines": [],
        "listOfTools": []
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
    const updateASresultsInDOM = (listOfAF, isInit, ASinputValue = null, type = null) => {
        // If the function is used to initialize the advanced search tags,
        // then we retrieve the values of the advanced search fields
        // and store them in ASFValues.
        if (ASinputValue !== null && type !== null) {
            ASFValues[type] = ASinputValue;
        }

        // Initialize each advanced filter in the DOM using the listOfAdvancedFilter array.
        listOfAF.forEach(advancedFilter => {
            advancedFilter.DOM.innerHTML = AllTemplate.advancedFilterHTML(isInit, ASFValues)[advancedFilter.type];
        });

        // If the function is used to initialize the DOM,
        // or when one of the advanced search fields is modified,
        // or when a search is performed with the main search field,
        // then we initialize the events on the advanced filter results.
        // To do this, we retrieve all the advanced search tags from the advanced search area,
        // for each tag we retrieve its name and type (ingredient, machine or tool),
        // then we add the clicked tag to the selected tags area,
        // and we add the name of the clicked tag to the listOfAdvancedFilterSelected array.
        // The goal is to be able to perform a search with the selected tags.
        // Thus, we inject in the DOM the recipes corresponding to the selected tags.
        // We replace the focus on the advanced search field.
        // And finally, we reset the results of the advanced filters in the DOM,
        // in order to update the results of the advanced filters.
        let ASFitems = document.querySelectorAll(".result-item");
        ASFitems.forEach((ASFitem) => {
            ASFitem.addEventListener("click", (e) => {

                let name = e.target.closest(".result-item").dataset.name;
                let listType = e.target.closest(".result-item").dataset.listType;

                advancedSearchTags.innerHTML += AllTemplate.advancedSearchTagsHTML(name, listType);

                listOfAdvancedFilterSelected[listType].push(name.toLowerCase());

                cardsArea.innerHTML = AllTemplate.recipesHTML(searchValue, listOfAdvancedFilterSelected);

                e.target.closest(".advanced-search-field").querySelector("input").focus();

                updateASresultsInDOM(listOfAdvancedFilter, false);
            });
        });
    };

    // EVENTS ------------------------------------------------------------------
    ASFsearchArea.forEach((advancedSearchField) => {
        advancedSearchField.addEventListener("click", (e) => ASFevent(e));
    });

    searchInput.addEventListener("input", (e) => {
        searchValue = e.target.value.toLowerCase();
        if (searchValue.length >= 3) {
            cardsArea.innerHTML = AllTemplate.recipesHTML(searchValue, listOfAdvancedFilterSelected);
            updateASresultsInDOM(listOfAdvancedFilter, false);
        } else {
            cardsArea.innerHTML = AllTemplate.recipesHTML("", listOfAdvancedFilterSelected);
            updateASresultsInDOM(listOfAdvancedFilter, false);
        }
    });

    inputIngredients.addEventListener("input", (e) => {
        updateASresultsInDOM(listOfAdvancedFilter, false, e.target.value.toLowerCase(), "ingredient");
    });

    inputMachines.addEventListener("input", (e) => {
        updateASresultsInDOM(listOfAdvancedFilter, false, e.target.value.toLowerCase(), "machine");
    });

    inputTools.addEventListener("input", (e) => {
        updateASresultsInDOM(listOfAdvancedFilter, false, e.target.value.toLowerCase(), "tool");
    });

    // INIT --------------------------------------------------------------------
    cardsArea.innerHTML = AllTemplate.recipesHTML("", listOfAdvancedFilterSelected);
    updateASresultsInDOM(listOfAdvancedFilter, true);

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