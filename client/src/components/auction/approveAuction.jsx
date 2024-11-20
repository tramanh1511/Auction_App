import React, { useEffect, useState } from 'react';
import { Button, Card, Typography, Grid, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import axios from 'axios';

function ApproveAuctions() {
    const [auctions, setAuctions] = useState([]);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [deletionReason, setDeletionReason] = useState('');
    const [auction, setAuction] = useState(null);

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

    const handleApprove = async (auction) => {
        // console.log(auctionId);
        try {
            var auctionId = auction.auctionId;
            if (auction.request === "Create") {
                const response = await axios.patch(`http://localhost:3000/api/v1/auctions/${auctionId}`, {
                    approved : true,
                    request: "None"
                });
                if (response.status === 200) {
                    fetchUnapprovedAuctions();
                }
            }
            else if (auction.request === "Delete") {
                const response = await axios.delete(`http://localhost:3000/api/v1/auctions/${auctionId}`);
                if (response.status === 200) {
                    fetchUnapprovedAuctions();
                }

            }
        } catch (error) {
            console.error('Approval error:', error);
        }
    };
    // const handleDelete = async (auctionId) => {
    //     console.log(auctionId);
    //     try {
    //         const response = await axios.delete(`http://localhost:3000/api/v1/auctions/${auctionId}`);
    //         if (response.status === 200) {
    //             fetchUnapprovedAuctions();
    //         }
    //     } catch (error) {
    //         console.error('Delete error:', error);
    //     }
    // };

    const handleDelete = (auction) => {
        setAuction(auction);
        setDeleteDialogOpen(true);
    };

    const handleConfirmDelete = async () => {
        try {
            var auctionId = auction.auctionId;
            if (auction.request === "Create") {
                const response = await axios.delete(`http://localhost:3000/api/v1/auctions/${auctionId}`, {
                    data: { reason: deletionReason }
                });
                if (response.status === 200) {
                    setDeleteDialogOpen(false);
                    setDeletionReason('');
                    fetchUnapprovedAuctions();
                }
            } else if (auction.request === "Delete") {
                const response = await axios.patch(`http://localhost:3000/api/v1/auctions/${auctionId}`, {
                    request: "None",
                    approved: true
                });
                if (response.status === 200) {
                    setDeleteDialogOpen(false);
                    setDeletionReason('');
                    fetchUnapprovedAuctions();
                }
            }
        } catch (error) {
            console.error('Delete error:', error);
        }
    };

    const handleClose = () => {
        setDeleteDialogOpen(false);
        setDeletionReason('');
    };

    return (
        <Grid container spacing={2}>
            {auctions.map((auction) => (
                <Grid item key={auction._id} xs={12} sm={6} md={4} lg={3}>
                    <Card sx={{ padding: 2, marginBottom: 2, marginTop: '1rem', backgroundColor: auction.request === "Delete" ? '#0993b5' : '#0f1a2a' }}>
                        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>{auction.title}</Typography>
                        <img style={{ width: '100%', height: 'auto' }} src={auction.imageUrl} />
                        <Typography sx={{ marginTop: '0.5rem' }}>{auction.description}</Typography>
                        <Typography sx={{ marginTop: '0.5rem' }}>Start Time: {auction.startTime}</Typography>
                        <Typography sx={{ marginTop: '0.5rem' }}>End Time: {auction.endTime}</Typography>
                        <Button sx={{ marginTop: '0.5rem' }} variant="contained" onClick={() => handleApprove(auction)}>Approve</Button>
                        <Button sx={{ marginTop: '0.5rem', marginLeft: '0.5rem', backgroundColor: 'red' }} variant="contained" onClick={() => handleDelete(auction)}>Disapprove</Button>
                    </Card>
                </Grid>
            ))
            }
            <Dialog open={deleteDialogOpen} onClose={handleClose}>
                <DialogTitle>Confirm Disapproval</DialogTitle>
                <DialogContent>
                    <DialogContentText>Please enter the reason for disapproving this auction request:</DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="reason"
                        label="Disapproval Reason"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={deletionReason}
                        onChange={e => setDeletionReason(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleConfirmDelete} color="primary">Confirm Disapprove</Button>
                </DialogActions>
            </Dialog>
        </Grid>
    );
}

export default ApproveAuctions;
