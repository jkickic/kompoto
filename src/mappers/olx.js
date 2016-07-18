"use strict";

/**
 * maps property names from olx to otomoto
 */
module.exports = function (item) {
    let propertyMap = {
        "Moc silnika": "Moc",
        "Poj. silnika": "Pojemność skokowa",
        "Typ nadwozia": "Typ"
    };
    let params = item.params;
    Object.keys(params).forEach(key => {
        if (propertyMap[key]) {
            params.renameProperty(key, propertyMap[key]);
        }
    });
    return item;
}