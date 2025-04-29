import React from "react";
import { Box, Typography, Button } from "@mui/material";
import ContactUsImage from "../../assets/contact_image.png";
import ScrollToTop from "../../components/common/ScrollToTop";

const ContactPage = () => {
  return (
    <Box sx={{ ml: { xs: 2, sm: "10%" },mr:{ xs: 2, sm: "8%" }, pr:'10px' }}>
    <ScrollToTop/>
      {/* Header */}
      <Box sx={{ textAlign: "center", pt: 12,display:'flex',justifyContent:'center',gap:'4px',marginTop:'20px' }}>
        <Typography variant="h5" sx={{ color: "gray" }}>
          CONTACT
        </Typography>
        <Typography
          variant="h5"
          sx={{ color: "black", fontWeight: "bold" }}
        >
          US
        </Typography>
      </Box>

      {/* Content */}
      <Box
        sx={{
          my: 5,
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 5,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* Image */}
        <Box
          component="img"
          src={ContactUsImage}
          alt="Contact Us"
          sx={{ width: "100%", maxWidth: 360 }}
        />

        {/* Text Section */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
            gap: 3,
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: "bold", color: "gray" }}>
            OUR OFFICE
          </Typography>
          <Typography variant="body2" sx={{ color: "gray" }}>
            00000 Willms Station <br /> Suite 000, Washington, USA
          </Typography>
          <Typography variant="body2" sx={{ color: "gray" }}>
            Tel: (000) 000-0000 <br /> Email: CareConnect@gmail.com
          </Typography>

          <Typography variant="h6" sx={{ fontWeight: "bold", color: "gray" }}>
            CAREERS AT CareConnect
          </Typography>
          <Typography variant="body2" sx={{ color: "gray" }}>
            Learn more about our teams and job openings.
          </Typography>

          <Button
            variant="outlined"
            sx={{
              px: 4,
              py: 1.5,
              color: "black",
              textTransform: "none",
              transition: "0.5s",
              borderColor: "black",
              "&:hover": { backgroundColor: "black", color: "white" },
            }}
          >
            Explore Jobs
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ContactPage;
