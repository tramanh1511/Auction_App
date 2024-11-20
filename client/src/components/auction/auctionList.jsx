import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import AuctionCard from './auctionCard';

function AuctionList({ auctions }) {
    const [auctionList, setAuctionList] = useState([]);

    useEffect(() => {
        if (!auctions) {
            const fetchData = async () => {
                try {
                    const response = await fetch("http://localhost:3000/api/v1/auctions/");
                    const data = await response.json();
                    setAuctionList(data);
                } catch (error) {
                    console.error('Fetch error:', error);
                }
            };

            fetchData();
        } else {
            setAuctionList(auctions);
        }
    }, [auctions]);

    return (
        <Grid container spacing={4}>
            {auctionList?.map((auction) => (
                <Grid item xs={12} md={3} key={auction.auctionId}> {/* Sử dụng id của mỗi phiên đấu giá làm key */}
                    <AuctionCard auction={auction} />
                </Grid>
            ))}
        </Grid>
    );
}

export default AuctionList;
