"use strict";

module.exports = function (ads) {
    var propertyKeys = new Set();
    var featureKeys = new Set();
    var titles = [];
    var images = [];
    ads.forEach(ad=> {
        //create property keys
        Object.keys(ad.params)
            .forEach((property)=>propertyKeys.add(property));
        //create feature keys
        ad.features
            .forEach((feature)=>featureKeys.add(feature));
        //extract titles
        titles.push(ad.title);
        images.push(ad.img);
    });

    let props = {};
    props["Tytuł"] = titles;

    propertyKeys = Array.from(propertyKeys).sort();
    propertyKeys.forEach(key => {
        var arr = [];
        ads.forEach(ad=> {
            arr.push(ad.params[key] ? ad.params[key] : "");
        });
        props[key] = arr;
    });

    featureKeys = Array.from(featureKeys).sort();
    featureKeys.forEach(key => {
        var arr = [];
        ads.forEach(ad=> {
            arr.push(ad.features.indexOf(key) > -1 ? "TAK" : "NIE");
        });
        props[key] = arr;
    });


    return Promise.resolve({
        properties: props,
        images: images
    });
}