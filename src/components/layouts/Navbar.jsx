import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import CareConnectLogo from "../../assets/CareConnectLogo.png";
import CrossIcon from "../../assets/cross_icon.png";
import MenuIcon from "../../assets/menu_icon.svg";


function NavBar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
 

  const navLinks = [
    { path: "/", label: "HOME" },
    { path: "/about", label: "ABOUT" },
    { path: "/contact", label: "CONTACT" },
  ];

  const toggleDrawer = () => setMobileOpen(!mobileOpen);

  const handleAdmin = () => {
    localStorage.setItem("userRole", "admin");
    setMobileOpen(false);  
    navigate("/AdminLogin");  
  };

  const handleLogin = () => {
    setMobileOpen(false); 
  };

  const renderNavLinks = (onClick) =>
    navLinks.map(({ path, label }) => (
      <NavLink
        key={path}
        to={path}
        onClick={onClick}
        style={({ isActive }) => ({
          textDecoration: "none",
          color: isActive ? "#000b6d" : "#000",
          fontWeight: isActive ? "600" : "500",
          fontSize: "14px",
          padding: "10px 0",
          position: "relative",
          display: "inline-block",
        })}
      >
        {label}
      </NavLink>
    ));

  return (
    <AppBar
      sx={{
        background: "#fff",
        position: "fixed",
        boxShadow: "none",
        borderBottom: "1px solid #ddd",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
          {/* Logo */}
          <Box
            component="img"
            src={CareConnectLogo}
            alt="CareConnect Logo"
            sx={{ width: 200 }}
            ml={2}
          />

          {/* Desktop Navigation */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              gap: "30px",
            }}
          >
            {renderNavLinks()}
            <Button
              variant="outlined"
              component={NavLink}
              to="/AdminLogin"
              sx={{
                color: "#181c18",
                borderColor: "#181c18",
                borderRadius: "18px",
                fontSize: "12px",
                fontWeight: 600,
                padding: "6px 12px",
                textTransform: "none",
                "&:hover": { backgroundColor: "#fff", color: "#181c18" },
              }}
              onClick={handleAdmin}
            >
              Admin Panel
            </Button>
          </Box>

          {/* Mobile Menu Icon */}
          <IconButton
            sx={{ display: { xs: "flex", md: "none" } }}
            onClick={toggleDrawer}
          >
            <Box
              component="img"
              src={MenuIcon}
              alt="Menu"
              sx={{ width: 24, height: 24 }}
            />
          </IconButton>

          {/* Mobile Drawer */}
          <Drawer anchor="right" open={mobileOpen} onClose={toggleDrawer}>
            <Box
              sx={{
                width: 250,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "20px",
              }}
            >
              <IconButton sx={{ alignSelf: "flex-end" }} onClick={toggleDrawer}>
                <Box
                  component="img"
                  src={CrossIcon}
                  alt="Close"
                  sx={{ width: 24, height: 24 }}
                />
              </IconButton>
              {renderNavLinks(toggleDrawer)}
              <Button
                variant="outlined"
                sx={{
                  marginTop: "20px",
                  color: "#181c18",
                  borderColor: "#181c18",
                  borderRadius: "18px",
                  fontSize: "14px",
                  fontWeight: 600,
                  padding: "8px 16px",
                  textTransform: "none",
                }}
                onClick={handleAdmin}
              >
                Admin Panel
              </Button>
              <Button
                component={NavLink}
                to="/roleSelection"
                variant="contained"
                sx={{
                  marginTop: "10px",
                  backgroundColor: "#4F6EF7",
                  color: "#fff",
                  padding: "8px 16px",
                  borderRadius: "20px",
                  textTransform: "none",
                  fontSize: "14px",
                  "&:hover": { backgroundColor: "#4058D3" },
                }}
                onClick={()=>setMobileOpen(false)}
              >
                Login Account
              </Button>
            </Box>
          </Drawer>

          {/* Desktop Login Button */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: "12px" }}>
            <Button
              component={NavLink}
              to="/roleSelection"
              variant="contained"
              sx={{
                backgroundColor: "#4F6EF7",
                color: "#fff",
                padding: "6px 16px",
                borderRadius: "20px",
                textTransform: "none",
                fontSize: "14px",
                "&:hover": { backgroundColor: "#4058D3" },
              }}
              onClick={handleLogin}
            >
              Login Account
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default NavBar;
