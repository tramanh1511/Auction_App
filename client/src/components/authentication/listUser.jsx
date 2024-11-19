import React, { useState, useEffect } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { Button } from "@mui/material";


function ListUser() {
    const [userList, setUserList] = useState([]);

    useEffect(() => {
        fetchAllUsers();
    }, [])

    const fetchAllUsers = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/v1/users/');
            const data = await response.json();
            setUserList(data)

        } catch (error) {
            console.error(error);

        }
    }
    const handleDelete = async (userId) => {
        const confirmDelete = window.confirm("Are you sure?");
        if (confirmDelete) {
            try {
                const response = await axios.delete(`http://localhost:3000/api/v1/users/${userId}`);
                if (response.status === 200) {
                    window.alert('User deleted successfully!')
                    fetchAllUsers();
                }
            } catch (error) {
                console.error('Delete error:', error);
            }
        }
    };


    return (
        <div>
            <List sx={{ width: '100%', maxWidth: 600, bgcolor: 'background.paper', marginLeft: '30%', marginTop: '20px' }}>
                {userList?.map((user) => (
                    <React.Fragment key={user.userId}>
                        <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                                <Avatar alt={user.name} src={user.avatar} />
                            </ListItemAvatar>
                            <ListItemText
                                primary={`${user.name} - ID: ${user.userId}`}
                                secondary={
                                    <React.Fragment>
                                        <Typography
                                            sx={{ display: 'inline' }}
                                            component="span"
                                            variant="body2"
                                            color="text.primary"
                                        >
                                            {user.email}
                                        </Typography>
                                        {` — ${user.phone}`}
                                    </React.Fragment>
                                }
                            />
                            <Button variant="contained" color="error" sx={{ marginTop: "0.7rem" }} onClick={() => handleDelete(user.userId)}>Delete</Button>
                        </ListItem>
                        {user.userId !== userList.length - 1 && <Divider variant="inset" component="li" />}
                    </React.Fragment>
                ))}
            </List>
        </div>
    );
}
export default ListUser;