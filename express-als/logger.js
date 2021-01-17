const logger = require('pino')({
    prettyPrint: true
});
const {asyncLocalStorage} = require('./async-storage');

module.exports = {
    init(traceId) {
        const store = asyncLocalStorage.getStore();
        const childLogger = logger.child({
            traceId
        })
        store.set('logger', childLogger);
    },
    get() {
        const store = asyncLocalStorage.getStore();
        const childLogger = store?.get('logger');
        return childLogger ? childLogger : logger;
    }
}
