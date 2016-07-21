"use strict";

const url = require('url'),
    path = require('path'),
    fs = require('fs'),
    request = require('good-guy-http')();

module.exports = {
    extractHost(link) {
        return url.parse(link).host.replace('www.', '').split('.')[0];
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

Object.prototype.renameProperty = function (oldName, newName) {
    // Do nothing if the names are the same
    if (oldName == newName) {
        return this;
    }
    // Check for the old property name to avoid a ReferenceError in strict mode.
    if (this.hasOwnProperty(oldName)) {
        this[newName] = this[oldName];
        delete this[oldName];
    }
    return this;
};