"use strict";

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'KOMPOTO - nienajgorsza porównywarka ogłoszeń z otomoto'});
});


var request = require('good-guy-http')();
var fetcher = require('../src/http/fetchAds');
var extractors = require('../src/extractors/extractors')
var identicalEnhancer = require('../src/transformers/enhancers/identical');
var transformer = require('../src/transformers/transformer');


router.get('/compare', function (req, res, next) {
    fetcher({request})(req.query.links)
        .then(extractors)
        .then(transformer)
        .then(identicalEnhancer)
        .then((result)=> {
            res.render('comparator', result);
        })
        .catch(err => next(err));
});

module.exports = router;
