"use strict";
const assert = require('assert'),
    fs = require('fs'),
    allegroExtractor = require('../../src/extractors/allegro'),
    util = require('../../src/util/util');


describe("allegro extractor tests", function () {

    it.skip('should extract data', function () {
        return util.fileReaderPromise(__dirname, 'resources/allegroAd.htm')
            .then(result => {return [{body:result}]})
            .then(allegroExtractor)
            .then(data => {
                var ad = data[0];
                assert.equal(ad.title, "VOLVO S60 2.0 D3 SE LUX 2010R SUMMUM 80TYŚ.KM.");
                assert.equal(Object.keys(ad.params).length, 16);
                assert.equal(ad.params["Moc"], "163 KM");
                assert.equal(ad.features.length, 26);
            });
    });
});