"use strict";
const util = require('../util/util')
const olxMapper = require('../mappers/olx'),
    allegroMapper = require('../mappers/allegro');

const otomotoExtractor = require('./otomoto'),
    allegroExtractor = require('./allegro')(allegroMapper),
    olxExtractor = require('./olx')(olxMapper);

module.exports = function (data) {
    let extractors = {
        otomoto: {host: 'otomoto', extractor: otomotoExtractor},
        olx: {host: 'olx', extractor: olxExtractor},
        allegro: {host: 'allegro', extractor: allegroExtractor}
    }
    return data.map(item => {
        var host = util.extractHost(item.link);
        if (extractors[host]) {
            return extractors[host].extractor(item);
        }
        throw new Error("Unsupported ad provider - " + item.host);
    });
}