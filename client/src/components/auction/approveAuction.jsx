import React, { useEffect, useState } from 'react';
import { Button, Card, Typography, Grid } from '@mui/material';
import axios from 'axios';

function ApproveAuctions() {
    const [auctions, setAuctions] = useState([]);

    useEffect(() => {
        fetchUnapprovedAuctions();
    }, []);

    const fetchUnapprovedAuctions = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/v1/auctions/auctionFalse');
            setAuctions(response.data);
        } catch (error) {
            console.error('Fetch error:', error);
        }
    };

    const handleApprove = async (auctionId) => {
        console.log(auctionId);
        try {
            const response = await axios.patch(`http://localhost:3000/api/v1/auctions/${auctionId}`);
            if (response.status === 200) {
                fetchUnapprovedAuctions();
            }
        } catch (error) {
            console.error('Approval error:', error);
        }
    };
    const handleDelete = async (auctionId) => {
        console.log(auctionId);
        try {
            const response = await axios.delete(`http://localhost:3000/api/v1/auctions/${auctionId}`);
            if (response.status === 200) {
                fetchUnapprovedAuctions();
            }
        } catch (error) {
            console.error('Delete error:', error);
        }
    };

    return (
        <Grid container spacing={2}>
            {auctions.map((auction) => (
                <Grid item key={auction._id} xs={12} sm={6} md={4} lg={3}>
                    <Card sx={{ padding: 2, marginBottom: 2, marginTop: '1rem' }}>
                        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>{auction.title}</Typography>
                        <img style={{ width: '100%', height: 'auto' }} src={auction.imageUrl} />
                        <Typography sx={{ marginTop: '0.5rem' }}>{auction.description}</Typography>
                        <Typography sx={{ marginTop: '0.5rem' }}>Start Time: {auction.startTime}</Typography>
                        <Typography sx={{ marginTop: '0.5rem' }}>End Time: {auction.endTime}</Typography>
                        <Button sx={{ marginTop: '0.5rem' }} variant="contained" onClick={() => handleApprove(auction.auctionId)}>Approve</Button>
                        <Button sx={{ marginTop: '0.5rem', marginLeft: '0.5rem', backgroundColor: 'red' }} variant="contained" onClick={() => handleDelete(auction.auctionId)}>Disapprove</Button>
                    </Card>
                </Grid>
            ))
            }
        </Grid>
    );
}

export default ApproveAuctions;
