var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'KOMPOTO - najlepsza porównywarka ogłoszeń z otomoto'});
});


var request = require('good-guy-http')();
var fetcher = require('../src/http/fetchAds');
var extractor = require('../src/extractors/otomoto')
var transformer = require('../src/transformers/transformer');


router.get('/compare', function (req, res, next) {
    fetcher({request})(req.query.links.split(','))
        .then(extractor)
        .then(transformer)
        .then((result)=> {
            "use strict";
            res.render('comparator', result);
        })
        .catch(err => res.sendStatus(500))
});

module.exports = router;
