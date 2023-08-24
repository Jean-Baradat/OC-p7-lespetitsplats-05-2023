const Utils = {

    /**
     * Minifies the HTML content of an array of objects based on a list of keys.
     * 
     * @param {Object[]} e - The array of objects to minify.
     * @param {string[]} filterListKey - The list of keys to minify.
     * @returns {Object} The resulting object with minified HTML content.
     */
    minifyHTMLInArray(e, filterListKey) {
        let result = {};

        filterListKey.forEach(key => {
            result[key] = e[key].replace(/\s+/g, ' ').trim();
        });

        return result;
    },

    /**
     * Cuts a string to a maximum length and adds ellipsis if necessary.
     * 
     * @param {string} string - The string to cut.
     * @param {number} lengthMax - The maximum length of the string.
     * @returns {string} The resulting string.
     */
    cutString(string, lengthMax) {
        if (string.length >= lengthMax) {
            string = string.substring(0, lengthMax);
            if (string.length >= 100) {
                string = string.substring(0, Math.min(string.length, string.lastIndexOf(" ")));
            }
            string += "...";
        }
        return string;
    }
};

export default Utils;


