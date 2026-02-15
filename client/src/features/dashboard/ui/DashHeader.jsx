import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  AppBar, Box, Toolbar, IconButton, Typography, Menu, 
  Container, Avatar, Button, Tooltip, MenuItem, Badge 
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { CirclePlus, LogOut, User as UserIcon, Settings } from "lucide-react";
import logo from "../../../assets/logo.png";
import { AuthContext } from "../../../context/AuthContext"; 

// 1. Cleaned up the array (no logic here)
const pages = [
  { label: "Dashboard", path: "/dashboard" },
  { label: "Completed Goals", path: "/archive" },
  { label: "Weekly Report", path: "/report" },
];

// 2. Add completedCount to the props
function DashHeader({ onOpenModal, completedCount }) {
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
    <AppBar position="static" sx={{ backgroundColor: "#141414", borderBottom: "1px solid rgba(255,255,255,0.1)", boxShadow: 'none' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* LOGO - Desktop */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, mr: 4 }}>
            <Link to="/">
              <img src={logo} alt="COGNIFLOW" style={{ height: "45px" }} />
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
              PaperProps={{ sx: { bgcolor: '#1e1e1e', color: 'white' } }}
            >
              {pages.map((page) => (
                <MenuItem key={page.label} onClick={handleCloseNavMenu} component={Link} to={page.path}>
                   <Typography textAlign="center">
                    {page.label}
                    {/* Badge for mobile menu */}
                    {page.label === "Completed Goals" && completedCount > 0 && ` (${completedCount})`}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* LOGO - Mobile */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
             <img src={logo} alt="COGNIFLOW" style={{ height: "35px" }} />
          </Box>

          {/* DESKTOP NAV ITEMS */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, gap: 1 }}>
            {pages.map((page) => (
             <Button
              key={page.label}
              component={Link}
              to={page.path}
              sx={{ my: 2, color: "white", textTransform: 'none' }}
            >
              {page.label}


              {page.label === "Completed Goals" && completedCount > 0 && (
                <Box 
                  sx={{ 
                    ml: 1, 
                    px: 1.1,
                    py: 0.2,
                    borderRadius: '999px',
                    background: 'linear-gradient(135deg, rgba(16,185,129,0.95) 0%, rgba(5,150,105,0.95) 100%)',
                    border: '1px solid rgba(16,185,129,0.6)',
                    color: '#f0fdf4',
                    fontSize: '0.68rem',
                    fontWeight: 700,
                    letterSpacing: '0.04em',
                    boxShadow: '0 6px 18px rgba(16,185,129,0.25)',
                  }}
                >
                  {completedCount}
                </Box>
              )}
            </Button>
                      ))}
          </Box>

          {/* USER ACTIONS */}
          <Box sx={{ flexGrow: 0 }}>
            {!user ? (
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button component={Link} to="/login" sx={{ color: 'white' }}>Login</Button>
                <Button component={Link} to="/signup" variant="contained" sx={{ bgcolor: '#3b82f6' }}>Sign Up</Button>
              </Box>
            ) : (
              <div className="flex items-center space-x-4">
                <Tooltip title="Create new goal">
                  <button 
                    onClick={onOpenModal} 
                    className="hidden md:flex items-center space-x-2 text-white bg-white/5 hover:bg-white/10 px-4 py-2 rounded-xl transition border border-white/10"
                  >
                    <CirclePlus size={18} className="text-blue-500" />
                    <span className="text-sm font-bold tracking-tight">CREATE</span>
                  </button>
                </Tooltip>

                <IconButton onClick={handleOpenUserMenu} sx={{ p: '2px', border: '2px solid #3b82f6' }}>
                  <Avatar 
                    alt={user.name} 
                    src={user.avatar || `https://api.dicebear.com/7.x/bottts/svg?seed=${user.name || 'default'}`}
                    sx={{ width: 35, height: 35 }}
                  />
                </IconButton>
              </div>
            )}

            <Menu
              sx={{ mt: "45px" }}
              anchorEl={anchorElUser}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
              PaperProps={{
                sx: { bgcolor: '#1e1e1e', color: 'white', minWidth: '180px', border: '1px solid #333', borderRadius: '12px' }
              }}
            >
              <MenuItem onClick={handleCloseUserMenu} component={Link} to="/profile" sx={{ py: 1.5 }}>
                <UserIcon size={16} className="mr-3 text-zinc-400" /> Profile
              </MenuItem>
              <MenuItem onClick={handleCloseUserMenu} component={Link} to="/settings" sx={{ py: 1.5 }}>
                <Settings size={16} className="mr-3 text-zinc-400" /> Settings
              </MenuItem>
              <hr className="border-zinc-800 my-1" />
              <MenuItem onClick={handleLogout} sx={{ color: '#ff4d4d', py: 1.5 }}>
                <LogOut size={16} className="mr-3" /> Logout
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default DashHeader;