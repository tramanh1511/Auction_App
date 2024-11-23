
import React, { useEffect, useState } from 'react';
import { Grid, Typography, List, ListItem, ListItemText, Paper, Button } from '@mui/material';
import axios from 'axios';

function BidHistory({ auctionId, onHighestPriceUpdate, auctionInitPrice }) {
    const userId = localStorage.getItem('uid');
    const [yourBids, setYourBids] = useState([]);
    const [highestPrice, setHighestPrice] = useState(auctionInitPrice || 0);

    // Fetch bids and set your bid history
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/v1/bids/${userId}`);
                if (!response.ok) {
                    throw new Error(`Bids userId HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                const filteredData = data.filter(bid => bid.auctionId === auctionId);
                setYourBids(Array.isArray(filteredData) ? filteredData : [filteredData]);
            } catch (error) {
                console.error('Fetch error:', error);
            }
        };

        if (auctionId) {
            fetchData();
        }
    }, [userId, auctionId]);

    // Update highest price when bids change
    useEffect(() => {
        if (yourBids.length > 0) {
            const newHighestPrice = Math.max(...yourBids.map(bid => bid.price));
            setHighestPrice(newHighestPrice);

            // Notify parent component (Bidding) about the change
            if (onHighestPriceUpdate) {
                onHighestPriceUpdate(newHighestPrice);
            }
        } else {
            // No bids left, reset highestPrice to the auction's initial price
            setHighestPrice(auctionInitPrice || 0);

            if (onHighestPriceUpdate) {
                onHighestPriceUpdate(auctionInitPrice || 0);
            }
        }
    }, [yourBids, auctionInitPrice, onHighestPriceUpdate]);

    // Handle removing a bid
    const handleRemoveBid = async (bidId, bidPrice) => {
        const confirmDelete = window.confirm("Are you sure to remove this bid?");
        if (confirmDelete) {
            try {
                const response = await axios.delete(`http://localhost:3000/api/v1/bids/${bidId}`);
                if (response.status === 200) {
                    window.alert("Bid removed successfully");

                    // Update bid list
                    const updatedBids = yourBids.filter(bid => bid.bidId !== bidId);
                    setYourBids(updatedBids);

                    // Check if the removed bid was the highest
                    if (bidPrice === highestPrice) {
                        const newHighest = updatedBids.length > 0
                            ? Math.max(...updatedBids.map(bid => bid.price))
                            : auctionInitPrice;
                        setHighestPrice(newHighest);

                        // Notify parent component about the change
                        if (onHighestPriceUpdate) {
                            onHighestPriceUpdate(newHighest);
                        }
                    }
                }
            } catch (error) {
                console.error('Error removing bid:', error);
                window.alert("Failed to remove bid. Please try again.");
            }
        }
    };

    return (
        <div>
            <Typography
                variant="h6"
                sx={{
                    fontWeight: 'bold',
                    marginBottom: 2,
                    marginTop: 2,
                    textAlign: 'center',
                    color: 'text.primary'
                }}
            >
                Your Bid History for Auction {auctionId}
            </Typography>

            <Grid container justifyContent="center">
                <Grid item xs={12} md={8}>
                    <Paper elevation={3} sx={{ padding: 3 }}>
                        <List>
                            {yourBids?.map((bid, index) => (
                                <ListItem key={bid.bidId} sx={{ paddingBottom: 2 }}>
                                    <ListItemText
                                        primary={`Bid ${index + 1}`}
                                        secondary={
                                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                                <strong>Bid ID:</strong> {bid.bidId}
                                                <br />
                                                <strong>Price:</strong> {bid.price} $
                                            </Typography>
                                        }
                                    />
                                    <Button
                                        variant="outlined"
                                        color="error"
                                        onClick={() => handleRemoveBid(bid.bidId, bid.price)}
                                        sx={{ marginLeft: '10px' }}
                                    >
                                        Remove Bid
                                    </Button>
                                </ListItem>
                            ))}
                        </List>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
}

export default BidHistory;



