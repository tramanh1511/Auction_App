import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { Button, Grid, Box, Alert, TextField, IconButton } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

function Bidding() {
    const { auctionId } = useParams();
    const [auction, setAuction] = useState('');
    const [error, setError] = useState('');
    const [highestPrice, setHighestPrice] = useState('');
    const [stepPrice, setStepPrice] = useState(0); // Giá trị stepPrice lấy từ database
    const [stepMultiplier, setStepMultiplier] = useState(1); // Số lần tăng
    const [customMultiplier, setCustomMultiplier] = useState(''); // Giá trị bước nhảy tùy chỉnh
    const userId = localStorage.getItem('uid');

    const calculateBidPrice = () => {
        return highestPrice
            ? highestPrice + stepPrice * stepMultiplier
            : auction.initPrice + stepPrice * stepMultiplier;
    };

    const handleBidding = async () => {
        const bidPrice = calculateBidPrice();
        try {
            const response = await axios.post('http://localhost:3000/api/v1/bids/', {
                auctionId,
                price: bidPrice,
                userId: userId,
            });
            console.log(response);
            window.alert(`Bid successfully placed at ${bidPrice} $!`);
            window.location.reload();
        } catch (error) {
            console.error('Bidding error:', error);
            setError("An error occurred while placing your bid.");
        }
    };

    useEffect(() => {
        const fetchAuction = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/v1/auctions/${auctionId}`);
                const data = await response.json();
                setAuction(data);
                setStepPrice(data.stepPrice); // Lấy stepPrice từ API
                console.log(data);
            } catch (error) {
                console.error('Fetch error:', error);
            }
        };
        const fetchHighestPrice = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/v1/bids/highestPrice/${auctionId}`);
                const data = await response.json();
                console.log(data);
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
            <Typography variant="h4" sx={{ fontWeight: 'bold', marginTop: '20px', textAlign: 'center', color: '#333' }}>
                Bidding
            </Typography>
            <Grid container spacing={3}>
                {/* Cột 1 - Auction Details */}
                <Grid item xs={12} sm={6}>
                    <Box sx={{
                        padding: '20px',
                        borderRadius: '8px',
                        boxShadow: 2,
                        backgroundColor: '#fff',
                        height: '100%',
                    }}>
                        <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: '15px' }}>
                            {auction && auction.title}
                        </Typography>
                        <img src={auction && auction.imageUrl} style={{ width: '100%', borderRadius: '8px', marginBottom: '15px' }} alt="Auction Image" />
                        <Typography variant="body1" sx={{
                            color: '#666', 
                            lineHeight: '1.6', 
                            fontSize: '16px'
                        }}>
                            {auction && auction.description}
                        </Typography>
                    </Box>
                </Grid>
                {/* Cột 2 - Bidding Area */}
                <Grid item xs={12} sm={6}>
                    <Box sx={{
                        textAlign: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '15px',
                        padding: '30px',
                        border: '1px solid #ccc',
                        borderRadius: '8px',
                        backgroundColor: '#f9f9f9',
                        boxShadow: 2,
                    }}>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '10px' }}>
                            Start Price: {auction && auction.initPrice} $
                        </Typography>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '10px', color: 'red' }}>
                            Highest Price: {highestPrice ? highestPrice : (auction && auction.initPrice)} $
                        </Typography>
                        <Typography variant="body2" sx={{ fontSize: '14px' }}>
                            Step Price: {stepPrice} $
                        </Typography>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                          

                            <TextField
                                id="step-multiplier"
                                type="number"
                                label="Number of steps"
                                variant="outlined"
                                value={stepMultiplier}
                                onChange={(e) => setStepMultiplier(Math.max(1, Number(e.target.value)))}
                                sx={{ width: '80px' }}
                            />

                
                        </Box>

                        <Typography variant="h6" sx={{ marginTop: '10px', color: 'black' }}>
                            Calculated Bid: {calculateBidPrice()} $
                        </Typography>

                        {error && <Alert severity="error" style={{ maxWidth: '380px', margin: 'auto' }}>{error}</Alert>}

                        <Button
                            onClick={handleBidding}
                            variant='contained'
                            color='primary'
                            sx={{
                                padding: '12px 24px',
                                fontWeight: 'bold',
                                fontSize: '16px',
                                backgroundColor: '#4caf50',
                                '&:hover': {
                                    backgroundColor: '#45a049',
                                },
                            }}
                        >
                            Place Bid
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </>
    );
}

export default Bidding;
