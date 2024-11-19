import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import AuctionCard from './auctionCard';
import { Typography } from '@mui/material';

function AuctionList() {
    const userId = localStorage.getItem('uid')
    const [auctionList, setAuctionList] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/v1/auctions/yourAuction/${userId}`);
                const data = await response.json();
                setAuctionList(data);
            } catch (error) {
                console.error('Fetch error:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: '1rem', marginTop: '10px', textAlign: 'center' }}>
                Your Auction here!
            </Typography>
            <Grid container spacing={4}>
                {auctionList?.map((auction) => (
                    <Grid item xs={12} md={3} key={auction.auctionId}>
                        <AuctionCard auction={auction} />
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}

export default AuctionList;
