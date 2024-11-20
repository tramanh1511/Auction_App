const express = require('express');
const {
    httpGetAllAuctionFalse,
    httpGetAllAuctionTrue,
    httpGetAuctionById,
    httpGetAuctionByUserId,
    httpAddNewAuction,
    httpApproveAuctionReqById,
    httpDeleteAuctionById,
    httpUpdateAuctionById
} = require('./auctions.controller');

const auctionsRouter = express.Router();

auctionsRouter.get('/', httpGetAllAuctionTrue);
auctionsRouter.get('/auctionFalse', httpGetAllAuctionFalse);
auctionsRouter.get('/:id', httpGetAuctionById);
auctionsRouter.get('/yourAuction/:id', httpGetAuctionByUserId);
auctionsRouter.post('/', httpAddNewAuction);
auctionsRouter.patch('/:id', httpApproveAuctionReqById);
auctionsRouter.delete('/:id', httpDeleteAuctionById);
auctionsRouter.patch('/update/:id', httpUpdateAuctionById);

module.exports = auctionsRouter;