'use strict';

module.exports = () =>{

    var app = require('../app');
    var debug = require('debug')('kompoto:server');
    var http = require('http');

    var port = normalizePort(process.env.PORT || '3000');
    app.set('port', port);

    var server = http.createServer(app);
    server.on('error', onError);

    /**
     * Normalize a port into a number, string, or false.
     */
    function normalizePort(val) {
        var port = parseInt(val, 10);

        if (isNaN(port)) {
            // named pipe
            return val;
        }

        if (port >= 0) {
            // port number
            return port;
        }

        return false;
    }

    function onError(error) {
        if (error.syscall !== 'listen') {
            throw error;
        }

        var bind = typeof port === 'string'
            ? 'Pipe ' + port
            : 'Port ' + port;

        switch (error.code) {
            case 'EACCES':
                console.error(bind + ' requires elevated privileges');
                process.exit(1);
                break;
            case 'EADDRINUSE':
                console.error(bind + ' is already in use');
                process.exit(1);
                break;
            default:
                throw error;
        }
    }

    return {
        listen: () => {
            return server.listen(port, () => console.log(`Server running on port ${port}`));
        }
    }
}