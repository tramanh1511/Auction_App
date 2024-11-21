import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import AuctionCard from './auctionCard';
import { Typography } from '@mui/material';

function AuctionList() {
    const userId = localStorage.getItem('uid')
    // const [auctionList, setAuctionList] = useState([]);
    const [approvedAuctions, setApprovedAuctions] = useState([]);
    const [pendingApproval, setPendingApproval] = useState([]);
    const [pendingDeletion, setPendingDeletion] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/v1/auctions/yourAuction/${userId}`);
                const data = await response.json();

                const approved = [];
                const pendingCreate = [];
                const pendingDelete = [];

                data.forEach((auction) => {
                    if (auction.approved) {
                        approved.push(auction);
                    } else if (!auction.approved && auction.request === "Create") {
                        pendingCreate.push(auction);
                    } else if (!auction.approved && auction.request === "Delete") {
                        pendingDelete.push(auction);
                    }
                });

                setApprovedAuctions(approved);
                setPendingApproval(pendingCreate);
                setPendingDeletion(pendingDelete);
            } catch (error) {
                console.error('Fetch error:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            {/* Approved Auctions */}
            <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: '1rem', marginTop: '10px', textAlign: 'center' }}>
                Approved Auctions
            </Typography>
            <Grid container spacing={4}>
                {approvedAuctions.length > 0 ? (
                    approvedAuctions.map((auction) => (
                        <Grid item xs={12} md={3} key={auction.auctionId}>
                            <AuctionCard auction={auction} />
                        </Grid>
                    ))
                ) : (
                    <Typography sx={{ textAlign: 'center', width: '100%', padding: 3 }}>No approved auctions found.</Typography>
                )}
            </Grid>

            {/* Pending Approval */}
            <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: '1rem', marginTop: '30px', textAlign: 'center' }}>
                Pending Approval
            </Typography>
            <Grid container spacing={4}>
                {pendingApproval.length > 0 ? (
                    pendingApproval.map((auction) => (
                        <Grid item xs={12} md={3} key={auction.auctionId}>
                            <AuctionCard auction={auction} />
                        </Grid>
                    ))
                ) : (
                    <Typography sx={{ textAlign: 'center', width: '100%', padding: 3 }}>No pending approval auctions.</Typography>
                )}
            </Grid>

            {/* Pending Deletion */}
            <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: '1rem', marginTop: '30px', textAlign: 'center' }}>
                Pending Deletion
            </Typography>
            <Grid container spacing={4}>
                {pendingDeletion.length > 0 ? (
                    pendingDeletion.map((auction) => (
                        <Grid item xs={12} md={3} key={auction.auctionId}>
                            <AuctionCard auction={auction} />
                        </Grid>
                    ))
                ) : (
                    <Typography sx={{ textAlign: 'center', width: '100%', padding: 3 }}>No pending deletion auctions.</Typography>
                )}
            </Grid>
        </div>
    );
}

export default AuctionList;
