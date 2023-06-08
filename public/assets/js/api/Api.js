const getData = async (url) => {
    try {
        let res = await fetch(url);
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