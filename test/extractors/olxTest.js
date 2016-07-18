"use strict";
const assert = require('assert'),
    fs = require('fs'),
    olxMapper = require('../../src/mappers/olx'),
    olxExtractor = require('../../src/extractors/olx')(olxMapper),
    util = require('../../src/util/util');


describe("olx extractor tests", function () {

    it('should extract data', function () {
        return util.fileReaderPromise(__dirname, 'resources/olxAd.htm')
            .then(result => {return {body:result, statusCode:200}})
            .then(olxExtractor)
            .then(ad => {
                assert.equal(ad.title, "Volvo S60 2.0 D NAVI * Stan Idealny VAT 23% Proszowice • OLX.pl");
                assert.equal(ad.img, "http://img06.staticclassifieds.com/images_tablicapl/357016037_1_644x461_volvo-s60-20-d-navi-stan-idealny-vat-23-proszowice_rev016.jpg");
                assert.equal(Object.keys(ad.params).length, 13);
                assert.equal(ad.params["Moc"], "136 KM");
                assert.equal(ad.features, 0); //no features available on olx.pl
            });
    });

    it('should skip 404 result', function () {
        return util.fileReaderPromise(__dirname, 'resources/otomotoAd.htm')
            .then(() => {return [{statusCode:404}]})
            .then(olxExtractor)
            .then(data => {
                assert.deepEqual(data, {});
            });
    });
});