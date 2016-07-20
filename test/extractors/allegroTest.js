"use strict";
const assert = require('assert'),
    fs = require('fs'),
    allegroMapper = require('../../src/mappers/allegro'),
    allegroExtractor = require('../../src/extractors/allegro')(allegroMapper),
    util = require('../../src/util/util');


describe("allegro extractor tests", function () {

    it('should extract data', function () {
        return util.fileReaderPromise(__dirname, 'resources/aventador.htm')
            .then(result => {return {body:result, statusCode:200}})
            .then(allegroExtractor)
            .then(ad => {
                assert.equal(ad.img, "http://d.allegroimg.pl/s400/08/63/26/61/34/6326613485");
                assert.equal(ad.title, "LAMBORGHINI AVENTADOR LP-750 SV AUTO NA MIEJSCU !! (6326613485)");
                assert.equal(Object.keys(ad.params).length, 14);
                assert.equal(ad.params["Moc"], "751");
                assert.equal(ad.features.length, 41);
            });
    });

    it('should skip 404 result', function () {
        return util.fileReaderPromise(__dirname, 'resources/aventador.htm')
            .then(() => {return [{statusCode:404}]})
            .then(allegroExtractor)
            .then(data => {
                assert.deepEqual(data, {});
            });
    });
});