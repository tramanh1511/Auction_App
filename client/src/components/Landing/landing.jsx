import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import backgroundIMG from "../../assets/images/banner.jpg";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import "../../assets/Styles/Landing/Landing.css";
import useMediaQuery from "@mui/material/useMediaQuery";
import AuctionList from "../auction/auctionList";
import React, { useState } from "react";


export default function BackToTop(props) {
  const match = useMediaQuery("(max-width:800px)");
  const [searchQuery, setSearchQuery] = useState("");
  const [auctions, setAuctions] = useState(undefined);
  const [error, setError] = useState(null);



  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
        setError('Please enter a search query.');
        return;
    }
    try {
      const response = await fetchAuctionsByTitle(searchQuery);
      console.log(response);
      if (response.length === 0) {
        setError('No results');
        setAuctions(null);
      }
      else {
        setAuctions(response);
      }
    } catch (error) {
      console.error("Search error:", error);
      setError("No results");
    }
  }
  const fetchAuctionsByTitle = async (title) => {
    const apiUrl = `http://localhost:3000/api/v1/visitors?title=${encodeURIComponent(title)}`;
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  };

  return (
    <React.Fragment>
      <Box>
        <Box
          sx={{
            backgroundImage: `url(${backgroundIMG})`,
            backgroundRepeat: "no-repeat",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
            backgroundSize: "cover",
          }}
        >
        </Box>
        <Box
          sx={{
            minHeight: "30vh",
            background: "#222831",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Paper
            sx={{
              width: "100%",
              padding: 2,
              background: "#222831",
              mt: 1,
              boxShadow: "none",
            }}
          >
            <Typography
              variant="h4"
              sx={{
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              Search Auction
            </Typography>
            <Stack sx={{ alignItems: "center" }}>
              <form onSubmit={handleSearch}>
                <Stack
                  spacing={1}
                  direction="row"
                  sx={{
                    mb: 2,
                    justifyContent: "center",
                    width: `${match ? "300px" : "570px"}`,
                  }}
                >
                  <TextField
                    required
                    placeholder="Searching..."
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                    }}
                    value={searchQuery}
                    sx={{
                      width: "100%",
                    }}
                  >
                    {" "}
                  </TextField>
                  <Button
                    id="button"
                    type="submit"
                    variant="contained"
                    sx={{
                      margin: 0,
                      width: 130,
                    }}
                  >
                    Search
                  </Button>
                </Stack>
              </form>
              {error && <Typography color="error">{error}</Typography>}
            </Stack>
            <Stack>
            {auctions !== undefined ? <AuctionList auctions={auctions} /> : <AuctionList />}
            </Stack>
          </Paper>
        </Box>
      </Box>

    </React.Fragment>
  );
}
