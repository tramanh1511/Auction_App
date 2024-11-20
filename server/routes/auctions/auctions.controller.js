const {
    getAuctionById,
    approveAuctionReqById,
    getAuctionByUserId,
    createNewAuction,
    deleteAuctionById,
    getAllAuctionsFalse,
    getAllAuctionsTrue,
    updateAuctionById
} = require('../../models/auctions.model');

const {
    getUserById
} = require('../../models/users.model');

async function httpGetAllAuctionFalse(req, res) {
    const auctions = await getAllAuctionsFalse();
    return res.status(200).json(auctions)
}

async function httpGetAllAuctionTrue(req, res) {
    const auctions = await getAllAuctionsTrue();
    return res.status(200).json(auctions)
}

async function httpGetAuctionById(req, res) {
    const auctionId = req.params.id;

    const auction = await getAuctionById(auctionId);
    if (!auction) {
        return res.status(404).json({
            error: 'Auction not found',
        });
    }

    console.log(auction);

    return res.status(200).json(auction);
}

async function httpGetAuctionByUserId(req, res) {
    const userId = req.params.id
    console.log(userId);
    const auction = await getAuctionByUserId(userId);
    if (!auction) {
        return res.status(404).json({
            error: 'Auction not found',
        });
    }

    console.log(auction);

    return res.status(200).json(auction);
}

async function httpApproveAuctionReqById(req, res) {
    const auctionId = req.params.id;
    const updateData = req.body;

    try {
        const auction = await approveAuctionReqById(auctionId, updateData);

        if (!auction) {
            return res.status(400).json({
                error: "Auction not found"
            });
        }

        return res.status(200).json(auction);
    } catch (error) {
        console.error("Error updating auction:", error);
        return res.status(500).json({
            error: "Internal server error"
        });
    }
}

async function httpUpdateAuctionById(req, res) {
    const auction = req.body; // Lấy dữ liệu từ frontend
    auction.id =req.params.id;

    try {
        const updatedAuction = await updateAuctionById(auction)        
        return res.status(200).json(updatedAuction);
    } catch (err) {
        console("Error on auction controller update");
        return res.status(400).json({
            error: err.message,
        });
    }
}


async function httpAddNewAuction(req, res) {
    const auction = req.body;

    try {
        const createdAuction = await createNewAuction(auction);
        return res.status(201).json(createdAuction);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: err.message });
    }
}

async function httpDeleteAuctionById(req, res) {
    const auctionId = req.params.id;
    const deletingAuction = await getAuctionById(auctionId);

    if (deletingAuction) {
        await deleteAuctionById(auctionId);
        return res.status(200).json({ message: 'Auction deleted successfully' });
    } else {
        return res.status(400).json({ error: "Backend bảo không xóa được!" });
    }
}

module.exports = {
    httpGetAllAuctionFalse,
    httpGetAllAuctionTrue,
    httpGetAuctionById,
    httpGetAuctionByUserId,
    httpAddNewAuction,
    httpApproveAuctionReqById,
    httpDeleteAuctionById,
    httpUpdateAuctionById,
};
