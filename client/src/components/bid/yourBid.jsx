// import React, { useEffect, useState } from 'react';
// import { Grid, Typography, List, ListItem, ListItemText } from '@mui/material';
// import { Link } from 'react-router-dom';


// function YourBid() {
//     const userId = localStorage.getItem('uid');
//     const [yourBids, setYourBids] = useState([]);
//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await fetch(`http://localhost:3000/api/v1/bids/${userId}`);
//                 const data = await response.json();
//                 console.log('test')
//                 console.log(data)
//                 if (Array.isArray(data)) {
//                     setYourBids(data);
//                 } else {
//                     setYourBids([data]); // Chuyển đổi dữ liệu thành mảng nếu không phải là mảng
//                 }
//             } catch (error) {
//                 console.error('Fetch error:', error);
//             }
//         };

//         fetchData();
//     }, []);
//     return (
//         <div>
//             <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: '1rem', marginTop: '10px', textAlign: 'center' }}>
//                 Your Bid here!
//             </Typography>
//             <Grid container justifyContent="center">
//                 <Grid item xs={12} md={6}>
//                     <List>
//                         {yourBids?.map((bid, index) => (
//                             <ListItem key={bid.bidId}>
//                                 <Link to={`/${bid.auctionId}`} style={{ textDecoration: 'none', color: 'inherit' }} >
//                                     <ListItemText
//                                         primary={`Number ${index + 1}`}
//                                         secondary={
//                                             <Typography>
//                                                 AuctionId: {bid.auctionId}
//                                                 <br />
//                                                 Price: {bid.price}
//                                             </Typography>}
//                                     />
//                                 </Link>
//                             </ListItem>

//                         ))}
//                     </List>
//                 </Grid>
//             </Grid>
//         </div>
//     )
// }

// export default YourBid;


import React, { useEffect, useState } from 'react';
import { Grid, Typography, List, ListItem, ListItemText, Paper } from '@mui/material';
import { Link } from 'react-router-dom';

function YourBid() {
    const userId = localStorage.getItem('uid');
    const [yourBids, setYourBids] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/v1/bids/${userId}`);
                const data = await response.json();
                if (Array.isArray(data)) {
                    setYourBids(data);
                } else {
                    setYourBids([data]); // Convert data to an array if it's not already
                }
            } catch (error) {
                console.error('Fetch error:', error);
            }
        };

        fetchData();
    }, [userId]);

    return (
        <div>
            <Typography 
                variant="h5" 
                sx={{ 
                    fontWeight: 'bold', 
                    marginBottom: 2, 
                    marginTop: 2, 
                    textAlign: 'center', 
                    color: 'text.primary' 
                }}
            >
                Your Bid History
            </Typography>

            <Grid container justifyContent="center">
                <Grid item xs={12} md={8}>
                    <Paper elevation={3} sx={{ padding: 3 }}>
                        <List>
                            {yourBids?.map((bid, index) => (
                                <ListItem key={bid.bidId} sx={{ paddingBottom: 2 }}>
                                    <Link 
                                        to={`/${bid.auctionId}`} 
                                        style={{ textDecoration: 'none', color: 'inherit' }}
                                    >
                                        <ListItemText
                                            primary={`Bid ${index + 1}`} 
                                            secondary={
                                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                                    <strong>Auction ID:</strong> {bid.auctionId}
                                                    <br />
                                                    <strong>Price:</strong> {bid.price}
                                                </Typography>
                                            }
                                        />
                                    </Link>
                                </ListItem>
                            ))}
                        </List>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
}

export default YourBid;
