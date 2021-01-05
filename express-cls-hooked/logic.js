const logger = require('./logger');

module.exports = {
    foo() {
        logger.get().info('foo')
    }
}
