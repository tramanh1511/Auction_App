import React, { useEffect, useState } from 'react';
import { Button, Card, Typography, Grid, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Box } from '@mui/material';
import axios from 'axios';
import { format } from "date-fns";
import AuctionCard from './auctionCard';

const styles = {
    title: {
        fontWeight: 'bold',
        width: '200px',
        fontFamily: 'Roboto, sans-serif',
    },
    content: {
        flex: 1,
        marginLeft: '10px',
        fontFamily: 'Arial, sans-serif',
    },
    initPrice: {
        fontSize: '2rem',
        fontWeight: '700',
        color: '#d32f2f',
        fontFamily: 'Arial, sans-serif',
    },
    highestPrice: {
        fontSize: '2rem',
        fontWeight: '700',
        color: '#388e3c',
        fontFamily: 'Arial, sans-serif',
    },
    card: {
        padding: '2rem',
        width: '90%',
        maxWidth: '800px',
        margin: 'auto',
        borderRadius: '16px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#ffffff',
    },
    deleteButton: {
        color: '#ff1744',
        marginLeft: '10px',
        fontWeight: 'bold',
        backgroundColor: '#4caf50',
        '&:hover': {
            backgroundColor: '#45a049',
        },
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'flex-end',
        marginTop: '20px',
    },
    biddingButton: {
        marginLeft: '10px',
        fontWeight: 'bold',
        backgroundColor: '#4caf50',
        color: 'white',
        '&:hover': {
            backgroundColor: '#45a049',
        },
    },
    registerButton: {
        marginLeft: '10px',
        fontWeight: 'bold',
        backgroundColor: '#1976d2',
        color: 'white',
        '&:hover': {
            backgroundColor: '#115293',
        },
    },
    endedText: {
        color: '#ff1744',
        fontWeight: 'bold',
        marginTop: '20px',
        textAlign: 'center',
    },
    image: {
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        width: '100%',
        maxHeight: '400px',
        objectFit: 'cover',
    },
    row: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '1rem',
    },
    rowContent: {
        marginLeft: '10px',
    },
    header: {
        fontFamily: 'Roboto, sans-serif',
        fontWeight: 'bold',
        fontSize: '1.5rem',
        marginBottom: '1rem',
        textAlign: 'center',
    },
};

function AuctionReqDetail({ selectedAuction, handleApprove, handleDelete, handleConfirmDelete, handleClose, deleteDialogOpen, deletionReason, setDeletionReason }) {
    return (
        <>
        <Card sx={styles.card}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: '1rem', marginTop: '10px', textAlign: 'center' }}>
                Auction Detail
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
                <Box component="img" src={selectedAuction.imageUrl} sx={{ ...styles.image, maxWidth: '100%', height: 'auto', marginBottom: '20px' }} />

                <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '10px' }}>
                        <Button
                            variant="contained"
                            sx={{ ...styles.registerButton, minWidth: '120px' }}
                            onClick={() => handleApprove(selectedAuction)}
                        >
                            Approve
                        </Button>

                        <Button
                            variant="contained"
                            sx={{ ...styles.registerButton, minWidth: '120px' }}
                            onClick={() => handleDelete(selectedAuction)}
                        >
                            Disapprove
                        </Button>

                </Box>
            </Box>


            <Typography variant="body1" sx={{ marginTop: '0.5rem', fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                {selectedAuction.title}
            </Typography>


            {/* Start of Row for each section */}
            <Box sx={styles.row}>
                <Typography variant="body1" sx={styles.title}>Init price:</Typography>
                <Typography variant="body1" sx={{ ...styles.content, ...styles.initPrice }}>${selectedAuction.initPrice}</Typography>
            </Box>

            <Box sx={styles.row}>
                <Typography variant="body1" sx={styles.title}>AuctionID:</Typography>
                <Typography variant="body1" sx={styles.content}>{selectedAuction.auctionId}</Typography>
            </Box>

            <Box sx={styles.row}>
                <Typography variant="body1" sx={styles.title}>Description:</Typography>
                <Typography variant="body1" sx={styles.content}>{selectedAuction.description}</Typography>
            </Box>

            <Box sx={styles.row}>
                <Typography variant="body1" sx={styles.title}>Start at:</Typography>
                <Typography variant="body1" sx={styles.content}>{format(new Date(selectedAuction.startTime), 'dd/MM/yyyy hh:mm')}</Typography>
            </Box>

            <Box sx={styles.row}>
                <Typography variant="body1" sx={styles.title}>End at:</Typography>
                <Typography variant="body1" sx={styles.content}>{format(new Date(selectedAuction.endTime), 'dd/MM/yyyy hh:mm')}</Typography>
            </Box>

            <Box sx={styles.row}>
                <Typography variant="body1" sx={styles.title}>Step Price:</Typography>
                <Typography variant="body1" sx={styles.content}>${selectedAuction.stepPrice}</Typography>
            </Box>

            <Box sx={styles.row}>
                <Typography variant="body1" sx={styles.title}>Auction Method:</Typography>
                <Typography variant="body1" sx={styles.content}>Incremental and continuous bidding</Typography>
            </Box>

            <Box sx={styles.row}>
                <Typography variant="body1" sx={styles.title}>Owner:</Typography>
                <Typography variant="body1" sx={styles.content}>{selectedAuction.userId}</Typography>
            </Box>

            <Box sx={styles.row}>
                <Typography variant="body1" sx={styles.title}>Viewing Time:</Typography>
                <Typography variant="body1" sx={styles.content}>{selectedAuction.viewingTime || 'To be decided'}</Typography>
            </Box>

            <Box sx={styles.row}>
                <Typography variant="body1" sx={styles.title}>Viewing address:</Typography>
                <Typography variant="body1" sx={styles.content}>{selectedAuction.viewingAddress || 'To be decided'}</Typography>
            </Box>

            {/* <Button variant="contained" sx={{ marginBottom: '1rem' }} onClick={() => setSelectedAuction(null)}>
                        Back to list
                    </Button> */}

        </Card>
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
        </>
    )
}


function ApproveAuctions() {
    const [createRequests, setCreateRequests] = useState([]);
    const [deleteRequests, setDeleteRequests] = useState([]);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [deletionReason, setDeletionReason] = useState('');
    const [auction, setAuction] = useState(null);
    const [selectedAuction, setSelectedAuction] = useState(null);


    useEffect(() => {
        fetchUnapprovedAuctions();
    }, []);

    const fetchUnapprovedAuctions = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/v1/auctions/auctionFalse');
            const auctions = response.data;

            const createReqs = auctions.filter((auction) => auction.request === "Create");
            const deleteReqs = auctions.filter((auction) => auction.request === "Delete");

            setCreateRequests(createReqs);
            setDeleteRequests(deleteReqs);
        } catch (error) {
            console.error('Fetch error:', error);
        }
    };

    const handleApprove = async (auction) => {
        // console.log(auctionId);
        const confirmApprove = window.confirm("Are you sure?");
        if (confirmApprove) {
            try {
                var auctionId = auction.auctionId;
                if (auction.request === "Create") {
                    const response = await axios.patch(`http://localhost:3000/api/v1/auctions/${auctionId}`, {
                        approved : true,
                        request: "None"
                    });
                    if (response.status === 200) {
                        window.location.reload()
                        fetchUnapprovedAuctions();
                    }
                }
                else if (auction.request === "Delete") {
                    const response = await axios.delete(`http://localhost:3000/api/v1/auctions/${auctionId}`);
                    if (response.status === 200) {
                        window.location.reload()
                        fetchUnapprovedAuctions();
                    }

                }
            } catch (error) {
                console.error('Approval error:', error);
            }
        }
    };

    const handleDelete = (auction) => {
        const confirmDelete = window.confirm("Are you sure?");
        if (confirmDelete) {
            setAuction(auction);
            setDeleteDialogOpen(true);
        }
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
                    window.location.reload()
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
                    window.location.reload()
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
        <div>
            {selectedAuction ? (
            <AuctionReqDetail
            selectedAuction={selectedAuction}
            handleApprove={handleApprove}
            handleDelete={handleDelete}
            handleConfirmDelete={handleConfirmDelete}
            handleClose={handleClose}
            deleteDialogOpen={deleteDialogOpen}
            deletionReason={deletionReason}
            setDeletionReason={setDeletionReason}
            />
        ) : (
            <>
            <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: '1rem', textAlign: 'center' }}>
            Pending Approval
            </Typography>
            <Grid container spacing={2}>
                {createRequests.length > 0 ? (
                    createRequests.map((auction) => (
                        <Grid item key={auction._id} xs={12} sm={6} md={4} lg={3}>
                            <Card 
                            sx={{ padding: 2, marginBottom: 2 }} 
                            // onClick={() => setSelectedAuction(auction)}
                            onClick={() => {
                                console.log(auction);
                                setSelectedAuction(auction);
                              }}
                            >
                                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>{auction.title}</Typography>
                                <img style={{ width: '100%', height: 'auto' }} src={auction.imageUrl} alt={auction.title} />
                                <Typography sx={{ marginTop: '0.5rem' }}>{auction.description}</Typography>
                                <Typography sx={{ marginTop: '0.5rem' }}>Start Time: {auction.startTime}</Typography>
                                <Typography sx={{ marginTop: '0.5rem' }}>End Time: {auction.endTime}</Typography>
                                <Button
                                    sx={{ marginTop: '0.5rem' }}
                                    size="large"
                                    variant="contained"
                                    onClick={() => setSelectedAuction(auction)}
                                >
                                    Press to enter
                                </Button>
                                {/* <Button sx={{ marginTop: '0.5rem' }} variant="contained" onClick={() => handleApprove(auction)}>Approve</Button>
                                <Button sx={{ marginTop: '0.5rem', marginLeft: '0.5rem', backgroundColor: 'red' }} variant="contained" onClick={() => handleDelete(auction)}>Disapprove</Button> */}
                            </Card>
                            {/* <AuctionCard auction = {auction}/> */}
                        </Grid>
                    ))
                ) : (
                    <Typography sx={{ textAlign: 'center', width: '100%', padding: 3 }}>No pending approval auctions.</Typography>
                )}
                </Grid>

            <Typography variant="h5" sx={{ fontWeight: 'bold', marginTop: '2rem', marginBottom: '1rem', textAlign: 'center' }}>
            Pending Deletion
            </Typography>
            <Grid container spacing={2}>
                {deleteRequests.length > 0 ? (
                    deleteRequests.map((auction) => (
                        <Grid item key={auction._id} xs={12} sm={6} md={4} lg={3}>
                            <Card sx={{ padding: 2, marginBottom: 2 }}>
                                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>{auction.title}</Typography>
                                <img style={{ width: '100%', height: 'auto' }} src={auction.imageUrl} alt={auction.title} />
                                <Typography sx={{ marginTop: '0.5rem' }}>{auction.description}</Typography>
                                <Typography sx={{ marginTop: '0.5rem' }}>Start Time: {auction.startTime}</Typography>
                                <Typography sx={{ marginTop: '0.5rem' }}>End Time: {auction.endTime}</Typography>
                                <Button
                                    sx={{ marginTop: '0.5rem' }}
                                    size="large"
                                    variant="contained"
                                    onClick={() => setSelectedAuction(auction)}
                                >
                                    Press to enter
                                </Button>
                                {/* <Button sx={{ marginTop: '0.5rem' }} variant="contained" onClick={() => handleApprove(auction)}>Approve</Button>
                                <Button sx={{ marginTop: '0.5rem', marginLeft: '0.5rem', backgroundColor: 'red' }} variant="contained" onClick={() => handleDelete(auction)}>Disapprove</Button> */}
                            </Card>
                            {/* <AuctionCard auction = {auction}/> */}
                        </Grid>
                    ))
                ) : (
                    <Typography sx={{ textAlign: 'center', width: '100%', padding: 3 }}>No pending deletion auctions.</Typography>
                )}
            </Grid>
            </>
        )}

        </div>
    );
}

export default ApproveAuctions;
