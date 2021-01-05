const cls = require('cls-hooked');
const logger = require('pino')({
    prettyPrint: true
});

module.exports = {
    init(traceId) {
        const clsNamespace = cls.getNamespace('app');
        const childLogger = logger.child({
            traceId
        })
        clsNamespace.set('logger', childLogger);
    },
    get() {
        const clsNamespace = cls.getNamespace('app');
        const childLogger = clsNamespace.get('logger');
        return childLogger ? childLogger : logger;
    }
}
