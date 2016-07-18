"use strict";
const util = require('../util/util');

module.exports = function ({request}) {
    function requests(links) {
        return links.map(neverFailingRequest);
    }

    function neverFailingRequest(link) {
        return request(link)
            .then(result => Object.assign(result, {host: util.extractHost(link)}))
            .catch(function (error) {
            return {statusCode: 404};
        })
    }

    return function (links) {
        return Promise.all(requests(links));
    }
};

