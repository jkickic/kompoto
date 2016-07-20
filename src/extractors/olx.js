"use strict";
const cheerio = require('cheerio');

module.exports = function (mapper) {
    return function (body) {
        if (body.statusCode == 200) {
            let result = {};
            let $ = cheerio.load(body.body, {ignoreWhitespace: true});
            result.title = $('title').text().trim();
            result.params = {};
            result.features = [];
            result.img = $('.bigImage')[0].attribs.src;
            result.link = body.link;

            let valuesExtractor = ($)=> {
                return $('strong').text().trim();
            };

            let labelsExtractor = ($)=> {
                return $('th').text();
            };

            let params = $('tr', '.item');

            for (var i = 0; i < params.length; i++) {
                let $ = cheerio.load(params[i], {ignoreWhitespace: true});
                result.params[labelsExtractor($)] = valuesExtractor($);
            }

            return mapper(result);
        }
        return Promise.resolve({});
    }
}