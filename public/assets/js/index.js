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

    /**
     * Updates the results of the advanced filters in the DOM.
     * 
     * @param {Array} listOfAF - An array of objects containing the DOM element and the type of advanced filter.
     * @param {boolean} isInit - A boolean indicating whether the function is used to initialize the advanced search tags.
     * @param {string} ASinputValue - The value of the advanced search field input.
     * @param {string} type - The type of advanced filter (ingredient, machine or tool).
     */
    const updateASresultsInDOM = (listOfAF, isInit, ASinputValue = null, type = null) => {
        if (ASinputValue !== null && type !== null) {
            ASFValues[type] = ASinputValue;
        }

        // Initialize each advanced filter in the DOM using the listOfAdvancedFilter (= listOfAF) array.
        listOfAF.forEach(advancedFilter => {
            advancedFilter.DOM.innerHTML = AllTemplate.advancedFilterHTML(isInit, ASFValues, listOfAdvancedFilterSelected)[advancedFilter.type];
        });

        let ASFitems = document.querySelectorAll(".advanced-filter-item");
        ASFitems.forEach((ASFitem) => {
            ASFitem.addEventListener("click", (e) => clickOnASFitem(e));
        });
    };


    // EVENTS ------------------------------------------------------------------
    ASFsearchArea.forEach((advancedSearchField) => {
        advancedSearchField.addEventListener("click", (e) => ASFevent(e));
    });

    searchInput.addEventListener("input", (e) => mainSearchInput(e));

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
     * This function is called when an advanced search tag is clicked.
     * It is used to initialize the DOM, or when one of the advanced search fields is modified,
     * or when a search is performed with the main search field.
     * 
     * First, it checks if the clicked element is an advanced search tag.
     * If it is, then it removes the tag from the selected tags area and the corresponding item from the listOfAdvancedFilterSelected array.
     * It then injects in the DOM the recipes corresponding to the selected tags, and updates the results of the advanced filters.
     * 
     * If the clicked element is not an advanced search tag, then it retrieves the name and type (ingredient, machine or tool) of the clicked tag.
     * It then adds the clicked tag to the selected tags area, and adds the name of the clicked tag to the listOfAdvancedFilterSelected array.
     * It injects in the DOM the recipes corresponding to the selected tags, and updates the results of the advanced filters.
     * 
     * Finally, it replaces the focus on the advanced search field.
     * 
     * @param {*} e - The event object.
     */
    const clickOnASFitem = (e) => {
        let advancedFilterTag = e.target.closest(".advanced-filter-tag");

        if (advancedFilterTag !== null) {
            advancedFilterTag.remove();

            let listType = advancedFilterTag.dataset.listType;
            let index = listOfAdvancedFilterSelected[listType].indexOf(advancedFilterTag.querySelector(".text").innerText.toLowerCase());
            listOfAdvancedFilterSelected[listType].splice(index, 1);
            cardsArea.innerHTML = AllTemplate.recipesHTML(searchValue, listOfAdvancedFilterSelected);

        } else {
            let name = e.target.closest(".advanced-filter-item").dataset.name;
            let listType = e.target.closest(".advanced-filter-item").dataset.listType;

            e.target.closest(".advanced-search-field").querySelector("input").focus();

            if (!listOfAdvancedFilterSelected[listType].includes(name.toLowerCase())) {
                advancedSearchTags.appendChild(e.target.closest(".advanced-filter-item"));
                e.target.closest(".advanced-filter-item").classList.add("advanced-filter-tag");
                e.target.closest(".advanced-filter-item").classList.remove("advanced-filter-item");

                listOfAdvancedFilterSelected[listType].push(name.toLowerCase());

                cardsArea.innerHTML = AllTemplate.recipesHTML(searchValue, listOfAdvancedFilterSelected);
            }
        }

        updateASresultsInDOM(listOfAdvancedFilter, false);
    };


    /**
     * Handles the input event on the main search field.
     * 
     * This function updates the searchValue variable with the value of the main search input field in lowercase.
     * If the length of the searchValue is greater than or equal to 3, it injects in the DOM the recipes 
     * corresponding to the searchValue and the selected advanced search tags, and updates the results of the advanced filters.
     * If the length of the searchValue is less than 3, it injects in the DOM all the recipes and updates the results of the advanced filters.
     * 
     * @param {Event} e - The event object.
     */
    const mainSearchInput = (e) => {
        searchValue = e.target.value.toLowerCase();

        if (searchValue.length >= 3) {
            cardsArea.innerHTML = AllTemplate.recipesHTML(searchValue, listOfAdvancedFilterSelected);
            updateASresultsInDOM(listOfAdvancedFilter, false);
        } else {
            cardsArea.innerHTML = AllTemplate.recipesHTML("", listOfAdvancedFilterSelected);
            updateASresultsInDOM(listOfAdvancedFilter, false);
        }
    };

    /**
     * Handles the click event on the advanced search field.
     * 
     * This function toggles the active state of the clicked advanced search field, and sets focus on its input field.
     * It also removes the active state from all other advanced search fields.
     * 
     * @param {Event} e - The event object.
     */
    const ASFevent = (e) => {
        const clickedASF = e.target.closest(".advanced-search-field");

        ASFswitchToggle(clickedASF, true);
        clickedASF.querySelector("input").focus();

        // remove active class on other advancedSearchFields
        advancedSearchFields.forEach((advancedSearchField) => {
            if (advancedSearchField !== clickedASF) {
                ASFswitchToggle(advancedSearchField, false);
            }
        });
    };

    /**
     * Toggles the advanced search field switch and its associated elements.
     * 
     * @param {HTMLElement} ASF - The advanced search field element.
     * @param {boolean} isASFClicked - A boolean indicating whether the advanced search field has been clicked.
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