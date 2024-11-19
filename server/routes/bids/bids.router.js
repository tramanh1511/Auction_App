const express = require('express');
const {
  httpAddNewBid,
  httpGetAllBidsOfUser,
  httpGetHighestBid,
} = require('./bids.controller');

const { validateUser } = require('../../middlewares/authentication');
const { extractAuthorization } = require('../../middlewares/authorization');

const bidsRouter = express.Router();

// bidsRouter.use(validateUser);
// bidsRouter.use(extractAuthorization);


bidsRouter.get('/:userId', httpGetAllBidsOfUser);
bidsRouter.get('/highestPrice/:id', httpGetHighestBid);

bidsRouter.post('/', httpAddNewBid);

module.exports = bidsRouter;