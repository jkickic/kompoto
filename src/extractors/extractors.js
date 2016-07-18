"use strict";

const otomotoExtractor = require('./otomoto'),
    allegroExtractor = require('./allegro');

module.exports = {
    otomoto: {host: 'otomoto', extractor: otomotoExtractor},
    olx: {host: 'olx'},
    allegro: {host: 'allegro', extractor: allegroExtractor}
}