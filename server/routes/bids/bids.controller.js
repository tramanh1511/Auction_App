const {
    getBidsByAuctionId,
    getBidsByUserId,
    createNewBid,
    deleteBidById,
    getBidById
} = require('../../models/bids.model');

const {
    getUserById,
} = require('../../models/users.model');

async function httpGetAllBidsOfUser(req, res) {
    const userId = req.params.userId;

    const bids = await getBidsByUserId(userId);

    if (!bids) {
        return res.status(404).json({
            error: 'Bids not found',
        });
    }
    return res.status(200).json(bids);
}

async function httpGetHighestBid(req, res) {
    const auctionId = req.params.id;

    const bids = await getBidsByAuctionId(auctionId);

    if (!bids) {
        return res.status(404).json({
            error: 'Bids not found',
        });
    }

    const highestBid = bids.reduce((highest, currentBid) => {
        return currentBid.price > highest.price ? currentBid : highest;
    }, { price: -Infinity });

    return res.status(200).json(highestBid);
}

async function httpAddNewBid(req, res) {
    const bid = req.body;

    const bids = await getBidsByAuctionId(bid.auctionId);

    if (!bids) {
        return res.status(404).json({
            error: 'Bids not found',
        });
    }

    const highestBid = bids.reduce((highest, currentBid) => {
        return currentBid.price > highest.price ? currentBid : highest;
    }, { price: -Infinity });

    if (bid.price < highestBid.price) {
        return res.status(400).json({
            error: "Your bid must be higher than the current bid"
        })
    }

    try {
        const createdBid = await createNewBid(bid)
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: err.message,
        });
    }

    return res.status(201).json(bid);
}

async function httpDeleteBidById(req, res) {
    const bidId = req.params.id;
    const deletingBid = await getBidById(bidId);
    
    if (deletingBid) {
        await deleteBidById(bidId);
        return res.status(200).json({ message: 'Bid removed successfully'});
    } else {
        return res.status(400).json({ error: "backend ko xoa dc bid"});
    }
}

async function httpGetBidById(req, res) {
    const bidId = req.params.id;
    const bid = await getBidById(bidId);
    if (!bid) {
        return res.status(404).json({
            error: 'Bid not found',
        });
    }
    return res.status(200).json(bid);
 
}

module.exports = {
    httpGetAllBidsOfUser,
    httpAddNewBid,
    httpGetHighestBid,
    httpDeleteBidById,
    httpGetBidById
}