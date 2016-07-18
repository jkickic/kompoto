"use strict";
const assert = require('assert'),
    fs = require('fs'),
    otomotoExtractor = require('../../src/extractors/otomoto'),
    util = require('../../src/util/util');


describe("otomoto extractor tests", function () {

    it('should extract data', function () {
        return util.fileReaderPromise(__dirname, 'resources/otomotoAd.htm')
            .then(result => {return {body:result, statusCode:200}})
            .then(otomotoExtractor)
            .then(ad => {
                assert.equal(ad.title, "Używane Volvo S60 - 45 440 PLN, 110 000 km, 2011 - otomoto.pl");
                assert.equal(ad.img, "http://img37.otomoto.pl/images_otomotopl/829200883_1_1080x720_f-vat-tempomat-turbo-ac-warszawa.jpg");
                assert.equal(Object.keys(ad.params).length, 22);
                assert.equal(ad.params["Moc"], "202 KM");
                assert.equal(ad.features.length, 26);
            });
    });

    it('should skip 404 result', function () {
        return util.fileReaderPromise(__dirname, 'resources/otomotoAd.htm')
            .then(() => {return [{statusCode:404}]})
            .then(otomotoExtractor)
            .then(data => {
                assert.deepEqual(data, {});
            });
    });
});