"use strict";
const assert = require('assert'),
    fs = require('fs'),
    allegroExtractor = require('../../src/extractors/allegro'),
    util = require('../../src/util/util');


describe("allegro extractor tests", function () {

    it.skip('should extract data', function () {
        return util.fileReaderPromise(__dirname, 'resources/allegroAd.htm')
            .then(result => {return {body:result}})
            .then(allegroExtractor)
            .then(ad => {
                assert.equal(ad.title, "VOLVO S60 2.0 D3 SE LUX 2010R SUMMUM 80TYŚ.KM.");
                assert.equal(Object.keys(ad.params).length, 16);
                assert.equal(ad.params["Moc"], "163 KM");
                assert.equal(ad.features.length, 26);
            });
    });

    it.skip('should skip 404 result', function () {
        return util.fileReaderPromise(__dirname, 'resources/otomotoAd.htm')
            .then(() => {return [{statusCode:404}]})
            .then(allegroExtractor)
            .then(data => {
                assert.equal(data.length, 0);
            });
    });
});