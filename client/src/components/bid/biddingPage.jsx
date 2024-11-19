import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, } from 'react-router-dom';

import Typography from '@mui/material/Typography';
import axios from 'axios';
import { Button, Grid, Box, FormHelperText, TextField, Alert } from "@mui/material";

function Bidding() {
    const { auctionId } = useParams();
    const [auction, setAuction] = useState('');
    const [bidAmount, setBidAmount] = useState('');
    const [error, setError] = useState('');
    const [highestPrice, setHighestPrice] = useState('');

    const userId = localStorage.getItem('uid');
    const handleBidding = async () => {
        try {
            console.log(bidAmount)
            if (bidAmount == '') {
                setError("Please enter your price!")
            }
            else if (bidAmount < auction.initPrice || bidAmount < highestPrice) {
                setError("Bid higher than highest Price");
            }
            else {
                const response = await axios.post('http://localhost:3000/api/v1/bids/', {
                    auctionId,
                    price: bidAmount,
                    userId: userId
                });
                console.log(response);
                window.alert("Bid successfully!")
                window.location.reload();
            }
        } catch (error) {
            console.error('Bidding error:', error);

        }

    }
    useEffect(() => {
        const fetchAuction = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/v1/auctions/${auctionId}`);
                const data = await response.json();
                setAuction(data);pat
                console.log(data);
            } catch (error) {
                console.error('Fetch error:', error);
            }
        };
        const fetchHighestPrice = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/v1/bids/highestPrice/${auctionId}`);
                const data = await response.json();
                console.log(data)
                setHighestPrice(data.price);
            } catch (error) {
                console.error('Fetch highest price error:', error);
            }
        };

        fetchAuction();
        fetchHighestPrice();
    }, [auctionId]);
    return (
        <>
            <Typography variant="h4" sx={{ fontWeight: 'bold', marginTop: '10px', textAlign: 'center' }}>
                Bidding
            </Typography>
            <Grid container spacing={2}>
                {/* Cột 1 */}
                <Grid item xs={12} sm={6}>
                    <div>
                        <Typography variant="h5">{auction && auction.title}</Typography>
                        <img src={auction && auction.imageUrl} style={{ width: '100%' }} alt="Auction Image" />

                        <Typography variant="body1">{auction && auction.description}</Typography>
                    </div>
                </Grid>
                {/* Cột 2 */}

                <Grid item xs={12} sm={6}>
                    <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="h5" sx={{ fontWeight: 'bold', marginTop: '28%', marginBottom: '10px' }}>
                            Start Price: {auction && auction.initPrice} $
                        </Typography>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '10px' }}>
                            Highest Price: {highestPrice ? highestPrice : (auction && auction.initPrice)} $
                        </Typography>
                        <TextField
                            id="outlined-basic"
                            type='number'
                            label="Enter your price..."
                            variant="outlined"
                            value={bidAmount}
                            onChange={(e) => setBidAmount(e.target.value)} />
                        <FormHelperText sx={{ color: 'red', textAlign: 'center', marginBottom: '10px' }}>

                        </FormHelperText>
                        {error && <Alert severity="error" style={{ maxWidth: '380px', margin: 'auto', marginBottom: '10px' }}>{error}</Alert>}

                        <Button onClick={handleBidding} variant='contained'>Place Bid</Button>
                    </Box>
                </Grid>
            </Grid>
        </>
    );
}
export default Bidding;