import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  AppBar, Box, Toolbar, IconButton, Typography, Menu, 
  Container, Avatar, Button, Tooltip, MenuItem 
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { CirclePlus, LogOut, User as UserIcon, Settings } from "lucide-react";
import logo from "../../../assets/logo.png";
import { AuthContext } from "../../../context/AuthContext"; 

const pages = [
  { label: "Dashboard", path: "/dashboard" },
  { label: "Goals", path: "/goals" },
  { label: "Weekly Report", path: "/report" },
];

function DashHeader() {
  const { user, logout } = React.useContext(AuthContext);
  const navigate = useNavigate();

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  const handleLogout = () => {
    handleCloseUserMenu();
    logout();
    navigate("/login");
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#141414", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* LOGO - Desktop */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, mr: 2 }}>
            <Link to="/">
              <img src={logo} alt="COGNIFLOW" style={{ height: "50px" }} />
            </Link>
          </Box>

          {/* MOBILE MENU */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton size="large" onClick={handleOpenNavMenu} color="inherit">
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorElNav}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {pages.map((page) => (
                <MenuItem key={page.label} onClick={handleCloseNavMenu} component={Link} to={page.path}>
                  <Typography textAlign="center">{page.label}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* LOGO - Mobile */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
             <img src={logo} alt="COGNIFLOW" style={{ height: "40px" }} />
          </Box>

          {/* DESKTOP NAV ITEMS */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page.label}
                component={Link}
                to={page.path}
                sx={{ my: 2, color: "white", display: "block", textTransform: 'none', fontSize: '1rem' }}
              >
                {page.label}
              </Button>
            ))}
          </Box>

          {/* RIGHT SIDE: AUTH BUTTONS OR USER PROFILE */}
          <Box sx={{ flexGrow: 0 }}>
            {!user ? (
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button component={Link} to="/login" sx={{ color: 'white' }}>Login</Button>
                <Button component={Link} to="/signup" variant="contained" sx={{ bgcolor: '#3b82f6', '&:hover': { bgcolor: '#2563eb' } }}>
                  Sign Up
                </Button>
              </Box>
            ) : (
              <div className="flex items-center space-x-4">
                <Tooltip title="Create new goal">
                  <button className="hidden md:flex items-center space-x-1 text-white hover:bg-white/10 px-3 py-2 rounded-md transition border border-white/20">
                    <CirclePlus size={18} />
                    <span className="text-sm font-medium">CREATE GOAL</span>
                  </button>
                </Tooltip>

                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, border: '2px solid #3b82f6' }}>
                    <Avatar alt={user.name} src={user.avatar} sx={{ width: 35, height: 35 }} />
                  </IconButton>
                </Tooltip>
              </div>
            )}

            <Menu
              sx={{ mt: "45px" }}
              anchorEl={anchorElUser}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
              PaperProps={{
                sx: { bgcolor: '#1e1e1e', color: 'white', minWidth: '150px', border: '1px solid #333' }
              }}
            >
              <MenuItem onClick={handleCloseUserMenu} component={Link} to="/profile">
                <UserIcon size={16} className="mr-2" /> Profile
              </MenuItem>
              <MenuItem onClick={handleCloseUserMenu} component={Link} to="/settings">
                <Settings size={16} className="mr-2" /> Settings
              </MenuItem>
              <hr className="border-gray-700 my-1" />
              <MenuItem onClick={handleLogout} sx={{ color: '#ff4d4d' }}>
                <LogOut size={16} className="mr-2" /> Logout
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default DashHeader;