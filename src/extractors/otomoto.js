"use strict";
const cheerio = require('cheerio');


module.exports = function (body) {
    if (body.statusCode == 200) {
        let result = {};
        let $ = cheerio.load(body.body, {ignoreWhitespace: true});
        result.title = $('title').text().trim();
        result.params = {};
        result.img = $('.bigImage')[0].attribs.src;
        result.link = body.link;

        let valuesExtractor = (value)=> {
            var $local = cheerio.load(values[i], {ignoreWhitespace: true});
            var regularValue = $local('div').text().trim();
            if (regularValue) {
                return regularValue;
            }
            var anchorValue = $local('a').text().trim();
            return anchorValue;
        };

        let labelsExtractor = (label)=> {
            return label.children[0].data;
        };

        let labels = $('.offer-params__label');
        let values = $('.offer-params__value');
        for (var i = 0; i < labels.length; i++) {
            if (labels[i] && labels[i].children[0] && values[i]) {
                result.params[labelsExtractor(labels[i])] = valuesExtractor(values[i]);
            }
        }

        result.features = [];
        let features = $('.offer-features__item');
        for (var i = 0; i < features.length; i++) {
            if (features[i] && features[i].children[2]) {
                result.features.push(features[i].children[2].data.trim());
            }
        }
        return result;
    }
    return Promise.resolve({});
}