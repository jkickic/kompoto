var heroin = require('heroin-js');

var configurator = heroin(process.env.HEROKU_API_TOKEN, {debug: false});
configurator.addPlugin(require('heroin-js-librato').plugin);

const KOMPOTO_TEST = 'kompoto-test';
const KOMPOTO_PROD = 'kompoto-prod';

var baseConf = {
    name: KOMPOTO_TEST,
    region: 'eu',
    maintenance: false,
    stack: 'cedar-14',
    config_vars: {
        PORT: '3000',
        KEEP_ALIVE: 'false'
    },
    addons: {
        logentries: {plan: 'logentries:le_tryit'},
        librato: {plan: 'librato:development'}
    },
    collaborators: ['mateusz.zajac@schibsted.pl'],
    features: {
        'runtime-dyno-metadata': {enabled: false},
        'log-runtime-metrics': {enabled: true},
        'http-session-affinity': {enabled: false},
        'preboot': {enabled: false},
        'http-shard-header': {enabled: false},
        'http-end-to-end-continue': {enabled: false}
    },
    formation: [{process: 'web', quantity: 1, size: 'Free'}],
    log_drains: []
};

var prodConf = {
    name: KOMPOTO_PROD,
    config_vars: {
        PORT: '3000',
        KEEP_ALIVE: 'true'
    },
};

configurator(process.env.NODE_ENV === 'production' ? Object.assign(baseConf, prodConf) : baseConf);

function configurePipeline() {
    return configurator.pipeline({
        name: 'kompoto',
        apps: {staging: KOMPOTO_TEST, production: KOMPOTO_PROD}
    });
}
configurePipeline();
