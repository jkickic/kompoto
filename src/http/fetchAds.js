"use strict";

module.exports = function ({request}) {
    function requests(links) {
        return links.map(neverFailingRequest);
    }

    function neverFailingRequest(link) {
        return request(link)
            .then(result => Object.assign(result, {link: link}))
            .catch(function (error) {
                console.error(error);
                return {statusCode: 404};
            })
    }

    return function (links) {
        return Promise.all(requests(links));
    }
};

