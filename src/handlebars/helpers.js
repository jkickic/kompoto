"use strict";

var registerHelpers = function (hbs) {
    "use strict";
    hbs.registerHelper('getFeatureClass', function (data) {
        return !!data ? "hasFeature" : "noFeature";
    });

    hbs.registerHelper('hasFeatureOrNot', function (data) {
        return !!data ? "✔" : "✘";
    });

    hbs.registerHelper('rowDifferences', function (identical) {
        return identical ? "rowIdentical" : "rowDifferences";
    });

    hbs.registerPartial('sidebar', `<div id="sidebar" class="affix">
                                            ITEM
                                        </div>`);
};

module.exports = registerHelpers;