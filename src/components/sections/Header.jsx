import React from "react";
import { Box, Typography, Button } from "@mui/material";
import GroupProfiles from "../../assets/group_profiles.png";
import ArrowIcon from "../../assets/arrow_icon.svg";
import HeaderImage from "../../assets/header_img.png";

const Header = ({onScroll}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        flexWrap: "wrap",
        backgroundColor: "#5f6FFF",
        borderRadius: "12px",
        px: { xs: 3, md: 5, lg: 10 },
        marginTop:'90px'
      }}
    >
      {/* ----- Left Side ----- */}
      <Box
        sx={{
          width: { md: "50%" },
          display: "flex",
          flexDirection: "column",
          alignItems: { xs: "center", md: "flex-start" },
          justifyContent: "center",
          gap: 2,
          py: { xs: 5, md: "10vw" },
          mb: { md: "-30px" },
          textAlign: { xs: "center", md: "left" },
        }}
      >
        <Typography
          sx={{
            fontSize: { xs: "2rem", md: "2.5rem", lg: "3rem" },
            fontWeight: "600",
            color: "white",
            lineHeight: "1.2",
          }}
        >
          Book Appointment <br /> With Trusted Doctors
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            gap: 1,
            color: "white",
            fontSize: "0.875rem",
            fontWeight: "300",
          }}
        >
          <Box component="img" src={GroupProfiles} alt="" sx={{ width: 112 }} />
          <Typography sx={{ fontSize: "0.875rem" }}>
            Simply browse through our extensive list of trusted doctors,{" "}
            <br className="hidden sm:block" /> schedule your appointment
            hassle-free.
          </Typography>
        </Box>

        <Button
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            backgroundColor: "white",
            px: 4,
            py: 1.5,
            borderRadius: "999px",
            color: "gray",
            fontSize: "0.875rem",
            transition: "0.3s",
            "&:hover": { transform: "scale(1.05)", backgroundColor: "white" },
          }}
          onClick={onScroll}
        >
         Explore More
          <Box component="img" src={ArrowIcon} alt="" sx={{ width: 12 }} />
        </Button>
      </Box>

      {/* ---- Right Side ---- */}
      <Box
        sx={{
          width: { md: "50%" },
          position: "relative",
        }}
      >
        <Box
          component="img"
          src={HeaderImage}
          alt=""
          sx={{
            width: "100%",
            position: { md: "absolute" },
            bottom: 0,
            borderRadius: "12px",
          }}
        />
      </Box>
    </Box>
  );
};

export default Header;
