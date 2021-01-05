const express = require('express');
const app = express();
const logic = require('./logic');
const { v4: uuidv4 } = require('uuid');
const cls = require('cls-hooked');
const logger = require('./logger');
const clsNamespace = cls.createNamespace('app');

app.use((req, res, next) => {
    const traceId = req.headers['x-request-id'] || uuidv4();
    clsNamespace.bind(req);
    clsNamespace.bind(res);
    clsNamespace.run(() => {
        logger.init(traceId)
        next();
    })
});

app.use((req, res, next) => {
    logger.get().info('Middleware');
    next();
});

app.get('/', (req, res) => {
    logger.get().info('start request');
    logic.foo();
    logger.get().info('end request');
    res.end('ok');
});

app.listen(8800, () => {
    logger.get().info('Application Start...')
});
