"use strict";

module.exports = function ({request}) {
    function requests(links) {
        return links.map(neverFailingRequest);
    }

    function promisedRequest(link) {
        return new Promise((resolve, reject) => {
            request(link, function (error, response, body) {
                if (error) {
                    console.error(error);
                    reject(error);
                } else {
                    resolve(response);
                }
            });
        });
    }

    function neverFailingRequest(link) {
        return promisedRequest(link)
            .then(result => {
                return Object.assign(result, {link: link})
            })
            .catch(function (error) {
                console.error(error);
                return {statusCode: 404};
            });
    }

    return function (links) {
        return Promise.all(requests(links));
    }
};

