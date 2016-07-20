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
        "napęd": "Napęd",
        "pojemność silnika [cm3]": "Pojemność skokowa",
        "przebieg [km]": "Przebieg"
    };
    let params = item.params;
    Object.keys(params).forEach(key => {
        if (propertyMap[key]) {
            params.renameProperty(key, propertyMap[key]);
        }
        params.renameProperty(key, key[0].toUpperCase() + key.substring(1, key.length));
    });
    return item;
};