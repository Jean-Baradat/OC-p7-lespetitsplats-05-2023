const Utils = {

    minifyHTMLInArray(e, ListOfFilter) {
        let result = {};

        Object.keys(ListOfFilter).forEach(key => {
            result[key] = e[key].replace(/\s+/g, ' ').trim();
        });

        return result;
    },

    cutString(string, lenghtMax) {
        if (string.length >= lenghtMax) {
            string = string.substr(0, lenghtMax);
            if (string.length >= 100) {
                string = string.substr(0, Math.min(string.length, string.lastIndexOf(" ")));
            }
            string += "...";
        }
        return string;
    }
};

export default Utils;


