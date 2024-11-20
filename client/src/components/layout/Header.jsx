import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';
import { Link, useNavigate } from 'react-router-dom';
import { useIsAuthenticated } from "react-auth-kit";

function Header() {
  const userRole = localStorage.getItem('role');
  const navigate = useNavigate();

  // Các trang được hiển thị theo vai trò
  let pages = ['Home'];
  let routes = ['/'];
  if (userRole === 'admin') {
    pages = ['Home', 'Approve Auction', 'List Users'];
    routes = ['/', '/approveAuction', '/listUser'];
  }
  if (userRole === 'user') {
    pages = ['Home', 'Create Auction', 'Your Auction', 'Your Bid'];
    routes = ['/', '/createAuction', '/yourAuction', '/yourBid'];
  }

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  const isAuthenticated = useIsAuthenticated();
  const userLoggedIn = localStorage.getItem('uid') !== null;

  return (
    <AppBar position="static" sx={{ backgroundColor: '#ffffff', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', color: '#222831' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Menu Icon cho thiết bị nhỏ */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="menu"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorElNav}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {pages.map((page, index) => (
                <MenuItem key={page} onClick={handleCloseNavMenu} component={Link} to={routes[index]}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Hiển thị các nút trên màn hình lớn */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page, index) => (
              <Typography
                key={page}
                component={Link}
                to={routes[index]}
                sx={{
                  textDecoration: 'none',
                  color: '#222831',
                  mx: 2,
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'color 0.3s',
                  '&:hover': { color: '#4CAF50' }, // Hiệu ứng hover đổi màu
                }}
              >
                {page}
              </Typography>
            ))}
          </Box>

          {/* Avatar và Menu người dùng */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography sx={{ display: { xs: 'none', md: 'block' }, mr: 2, color: '#222831', fontWeight: 'bold' }}>
              {localStorage.getItem('userName')}
            </Typography>
            {userLoggedIn ? (
              <>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="User Avatar" sx={{ width: 32, height: 32 }} />
                </IconButton>
                <Menu
                  anchorEl={anchorElUser}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                  sx={{ mt: '45px' }}
                >
                  <MenuItem component={Link} to="/profile">
                    <Typography textAlign="center">Profile</Typography>
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>
                    <Typography textAlign="center">Logout</Typography>
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Typography
                onClick={() => navigate('/login')}
                sx={{
                  textDecoration: 'none',
                  color: '#222831',
                  mx: 2,
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'color 0.3s',
                  '&:hover': { color: '#4CAF50' }, 
                }}
              >
                Login
              </Typography>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
