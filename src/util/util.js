"use strict";

const url = require('url'),
    path = require('path'),
    fs = require('fs');

module.exports = {
    extractHost(link) {
        return url.parse(link).host.split('.')[0];
    },
    fileReaderPromise(dirname, file){
        return new Promise(function (resolve, reject) {
            fs.readFile(path.join(dirname, file), 'UTF-8', function (err, data) {
                if (err) reject('Cannot read file ' + file);
                else resolve(data);
            });
        })
    }
};