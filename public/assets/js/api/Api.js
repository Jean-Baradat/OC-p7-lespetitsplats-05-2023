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