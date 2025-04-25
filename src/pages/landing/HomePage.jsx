import React, { useRef } from "react";
import { Box } from "@mui/material";
import Header from "../../components/sections/Header";
import HowItWorks from "../../components/sections/HowItWorks";
import Banner from "../../components/sections/Banner";
import DoctorsList from "../../components/common/DoctorsList";

const HomePage = () => {
  const howItWorksRef = useRef(null);

  const scrollToHowItWorks = () => {
    howItWorksRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <Box
      sx={{
        ml: { xs: 2, sm: "10%" },
        mr: { xs: 2, sm: "8%" },
        pr: { xs: 0, md: "10px" },
      }}
    >
      <Header onScroll={scrollToHowItWorks} />
      <Box ref={howItWorksRef}>
        <HowItWorks />
      </Box>
      <DoctorsList title={"Top Doctors to Book"} />
      <Banner />
    </Box>
  );
};

export default HomePage;
