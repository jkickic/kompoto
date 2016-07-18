"use strict";
const assert = require('assert'),
    transformer = require('../../src/transformers/transformer.js'),
    before = require('./resources/before'),
    after = require('./resources/after');

describe('transformer test', function () {

    it('should correctly transform ads to template data', function () {
       return transformer(before)
        .then(result => assert.deepEqual(result, after));
    });

    it('should not fail on empty result', function () {
        return transformer({});
    });

});