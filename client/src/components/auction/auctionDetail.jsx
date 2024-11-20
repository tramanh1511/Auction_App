import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, } from 'react-router-dom';
import { Box, Typography, Card, Button } from '@mui/material';
import { format } from "date-fns";
import axios from 'axios';

const styles = {
    title: {
        fontWeight: 'bold',
        width: '200px', // Fixed width for labels
    },
    content: {
        flex: 1, // Take up the remaining space
        marginLeft: '10px',  // Adds space between label and content
    },
    initPrice: {
        fontSize: '2.4rem',
        fontWeight: '900',
        color: '#d32f2f',
    },
    highestPrice: {
        fontSize: '2.4rem',
        fontWeight: '900',
        color: '#388e3c',  // Green color for highest price
    },
    card: {
        padding: '2rem',
        width: '1000px',
        margin: 'auto',
        position: 'relative',
        marginTop: '20px',
        borderRadius: '16px',
        boxShadow: 3,
    },
    deleteButton: {
        position: 'absolute',
        right: '18px',
        color: 'red',
        fontWeight: 'bold',
    },
    biddingButton: {
        position: 'absolute',
        right: '18px',
        fontWeight: 'bold',
    },
    registerButton: {
        position: 'absolute',
        right: '18px',
        fontWeight: 'bold',
        backgroundColor: '#1976d2',
        color: 'white',
    },
    endedText: {
        position: 'absolute',
        right: '18px',
        marginTop: '60px',
        fontWeight: 'bold',
        color: 'error',
    },
    image: {
        borderRadius: '8px',
        boxShadow: 2,
        width: '60%',
    },
    row: {
        display: 'flex',
        alignItems: 'center',  // Aligns the label and content vertically centered
        marginBottom: '0.5rem',
    },
    rowContent: {
        marginLeft: '10px',  // Adds space between label and content
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

                if(data.currentUsers.includes(currentUser)) {
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

    const handleRegister = async () => {      
        // Check if auction data is available
        if (!auction) {
            console.error('Auction data is not available.');
            return; // Exit if auction is null
        }
        // Check if the user is already registered
        if (auction.currentUsers.includes(currentUser)) {
            console.log("User is already registered");
            setIsRegistered(true);
            return; // Do nothing if already registered
        }
        try {
            // Thêm currentUser mới vào danh sách currentUsers
            const updatedCurrentUsers = [...auction.currentUsers, currentUser];
        
            // Cập nhật toàn bộ auction, không chỉ mỗi currentUsers
            const updatedAuctionData = {
                ...auction, // Giữ lại các trường dữ liệu hiện tại của auction
                currentUsers: updatedCurrentUsers, // Cập nhật currentUsers
            };

            // const response = await axios.patch(`http://localhost:3000/api/v1/auctions/update/${auctionId}`, updatedAuctionData);
             console.log("up", JSON.stringify(updatedAuctionData));

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

    const endTime = new Date(auction.endTime);
    const now = new Date();
    const checkTimeOutForBidding = now - endTime;

    return (
        <>
            <Card sx={styles.card}>
                {(userRole === 'admin' || auction.userId === currentUser) && (
                    <Button
                        sx={styles.deleteButton}
                        aria-label="delete"
                        onClick={handleDelete}
                    >
                        Delete this auction
                    </Button>
                )}
                {checkTimeOutForBidding >= 0 && (
                    <Typography variant="body1" sx={styles.endedText}>
                        Auction has ended
                    </Typography>
                )}
                <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: '1rem', marginTop: '10px', textAlign: 'center' }}>
                    Auction Detail
                </Typography>
                <Typography variant="body1" sx={{ marginTop: '0.5rem', fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                    {auction.title}
                </Typography>
                <Box component="img" src={auction.imageUrl} sx={styles.image} />

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
            {(checkTimeOutForBidding < 0 && !isRegistered && userRole !== 'admin' && auction.userId !== currentUser) && (
                    <Button
                        variant="contained"
                        sx={styles.registerButton}
                        onClick={handleRegister}
                    >
                        Register to this Auction
                    </Button>
                )}

                {checkTimeOutForBidding < 0 && isRegistered && (
                    <Button
                        variant="contained"
                        sx={styles.biddingButton}
                        onClick={handleBidding}
                    >
                        Bidding this Auction
                    </Button>
                )}
            </Card>
        </>
    );
}

export default AuctionDetail;
