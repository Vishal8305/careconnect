import React from "react";
import {
  Box,
  Typography,
  Divider,
  IconButton,
  Link,
} from "@mui/material";
import {
  Facebook,
  Twitter,
  LinkedIn,
  YouTube,
  Instagram,
  LocationOn,
  Email,
  Phone,
} from "@mui/icons-material";
import Logo from "../../assets/CareConnectLogo.png";

const Footer = () => {
  return (
    <Box sx={{ px: { xs: 3, md: 10 }, py: 3 }}>
      <Divider sx={{ my: 3 }} />
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          gap:3,
        }}
      >
        {/* Company Info */}
        <Box sx={{ flex: 1, maxWidth: "370px" }}>
          <Box
            component="img"
            src={Logo}
            alt="CareConnect Logo"
            sx={{ mb: 2, width: 160 }}
          />
          <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
            CareConnect makes it easy to book appointments with doctors, ensuring hassle-free healthcare access for patients.
          </Typography>
          <Box sx={{ mt: 3, display: "flex", gap: 1 }}>
            <IconButton color="inherit"><Facebook /></IconButton>
            <IconButton color="inherit"><Twitter /></IconButton>
            <IconButton color="inherit"><LinkedIn /></IconButton>
            <IconButton color="inherit"><YouTube /></IconButton>
            <IconButton color="inherit"><Instagram /></IconButton>
          </Box>
        </Box>

        {/* Quick Links */}
        <Box sx={{ flex: 1 , maxWidth: "230px" }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
            Quick Links
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1, }}>
            <Link color="inherit" underline="hover">Home</Link>
            <Link color="inherit" underline="hover">About Us</Link>
            <Link color="inherit" underline="hover">Our Services</Link>
            <Link color="inherit" underline="hover">Contact Us</Link>
          </Box>
        </Box>

        {/* Services */}
        <Box sx={{ flex: 1, maxWidth: "230px" }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
            Our Services
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Link color="inherit" underline="hover">Find a Doctor</Link>
            <Link color="inherit" underline="hover">Book an Appointment</Link>
            <Link color="inherit" underline="hover">Telemedicine</Link>
            <Link color="inherit" underline="hover">Health Tips</Link>
          </Box>
        </Box>

        {/* Contact Information */}
        <Box sx={{ flex: 1, maxWidth: "310px"  }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
            Contact Us
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
            <LocationOn fontSize="small" />
            <Typography variant="body2">1234 Healthcare St, New York, NY 10001</Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
            <Phone fontSize="small" />
            <Typography variant="body2">+1-123-456-7890</Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Email fontSize="small" />
            <Typography variant="body2">support@careconnect.com</Typography>
          </Box>
        </Box>
      </Box>

      {/* Footer Bottom */}
      <Divider sx={{ my: 3 }} />
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="body2">
          © {new Date().getFullYear()} CareConnect. All Rights Reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
