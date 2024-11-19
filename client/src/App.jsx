import React from "react";
import { Route, Routes, Navigate, BrowserRouter } from "react-router-dom";

import Landing from "./components/Landing/landing";
import Login from "./components/authentication/Login";
import Signup from "./components/authentication/signup";
import CreateAuction from "./components/auction/createAuction";
import AuctionDetail from "./components/auction/auctionDetail";
import Profile from "./components/authentication/profile";
import YourAuction from "./components/auction/yourAuction";
import ApproveAuction from "./components/auction/approveAuction";
import ListUser from "./components/authentication/listUser";
import Bidding from "./components/bid/biddingPage";
import YourBid from "./components/bid/yourBid";

import { AuthProvider } from "react-auth-kit";
import Layout from "./components/layout/Layout";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />} >
            <Route index element={<Landing />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="createAuction" element={<CreateAuction />} />
            <Route path="profile" element={<Profile />} />
            <Route path=":auctionId" element={<AuctionDetail />} />
            <Route path="yourAuction" element={<YourAuction />} />
            <Route path="approveAuction" element={<ApproveAuction />} />
            <Route path="listUser" element={<ListUser />} />
            <Route path="biddingPage/:auctionId" element={<Bidding />} />
            <Route path="yourBid" element={<YourBid />} />

          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>


  );
}

export default App;
