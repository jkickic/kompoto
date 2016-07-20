"use strict";

module.exports = function(){
    let registerHelpers = function(hbs) {
        "use strict";
        hbs.registerHelper('getFeatureClass', function(data) {
            return !!data ? "hasFeature" : "noFeature";
        });

        hbs.registerHelper('hasFeatureOrNot', function(data) {
            return !!data ? "✔" : "✘";
        });

        hbs.registerHelper('rowDifferences', function(identical) {
            return identical ? "" : "rowDifferences";
        });
    }

    return {
        registerHelpers: registerHelpers
    }
}