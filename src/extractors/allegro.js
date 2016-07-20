"use strict";
const cheerio = require('cheerio');


module.exports = function (mapper) {
    return function (body) {
        if (body.statusCode == 200) {
            let result = {};
            let $ = cheerio.load(body.body, {ignoreWhitespace: true});
            result.title = $('h1.title').text().trim();
            result.params = {};
            result.img = $('#gallery')
                .find('img.img-responsive')[0].attribs['src'];
            result.link = body.link;

            let paramExtractor = (e)=> {
                let tuple = $(e).find('span');
                if (tuple.length == 2) {
                    result.params[$(tuple[0]).text().trim().replace(":", "")] = $(tuple[1]).text().trim()
                }
            };

            let abstractExtractor = (container, decorator) => {
                $(container)
                    .contents()
                    .each((i, e)=> {
                        decorator(e)
                    });
            };

            let containers = $('div.attributes-container');
            containers
                .find('ul.offer-single-attributes')
                .each((i, e)=> {
                    abstractExtractor(e, paramExtractor)
                });

            result.features = [];
            let featureExtractor = (e)=> {
                let tuple = $(e).find('span.attribute-value');
                if (tuple.length == 1) {
                    let rawFeatures = $(tuple[0]).text().split(",");
                    for (var i = 0; i < rawFeatures.length; i++) {
                        result.features.push(rawFeatures[i].trim())
                    }
                }
            };
            containers
                .find('ul.offer-multi-attributes')
                .each((i, e)=> {
                    abstractExtractor(e, featureExtractor)
                });
            return mapper(result);
        }
        return Promise.resolve({});
    }
};