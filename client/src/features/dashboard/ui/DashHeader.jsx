import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  AppBar, Box, Toolbar, IconButton, Typography, Menu, 
  Container, Avatar, Button, Tooltip, MenuItem 
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { CirclePlus, LogOut, User as UserIcon, Settings } from "lucide-react";
import logo from "../../../../src/assets/logoo.png";
import { AuthContext } from "../../../context/AuthContext"; 

const pages = [
  { label: "Dashboard", path: "/dashboard" },
  { label: "Completed Goals", path: "/archive" },
  { label: "Weekly Report", path: "/report" },
];

function DashHeader({ onOpenModal, completedCount }) {
  const { user, logout } = React.useContext(AuthContext);
  const navigate = useNavigate();

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  const handleGoToProfile = () => {
    handleCloseUserMenu();
    navigate("/profile");
  };

  const handleGoToSettings = () => {
    handleCloseUserMenu();
    navigate("/settings");
  };

  const handleLogout = () => {
    handleCloseUserMenu();
    logout();
    navigate("/login");
  };

  return (
    <AppBar 
      position="static" 
      sx={{ 
        backgroundColor: "#141414", 
        borderBottom: "1px solid rgba(255,255,255,0.1)", 
        boxShadow: 'none',
        py: 0.5 // Minimal padding for a slim look
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ minHeight: { xs: '60px', md: '70px' } }}>
          
          {/* LOGO - Desktop */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, mr: 4 }}>
            <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
              <img 
                src={logo} 
                alt="COGNIFLOW" 
                style={{ 
                  height: "70px", // Professional height for desktop
                  width: "215px", 
                  objectFit: "contain",
                  display: "block",
                  scale : "2",
                }} 
              />
            </Link>
          </Box>

          {/* MOBILE MENU TRIGGER */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton size="large" onClick={handleOpenNavMenu} color="inherit">
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorElNav}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
              PaperProps={{ sx: { bgcolor: '#1e1e1e', color: 'white', borderRadius: '12px' } }}
            >
              {pages.map((page) => (
                <MenuItem key={page.label} onClick={handleCloseNavMenu} component={Link} to={page.path}>
                   <Typography textAlign="center">
                    {page.label}
                    {page.label === "Completed Goals" && completedCount > 0 && ` (${completedCount})`}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* LOGO - Mobile */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, justifyContent: 'center' }}>
            <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
              <img 
                src={logo} 
                alt="COGNIFLOW" 
                style={{ 
                  height: "35px", // Compact height for mobile
                  width: "auto", 
                  objectFit: "contain",
                  display: "block"
                }} 
              />
            </Link>
          </Box>

          {/* DESKTOP NAV ITEMS */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, gap: 1 }}>
            {pages.map((page) => (
              <Button
                key={page.label}
                component={Link}
                to={page.path}
                sx={{ 
                  my: 2, 
                  color: "white", 
                  textTransform: 'none',
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  '&:hover': { color: '#3b82f6' }
                }}
              >
                {page.label}
                {page.label === "Completed Goals" && completedCount > 0 && (
                  <Box 
                    sx={{ 
                      ml: 1.5, 
                      px: 1,
                      py: 0.2,
                      borderRadius: '10px',
                      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                      color: 'white',
                      fontSize: '0.65rem',
                      fontWeight: 700,
                      boxShadow: '0 4px 10px rgba(16,185,129,0.3)',
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
                <Button component={Link} to="/login" sx={{ color: 'white', textTransform: 'none' }}>Login</Button>
                <Button 
                  component={Link} 
                  to="/signup" 
                  variant="contained" 
                  sx={{ bgcolor: '#3b82f6', textTransform: 'none', borderRadius: '8px' }}
                >
                  Sign Up
                </Button>
              </Box>
            ) : (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, md: 3 } }}>
                <Tooltip title="Create new goal">
                  <Button 
                    onClick={onOpenModal} 
                    startIcon={<CirclePlus size={18} />}
                    sx={{ 
                      display: { xs: 'none', md: 'flex' },
                      color: 'white', 
                      bgcolor: 'rgba(255,255,255,0.05)', 
                      px: 2, 
                      py: 1, 
                      borderRadius: '10px', 
                      border: '1px solid rgba(255,255,255,0.1)',
                      textTransform: 'none',
                      fontWeight: 600,
                      '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' }
                    }}
                  >
                    CREATE
                  </Button>
                </Tooltip>

                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0.5, border: '2px solid #3b82f6' }}>
                  <Avatar 
                    alt={user.name} 
                    src={user.avatar || `https://api.dicebear.com/7.x/bottts/svg?seed=${user.name || 'default'}`}
                    sx={{ width: 32, height: 32 }}
                  />
                </IconButton>
              </Box>
            )}

            <Menu
              sx={{ mt: "45px" }}
              anchorEl={anchorElUser}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
              PaperProps={{
                sx: { 
                  bgcolor: '#1e1e1e', 
                  color: 'white', 
                  minWidth: '180px', 
                  border: '1px solid #333', 
                  borderRadius: '12px',
                  mt: 1.5
                }
              }}
            >
              <MenuItem onClick={handleGoToProfile} sx={{ py: 1.5 }}>
                <UserIcon size={16} className="mr-3 text-zinc-400" /> Profile
              </MenuItem>
              <MenuItem onClick={handleGoToSettings} sx={{ py: 1.5 }}>
                <Settings size={16} className="mr-3 text-zinc-400" /> Settings
              </MenuItem>
              <Box sx={{ borderTop: '1px solid #333', my: 1 }} />
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