"use strict";

const assert = require('assert');
const request = require('supertest'),
    srv = require('../src/server');

describe('compareAds', function () {
    let server;

    beforeEach(()=> {
        server = srv().listen();
    });

    it.skip('real test', function (done) {
        let fakeLinks = ['http://otomoto.pl/oferta/volvo-s60-d3summum-ID6yqJC9.html#b8c1696882',
            'http://olx.pl/oferta/volvo-s60-2-0-d-navi-stan-idealny-vat-23-CID5-IDeqp41.html'];

        let addr = '/compare?links=' + fakeLinks.map(encodeURIComponent).join(',');
        console.log(addr);
        request(server)
            .get(addr)
            .expect('Content-Type', 'text/html; charset=utf-8')
            .expect((res) => {
                assert(true);
            })
            .expect(200, done);
    });
});