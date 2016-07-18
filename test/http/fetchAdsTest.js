"use strict";
const assert = require('assert'),
    coMocha = require('co-mocha'),
    fetchAds = require('../../src/http/fetchAds'),
    extractors = require('../../src/extractors/extractors');

describe('fetch ads', function () {

    it.skip('[integration test] should fetch ads', function *() {
        const request = require('good-guy-http')();
        const fetch = fetchAds({request});

        const results = yield fetch(['http://otomoto.pl/oferta/volvo-s60-f-vat-tempomat-turbo-ac-ID6yk4mh.html',
            'http://allegro.pl/show_item.php?item=6328569330',
            'http://olx.pl/oferta/volvo-s60-CID5-IDgClMt.html',
            'http://nonexistingfakelink']);

        assert.equal(results[0].statusCode, 200);
        assert.equal(results[0].host, extractors.otomoto.host);
        assert.equal(results[1].statusCode, 200);
        assert.equal(results[1].host, extractors.allegro.host);
        assert.equal(results[2].statusCode, 200);
        assert.equal(results[2].host, extractors.olx.host);
        assert.equal(results[3].statusCode, 404);
        assert.equal(results.length, 4);
    });


});