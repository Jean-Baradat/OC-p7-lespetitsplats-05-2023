/**
 * Fetches the recipe data from recipes.js.
 * 
 * @version 1.0.0
 * @since 1.0.0
 * 
 * @created 2023-05
 * @updated 2023-08-26
 * 
 * @author Jean Baradat
 * @modifiedby Jean Baradat
 * 
 * @returns {Promise} - A promise that resolves to an array of recipe objects.
 * @function getData
 * @async
 */
const getData = async () => {
    const DATA_URL = "./../../../../data/recipes.js";

    try {
        let res = await fetch(DATA_URL);
        let text = await res.text();

        let data = text.slice(text.indexOf('['), text.lastIndexOf(']') + 1);
        let recipes = JSON.parse(data);
        return recipes;
    }
    catch (err) {
        console.log(err);
    }
}

export default getData;