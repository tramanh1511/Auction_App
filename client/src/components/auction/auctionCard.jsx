import React from 'react';
import { Card, Button, CardActions, CardContent, Typography, Box, colors, } from '@mui/material';
import CountdownTimer from './countDownTime';
import { Link } from 'react-router-dom';
import { format } from "date-fns";
import { green } from '@mui/material/colors';

function AuctionCard({ auction }) {
    const { auctionId, imageUrl, title, status, initPrice, startTime, endTime, approved, request } = auction;
    return (
        <Link to={`/${auctionId}`} style={{ color: '#66bb6a' }}>
            <Card
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%',
                    width: '100%'
                }}
            >
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
                        Start Auction at: {format(new Date(startTime), 'dd/MM/yyyy hh:mm')}
                    </Typography>
                    <Typography variant="body1" sx={{ marginTop: '0.5rem' }}>
                        End Auction at: {format(new Date(endTime), 'dd/MM/yyyy hh:mm')}
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