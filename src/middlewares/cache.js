const getExpeditiousCache= require('express-expeditious');

const defaultOptions = {
    namespace: 'expresscache',
    defaultTtl: '5 minutes',
    statusCodeExpires:{
        404: '5  minutes',
        505: 0
    }
}

const cacheInit = getExpeditiousCache(defaultOptions);

module.exports = { cacheInit };