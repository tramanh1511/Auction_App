import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, } from 'react-router-dom';
import { Box, Typography, Card, Button } from '@mui/material';
import { format } from "date-fns";
import axios from 'axios';

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

function AuctionDetail() {
    const { auctionId } = useParams();
    const [auction, setAuction] = useState(null);
    const [highestPrice, setHighestPrice] = useState('');
    const [userData, setUserData] = useState(null);
    const [isRegistered, setIsRegistered] = useState(false);
    const [registerUser, setRegisterUser] = useState('');

    const navigate = useNavigate();
    const userRole = localStorage.getItem('role');
    const currentUser = localStorage.getItem('uid');

    useEffect(() => {
        const fetchAuction = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/v1/auctions/${auctionId}`);
                const data = await response.json();
                setAuction(data);

                if (data.currentUsers.includes(currentUser)) {
                    setIsRegistered(true);
                }

                const userResponse = await fetch(`http://localhost:3000/api/v1/users/${data.userId}`);
                const userData = await userResponse.json();
                setUserData(userData);

            } catch (error) {
                console.error('use effect Fetch Auction error:', error);
            }
        };

        const fetchHighestPrice = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/v1/bids/highestPrice/${auctionId}`);
                const data = await response.json();
                setHighestPrice(data.price);
            } catch (error) {
                console.error('use effect Fetch highest price error:', error);
            }
        };
        fetchAuction();
        fetchHighestPrice();
        // handleRegister();
    }, [auctionId, currentUser]);

    const handleDelete = async (e) => {
        const confirmDelete = window.confirm("Are you sure?");

        if(confirmDelete) {
            const response = await axios.patch(`http://localhost:3000/api/v1/auctions/${auctionId}`, {
                request: "Delete",
                approved: false
            });
            if(response.status === 200) {
                window.alert("Deletion request submitted for Admin review.");
                window.history.back()
            }
        }
    }

    const handleUnregister = async () => {
        // Show confirmation dialog before proceeding
    const confirmUnregister = window.confirm('Bạn có muốn hủy đăng ký không?');

    if (!confirmUnregister) {
        console.log('User canceled unregister.');
        return; // Exit the function if the user cancels
    }

        // Check if auction data is available
        if (!auction) {
            console.error('Auction data is not available.');
            return; 
        }
        // Check if the user is already registered
        if (!auction.currentUsers.includes(currentUser)) {
            console.log("User is already unregistered");
            setIsRegistered(false);
            return; 
        }
        try {
            const updatedCurrentUsers = auction.currentUsers.filter(user => user !== currentUser);
            const updatedAuctionData = {
                ...auction, 
                currentUsers: updatedCurrentUsers
                }
            const response = await fetch(`http://localhost:3000/api/v1/auctions/update/${auctionId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedAuctionData)
            });

            if (response.ok) {
                alert('Hủy đăng ký thành công!');
                setIsRegistered(false);
                setAuction(updatedAuctionData); 
                console.log("Auction unregistered successfully:", updatedAuctionData);
            } else {
                alert('Hủy đăng ký không thành công. Vui lòng thử lại sau.');
                console.error(`Failed to unregister to auction. Status: ${response.status}`);
            }

            console.log("Auction unregister in handle", auction.currentUsers);
            } catch (error) {
                console.error('Unregistration error in handle:', error);
            }

    };

    const handleRegister = async () => {
        if (!auction) {
            console.error('Auction data is not available.');
            return; 
        }
        if (auction.currentUsers.includes(currentUser)) {
            console.log("User is already registered");
            setIsRegistered(true);
            return; 
        }
        try {
            const updatedCurrentUsers = [...auction.currentUsers, currentUser];
            const updatedAuctionData = {
                ...auction, 
                currentUsers: updatedCurrentUsers,
            };
            const response = await fetch(`http://localhost:3000/api/v1/auctions/update/${auctionId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedAuctionData)
            });
            if (response.ok) {
                alert('Đăng ký thành công!');
                setIsRegistered(true);
                setAuction(updatedAuctionData); // Cập nhật lại auction với dữ liệu mới
                console.log("Auction registered successfully:", updatedAuctionData);
            } else {
                alert('Đăng ký không thành công. Vui lòng thử lại sau.');
                console.error(`Failed to register to auction. Status: ${response.status}`);
            }
            console.log("Auction register in handle", auction.currentUsers);
        } catch (error) {
            console.error('Registration error in handle:', error);
        }
    };

    const handleBidding = () => {
        navigate(`/biddingPage/${auctionId}`);
    };

    if (!auction || !userData) {
        return <div>Loading...</div>;
    }

const handleResult = async () => {//+
    try {//+
        const response = await fetch(`http://localhost:3000/api/v1/bids/highestPrice/${auctionId}`);//+
        const data = await response.json();//+
        //+
        if (data && data.userId) {//+
            const userResponse = await fetch(`http://localhost:3000/api/v1/users/${data.userId}`);//+
            const userData = await userResponse.json();//+
            //+
                alert(`Auction Result:
                Winner: ${userData.name}
                Winning Bid: $${data.price}
                Auction Title: ${auction.title}`);
        } else {//+
            alert("No winner found for this auction.");//+
        }//+
    } catch (error) {//+
        console.error('Error fetching result:', error);//+
        alert("An error occurred while fetching the result.");//+
    }//+
};//+

    
    const endTime = new Date(auction.endTime);
    const now = new Date();
    const checkTimeOutForBidding = now - endTime;

    return (
        <>
            <Card sx={styles.card}>
                <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: '1rem', marginTop: '10px', textAlign: 'center' }}>
                    Auction Detail
                </Typography>

                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
                    <Box component="img" src={auction.imageUrl} sx={{ ...styles.image, maxWidth: '100%', height: 'auto', marginBottom: '20px' }} />

                    <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '10px' }}>
                        {checkTimeOutForBidding < 0 && !isRegistered && userRole !== 'admin' && auction.userId !== currentUser && (
                            <Button
                                variant="contained"
                                sx={{ ...styles.registerButton, minWidth: '120px' }}
                                onClick={handleRegister}
                            >
                                Register
                            </Button>
                        )}

                        {checkTimeOutForBidding < 0 && isRegistered && userRole !== 'admin' && auction.userId !== currentUser && (
                            <Button
                                variant="contained"
                                sx={{ ...styles.registerButton, minWidth: '120px' }}
                                onClick={handleUnregister}
                            >
                                Unregister
                            </Button>
                        )}

                        {checkTimeOutForBidding < 0 && isRegistered && userRole !== 'admin' && auction.userId !== currentUser && (
                            <Button
                                variant="contained"
                                sx={{ ...styles.biddingButton, minWidth: '120px' }}
                                onClick={handleBidding}
                            >
                                Bidding
                            </Button>
                        )}

                        {(userRole === 'admin' || auction.userId === currentUser) && (
                            <Button
                                variant="contained"
                                sx={{ ...styles.deleteButton, minWidth: '120px' }}
                                aria-label="delete"
                                onClick={handleDelete}
                            >
                                Delete
                            </Button>
                        )}
                        {checkTimeOutForBidding >= 0 && (
                            <Button
                            variant="contained"
                            sx={styles.registerButton}
                            onClick={handleResult}
                            >
                            Auction has ended
                            </Button>
                        )}
                    </Box>
                </Box>


                <Typography variant="body1" sx={{ marginTop: '0.5rem', fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                    {auction.title}
                </Typography>


                {/* Start of Row for each section */}
                <Box sx={styles.row}>
                    <Typography variant="body1" sx={styles.title}>Init price:</Typography>
                    <Typography variant="body1" sx={{ ...styles.content, ...styles.initPrice }}>${auction.initPrice}</Typography>
                </Box>

                {/* Display the highest price just after initPrice */}
                {highestPrice && (
                    <Box sx={styles.row}>
                        <Typography variant="body1" sx={styles.title}>Highest Price:</Typography>
                        <Typography variant="body1" sx={{ ...styles.content, ...styles.highestPrice }}>${highestPrice}</Typography>
                    </Box>
                )}

                <Box sx={styles.row}>
                    <Typography variant="body1" sx={styles.title}>AuctionID:</Typography>
                    <Typography variant="body1" sx={styles.content}>{auction.auctionId}</Typography>
                </Box>

                <Box sx={styles.row}>
                    <Typography variant="body1" sx={styles.title}>Description:</Typography>
                    <Typography variant="body1" sx={styles.content}>{auction.description}</Typography>
                </Box>

                <Box sx={styles.row}>
                    <Typography variant="body1" sx={styles.title}>Start at:</Typography>
                    <Typography variant="body1" sx={styles.content}>{format(new Date(auction.startTime), 'dd/MM/yyyy hh:mm')}</Typography>
                </Box>

                <Box sx={styles.row}>
                    <Typography variant="body1" sx={styles.title}>End at:</Typography>
                    <Typography variant="body1" sx={styles.content}>{format(new Date(auction.endTime), 'dd/MM/yyyy hh:mm')}</Typography>
                </Box>

                <Box sx={styles.row}>
                    <Typography variant="body1" sx={styles.title}>Registration fee:</Typography>
                    <Typography variant="body1" sx={styles.content}>${auction.deposit}</Typography>
                </Box>

                <Box sx={styles.row}>
                    <Typography variant="body1" sx={styles.title}>Step Price:</Typography>
                    <Typography variant="body1" sx={styles.content}>${auction.stepPrice}</Typography>
                </Box>

                <Box sx={styles.row}>
                    <Typography variant="body1" sx={styles.title}>Auction Method:</Typography>
                    <Typography variant="body1" sx={styles.content}>Incremental and continuous bidding</Typography>
                </Box>

                <Box sx={styles.row}>
                    <Typography variant="body1" sx={styles.title}>Owner:</Typography>
                    <Typography variant="body1" sx={styles.content}>{userData.name}</Typography>
                </Box>

                <Box sx={styles.row}>
                    <Typography variant="body1" sx={styles.title}>Viewing Time:</Typography>
                    <Typography variant="body1" sx={styles.content}>{auction.viewingTime || 'To be decided'}</Typography>
                </Box>

                <Box sx={styles.row}>
                    <Typography variant="body1" sx={styles.title}>Viewing address:</Typography>
                    <Typography variant="body1" sx={styles.content}>{auction.viewingAddress || 'To be decided'}</Typography>
                </Box>

            </Card>
        </>
    );
}

export default AuctionDetail;


