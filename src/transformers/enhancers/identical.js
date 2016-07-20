"use strict";

var enhanced = function (item) {
    let values = item.data.map(it=>it.value);
    var size = new Set(values).size;
    return Object.assign(item, {identical: size == 1});
}
module.exports = function (data) {
    const propertyKeys = Object.keys(data.properties);
    propertyKeys.forEach(key=> {
        data.properties[key] = enhanced(data.properties[key]);
    });
    const featureKeys = Object.keys(data.features);
    featureKeys.forEach(key=> {
        data.features[key] = enhanced(data.features[key]);
    });
    return data;
}