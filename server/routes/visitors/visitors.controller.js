const {
    searchAuction,
} = require('../../models/auctions.model');


async function httpGetAllAuctions(req, res) {
    console.log('Giá trị thanh tìm kiếm:');
    const title = req.query.title;
    console.log(title);
    const auctions = await searchAuction(title);
    return res.status(200).json(auctions);
}


module.exports = {
    httpGetAllAuctions,
}