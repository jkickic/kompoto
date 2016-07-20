"use strict";
const olxMapper = require('../mappers/olx');
const allegroMapper = require('../mappers/allegro');

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
        if(extractors[item.host]){
            return extractors[item.host].extractor(item);
        }
        throw new Error("Unsupported ad provider - " + item.host);
    });
}