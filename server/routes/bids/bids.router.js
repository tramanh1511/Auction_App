const express = require('express');
const {
  httpAddNewBid,
  httpGetAllBidsOfUser,
  httpGetHighestBid,
  httpDeleteBidById
} = require('./bids.controller');

const { validateUser } = require('../../middlewares/authentication');
const { extractAuthorization } = require('../../middlewares/authorization');

const bidsRouter = express.Router();

// bidsRouter.use(validateUser);
// bidsRouter.use(extractAuthorization);


bidsRouter.get('/:userId', httpGetAllBidsOfUser);
bidsRouter.delete('/:userId/:auctionId', httpDeleteBidById);
bidsRouter.get('/highestPrice/:id', httpGetHighestBid);

bidsRouter.post('/', httpAddNewBid);

module.exports = bidsRouter;