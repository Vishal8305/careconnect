import React from "react";
import {
  Container,
  Card,
  Typography,
  Badge,
  Box,
  useMediaQuery,
} from "@mui/material";
import { styled, useTheme } from "@mui/system";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";

const HowItWorksSection = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "65vh",
  width: "100%",
  textAlign: "center",
  [theme.breakpoints.down("sm")]: {
    padding: "40px 10px",
  },
}));

const StepWrapper = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
});

const StepCard = styled(Card)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "70px",
  height: "70px",
  borderRadius: "10px",
  boxShadow: "none",
  background: "#f0eded",
});

const DottedLine = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "20px",
  marginBottom: "70px",
  flexGrow: 1,
});

const Dot = styled("span")({
  width: "8px",
  height: "8px",
  background: "#888",
  borderRadius: "50%",
});

const steps = [
  {
    id: 1,
    title: "Find A Doctor",
    description:
      "Discover skilled doctors based on specialization and location.",
    icon: <PersonSearchIcon fontSize="large" />,
  },
  {
    id: 2,
    title: "Book Appointment",
    description: "Effortlessly book appointments at your convenience.",
    icon: <CalendarMonthIcon fontSize="large" />,
  },
  {
    id: 3,
    title: "Get Services",
    description:
      "Receive personalized healthcare services tailored to your needs.",
    icon: <MedicalServicesIcon fontSize="large" />,
  },
];

const HowItWorks = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box
      sx={(theme) => ({
        width: "100%",
        height: "auto",
        display: "flex",
        flexDirection: "column",
        mt: { xs: 8, sm: 0 },
        [theme.breakpoints.up("md")]: {
          flexDirection: "row",
          height: "70vh",
        },
      })}
    >
      <HowItWorksSection>
        <Container>
          <Typography
            variant="h3"
            gutterBottom
            sx={{
              fontWeight: "bold",
              fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" }, // Adjust font size
            }}
          >
            How It Works!
          </Typography>
          <Typography
            variant="body1"
            gutterBottom
            sx={{ fontSize: { xs: "0.875rem", sm: "1rem", md: "1.25rem" } }} // Font size for mobile
          >
            Discover, book, and experience personalized healthcare effortlessly.
          </Typography>
          <Typography
            sx={{
              marginBottom: "30px",
              fontSize: { xs: "0.75rem", sm: "1rem", md: "1.125rem" },
            }}
          >
            with our user-friendly Doctor Appointment Website.
          </Typography>

          <Box
            display="flex"
            flexDirection={isMobile ? "column" : "row"}
            alignItems="center"
            justifyContent="center"
            gap={isMobile ? 4 : 6}
          >
            {steps.map((step, index) => (
              <React.Fragment key={step.id}>
                <StepWrapper>
                  <Badge
                    badgeContent={step.id}
                    sx={{
                      "& .MuiBadge-badge": {
                        backgroundColor: "#4F6EF7",
                        color: "white",
                      },
                    }}
                  >
                    <StepCard>{step.icon}</StepCard>
                  </Badge>
                  <Typography
                    variant="h6"
                    mt={2}
                    sx={{
                      fontWeight: "bold",
                      fontSize: { xs: "1rem", sm: "1.25rem", md: "1.5rem" }, // Adjust font size
                    }}
                  >
                    {step.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ fontSize: { xs: "0.75rem", sm: "1rem", md: "1.125rem" } }}
                  >
                    {step.description}
                  </Typography>
                </StepWrapper>

                {!isMobile && index < steps.length - 1 && (
                  <DottedLine>
                    {[...Array(4)].map((_, i) => (
                      <Dot key={i} />
                    ))}
                  </DottedLine>
                )}
              </React.Fragment>
            ))}
          </Box>
        </Container>
      </HowItWorksSection>
    </Box>
  );
};

export default HowItWorks;
