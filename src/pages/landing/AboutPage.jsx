import React from "react";
import { Box, Typography } from "@mui/material";
import AboutImage from "../../assets/about_image.png";

const AboutPage = () => {

  const whyChooseUs = [
    {
      title: "EFFICIENCY:",
      text: "Streamlined appointment scheduling that fits into your busy lifestyle.",
    },
    {
      title: "CONVENIENCE:",
      text: "Access to a network of trusted healthcare professionals in your area.",
    },
    {
      title: "PERSONALIZATION:",
      text: "Tailored recommendations and reminders to help you stay on top of your health.",
    },
  ]
  return (
    <Box sx={{ ml: { xs: 2, sm: "10%" }, mr: { xs: 2, sm: "8%" }, pr: "10px" }}>
      <Typography variant="h5" align="center" color="gray" pt={12}>
        ABOUT <span style={{ color: "#374151", fontWeight: "bold" }}>US</span>
      </Typography>

      <Box
        display="flex"
        flexDirection={{ xs: "column", md: "row" }}
        alignItems="center"
        justifyContent="space-between"
        my={6}
        gap={4}
      >
        <Box flex="1" display="flex" justifyContent="center">
          <img
            src={AboutImage}
            alt="About Us"
            style={{
              width: "100%",
              maxWidth: 360,
              height: "auto",
              objectFit: "cover",
            }}
          />
        </Box>

        <Box flex="2" color="gray" display="flex" flexDirection="column" gap={2}>
          <Typography variant="body1">
            Welcome to CareConnect, your trusted partner in managing your healthcare needs conveniently and efficiently. At CareConnect, we understand the challenges individuals face when it comes to scheduling doctor appointments and managing their health records.
          </Typography>
          <Typography variant="body1">
            CareConnect is committed to excellence in healthcare technology. We continuously strive to enhance our platform, integrating the latest advancements to improve user experience and deliver superior service. Whether you're booking your first appointment or managing ongoing care, CareConnect is here to support you every step of the way.
          </Typography>
          <Typography variant="h6" color="black" fontWeight="bold">
            Our Vision
          </Typography>
          <Typography variant="body1">
            Our vision at CareConnect is to create a seamless healthcare experience for every user. We aim to bridge the gap between patients and healthcare providers, making it easier for you to access the care you need, when you need it.
          </Typography>
        </Box>
      </Box>

      <Typography variant="h6" my={3}>
        WHY{" "}
        <span style={{ color: "#374151", fontWeight: "bold" }}>CHOOSE US</span>
      </Typography>

      <Box display="flex" flexDirection={{ xs: "column", md: "row" }} mb={5}>
        {whyChooseUs.map((feature, index) => (
          <Box
            key={index}
            sx={{
              border: ".5px solid #ccc",
              px: { xs: 4, md: 8 },
              py: { xs: 4, sm: 8 },
              display: "flex",
              flexDirection: "column",
              fontSize: "15px",
              color: "text.secondary",
              cursor: "pointer",
              transition: "all 0.3s",
              "&:hover": {
                bgcolor: "#5f6fff",
                color: "white",
              },
              flex: 1,
            }}
          >
            <Typography variant="subtitle1" fontWeight="bold">
              {feature.title}
            </Typography>
            <Typography variant="body2">{feature.text}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default AboutPage;
