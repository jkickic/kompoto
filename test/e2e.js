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
            'http://otomoto.pl/oferta/volvo-s60-d4-idealny-jak-nowy-ID6yqRa7.html#b8c1696882',
            'http://otomoto.pl/oferta/bmw-x1-2-0-x-line177-km-skorasport-naviproffesi-kamera-panorama-harman-kardon-ID6ydEyb.html#7589915693'];

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