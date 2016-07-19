"use strict";

const assert = require('assert');

const olxMapper = require('../../src/mappers/olx');

describe('mappers test', function () {

    it("should properly replace object keys", function () {
        let before = {
            "Moc silnika": "777",
            "Poj. silnika": "1999",
            "Typ nadwozia": "SUV",
            "Losowa wartość": "666"
        }

        let after = {
            "Moc": "777",
            "Pojemność skokowa": "1999",
            "Typ": "SUV",
            "Losowa wartość": "666"
        }

        assert.deepEqual(olxMapper({params: before}).params, after);
    })

})