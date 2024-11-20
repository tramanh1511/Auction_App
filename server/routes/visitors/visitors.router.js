const express = require('express');

const {
    httpGetAllAuctions,
} = require('./visitors.controller');

const visitorsRouter = express.Router();

visitorsRouter.get('/', httpGetAllAuctions);


module.exports = visitorsRouter;