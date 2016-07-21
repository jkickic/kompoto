"use strict";

const assert = require('assert'),
    enhancer = require('../../../src/transformers/enhancers/identical');

const afterTransform = require('../resources/beforeIdenticalEnhancer'),
    afterEnhance = require('../resources/afterIdenticalEnhancer');

describe('enhancers', function(){

    it('should correctly enhance', function(){
        assert.deepEqual(enhancer(afterTransform), afterEnhance);
    });

    it('should resolve to input when no properties found', function(){
        assert.deepEqual(enhancer({}), {});
    });
});