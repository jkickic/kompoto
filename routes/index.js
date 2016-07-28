"use strict";

//const request = require('good-guy-http')({timeout:10000, maxResponseSize: 1024*1024*5});
const request = require('request');
const fetcher = require('../src/http/fetchAds');
const extractors = require('../src/extractors/extractors')
const identicalEnhancer = require('../src/transformers/enhancers/identical');
const transformer = require('../src/transformers/transformer');

const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Kompoto - porównywarka ogłoszeń otomoto,allegro,olx'});
});

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

router.get('/ping', function(req,res,next){
    res.json({health:"up"});
});

module.exports = router;
