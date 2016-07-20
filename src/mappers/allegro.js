"use strict";

/**
 * maps property names from olx to otomoto
 */
module.exports = function (item) {
    let propertyMap = {
        "moc [KM]": "Moc",
        "liczba drzwi": "Liczba drzwi",
        "liczba miejsc": "Liczba miejsc",
        "nadwozie": "Typ",
        "napęd": "Napęd"
    };
    let params = item.params;
    Object.keys(params).forEach(key => {
        if (propertyMap[key]) {
            params.renameProperty(key, propertyMap[key]);
        }
        params.renameProperty(key, key.toUpperCase());
    });
    return item;
};