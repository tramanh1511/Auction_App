import React from 'react';
import { Card, Button, CardActions, CardContent, Typography, Box, } from '@mui/material';
import CountdownTimer from './countDownTime';
import { Link } from 'react-router-dom';
import { format } from "date-fns";

function AuctionCard({ auction }) {
    const { auctionId, imageUrl, title, status, initPrice, startTime, endTime, approved, request } = auction;
    const cardStyle = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
        backgroundColor: approved ? '#0f1a2a' : request === "Delete" ? '#5c1f0a' : '#0993b5', 

    };
    return (
        <Link to={`/${auctionId}`} style={{ color: '#0f1a2a' }}>
            <Card sx={cardStyle}>
                <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
                        <img src={imageUrl} alt='Auction' style={{ width: '100%', height: 'auto' }} />
                    </Box>
                    <Typography variant="body1" sx={{ marginTop: '0.5rem', fontSize: '1.5rem', fontWeight: 'bold' }}>
                        {title}
                    </Typography>

                    <Typography variant="body1" sx={{ marginTop: '0.5rem' }}>
                        Init Price: ${initPrice}
                    </Typography>
                    <Typography variant="body1" sx={{ marginTop: '0.5rem' }}>
                        Start at: {format(new Date(startTime), 'dd/MM/yyyy hh:mm')}
                    </Typography>
                    <Typography variant="body1" sx={{ marginTop: '0.5rem' }}>
                        End at: {format(new Date(endTime), 'dd/MM/yyyy hh:mm')}
                    </Typography>
                    <CountdownTimer startTime={startTime} endTime={endTime}></CountdownTimer>
                </CardContent>
                <CardActions>
                    <Button
                        size="large"
                        variant="contained"
                    >
                        Press to enter
                    </Button>
                </CardActions>
            </Card>
        </Link>
    );
}

export default AuctionCard;