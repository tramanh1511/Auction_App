import React, { useState, useEffect } from 'react';
import {
    Avatar, Box, Typography, Card, IconButton, TextField, Button
} from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';

function Profile() {
    const [userData, setUserData] = useState({
        email: '',
        phone: '',
        name: '',
        intro: '',
        password: '',
        // Add more fields as needed
    });

    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const userId = localStorage.getItem('uid');
        if (userId) {
            fetchUserData(userId);
        }
    }, []);

    const fetchUserData = async (userId) => {
        try {
            const response = await fetch(`http://localhost:3000/api/v1/users/${userId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch user data');
            }
            const data = await response.json();
            console.log(data);
            setUserData(data);
        } catch (error) {
            console.error('Fetch error:', error);
            // Handle fetch error
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userId = localStorage.getItem('uid');
            const response = await fetch(`http://localhost:3000/api/v1/users/${userId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });
            if (!response.ok) {
                throw new Error('Failed to update user data');
            }
            alert('Cập nhật thông tin thành công');
            setIsEditing(false); // Đóng form sửa đổi sau khi cập nhật thành công
        } catch (error) {
            console.error('Update error:', error);
            alert('Cập nhật thông tin không thành công. Vui lòng thử lại sau.');
        }
    };

    return (
        <div>
            <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: '1rem', marginTop: '10px', textAlign: 'center' }}>
                User Profile
            </Typography>
            <Card sx={{ padding: '2rem', width: '500px', margin: 'auto', position: "relative" }}>
                {!isEditing && (
                    <IconButton
                        sx={{
                            position: 'absolute',
                            right: '18px',
                        }}
                        aria-label="edit"
                        onClick={() => setIsEditing(true)} // Khi nhấn vào nút Edit, hiển thị form sửa đổi
                    >
                        <EditIcon />
                    </IconButton>
                )}
                {isEditing ? ( // Hiển thị form sửa đổi nếu đang trong trạng thái sửa đổi
                    <form onSubmit={handleSubmit}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Avatar alt="User Avatar" style={{ width: '80px', height: '80px', marginBottom: '16px' }} />
                        </Box>
                        <Box sx={{ marginBottom: '1rem' }}>
                            <TextField
                                fullWidth
                                label="Full Name"
                                variant="outlined"
                                name="name"
                                value={userData.name}
                                onChange={handleInputChange}
                            />
                        </Box>
                        <Box sx={{ marginBottom: '1rem' }}>
                            <TextField
                                fullWidth
                                label="Email"
                                variant="outlined"
                                name="email"
                                value={userData.email}
                                onChange={handleInputChange}
                            />
                        </Box>
                        <Box sx={{ marginBottom: '1rem' }}>
                            <TextField
                                fullWidth
                                label="Phone Number"
                                type='number'
                                variant="outlined"
                                name="phone"
                                value={userData.phone}
                                onChange={handleInputChange}
                            />
                        </Box>
                        <Box>
                            <TextField
                                fullWidth
                                label="Introduction"
                                variant="outlined"
                                name="intro"
                                value={userData.intro}
                                onChange={handleInputChange}
                            />
                        </Box>
                        <Button type="submit">Save Changes</Button>
                    </form>
                ) : ( // Hiển thị thông tin người dùng nếu không trong trạng thái sửa đổi
                    <>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Avatar alt="User Avatar" style={{ width: '80px', height: '80px', marginBottom: '16px' }} />
                        </Box>
                        <Box sx={{ marginBottom: '1rem' }}>
                            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                                Full name:
                            </Typography>
                            <Typography variant="body1">
                                {userData.name}
                            </Typography>
                        </Box>
                        <Box sx={{ marginBottom: '1rem' }}>
                            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                                Email:
                            </Typography>
                            <Typography variant="body1">
                                {userData.email}
                            </Typography>
                        </Box>
                        <Box sx={{ marginBottom: '1rem' }}>
                            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                                PhoneNumber:
                            </Typography>
                            <Typography variant="body1">
                                {userData.phone}
                            </Typography>
                        </Box>
                        <Box>
                            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                                Introduction:
                            </Typography>
                            <Typography variant="body1">
                                {userData.intro}
                            </Typography>
                        </Box>
                    </>
                )}
            </Card>
        </div>
    );

}

export default Profile;
