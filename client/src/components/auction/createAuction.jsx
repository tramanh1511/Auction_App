import { useState } from "react";
import Layout from "../layout/Layout";
import React from "react";
import { Button, TextField, Typography, Grid, Card, Box, Alert } from '@mui/material';
import axios from "axios";

export default function createAuction() {
    const userId = localStorage.getItem('uid');

    const [category, setCategory] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [initPrice, setInitPrice] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [error, setError] = useState("");
    const [deposit, setDeposit] = useState("");
    const [stepPrice, setStepPrice] = useState("");

    const isValidUrl = (url) => {
        try {
            new URL(url);
            return true;
        } catch (error) {
            return false;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!category || !title || !description || !initPrice || !startTime || !endTime || !stepPrice || !deposit) {
            setError("Please fill in all required fields.");
            return;
        }

        if (imageUrl && !isValidUrl(imageUrl)) {
            setError("Please enter a valid URL for the image.");
            return;
        }
        axios.post("http://localhost:3000/api/v1/auctions", { userId, category, title, description, imageUrl, initPrice, stepPrice, deposit, startTime, endTime })
            .then((result) => {
                if (result.status === 201) {
                    window.alert("Create Success");
                    window.location.reload();
                }
            })
            .catch((e) => {
                setError(e.response.data.message);
                console.log(e.response.data.message)
            })
    }
    return (
        <Grid container justifyContent="center" alignItems="center" sx={{ height: '100%', marginTop: '5rem' }}>
            <Grid item xs={12} sm={8} md={6} lg={4}>
                <Card sx={{ padding: 4 }}>
                    <Typography variant="h5" gutterBottom sx={{ textAlign: 'center', fontWeight: '500' }}>
                        Create Auction
                    </Typography>
                    <Box sx={{ mt: 3 }}>
                        <form>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Category"
                                        type="text"
                                        fullWidth
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Title"
                                        type="text"
                                        fullWidth
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Description"
                                        type="text"
                                        fullWidth
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Init Price"
                                        type="number"
                                        fullWidth
                                        value={initPrice}
                                        onChange={(e) => setInitPrice(e.target.value)}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Deposit"
                                        type="number"
                                        fullWidth
                                        value={deposit}
                                        onChange={(e) => setDeposit(e.target.value)}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Step Price"
                                        type="number"
                                        fullWidth
                                        value={stepPrice}
                                        onChange={(e) => setStepPrice(e.target.value)}
                                        variant="outlined"
                                    />
                                </Grid>

                                

                                <Grid item xs={12}>
                                    <TextField
                                        label="imageUrl"
                                        type="Url"
                                        fullWidth
                                        value={imageUrl}
                                        onChange={(e) => setImageUrl(e.target.value)}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Start time"
                                        type="datetime-local"
                                        fullWidth
                                        value={startTime}
                                        onChange={(e) => setStartTime(e.target.value)}
                                        variant="outlined"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label="End Time"
                                        type="datetime-local"
                                        fullWidth
                                        value={endTime}
                                        onChange={(e) => setEndTime(e.target.value)}
                                        variant="outlined"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}

                                    />
                                </Grid>
                            </Grid>
                            <Box sx={{ mt: 3 }}>
                                {error && <Alert severity="error">{error}</Alert>}

                                <Button variant="contained" color="primary" fullWidth onClick={handleSubmit}>
                                    Create
                                </Button>
                            </Box>
                        </form>
                    </Box>
                </Card>
            </Grid>
        </Grid>
    )
}
