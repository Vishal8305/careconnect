import { Avatar, Box, Button, Paper, styled, Typography } from "@mui/material";
import verifiedIcon from "../../assets/verified_icon.svg";
import infoIcon from "../../assets/info_icon.svg";
import React from "react";

const StyledBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    flexDirection: "row",
  },
}));

const InfoCard = styled(Paper)(({ theme }) => ({
  flex: 1,
  zIndex: 1,
  margin: "0px 10px",
  border: "1px solid #BDBDBD",
  borderRadius: "8px",
  padding: theme.spacing(4),
  marginTop: "-80px",
  backgroundColor: "#fff",
  [theme.breakpoints.up("sm")]: {
    marginTop: 0,
    marginLeft: theme.spacing(2),
  },
}));

const SelectedUserOverview = ({ user, role }) => {
  const isDoctor = role === "doctor";

  console.log(user,'data')

  return (
    <StyledBox>
      <Avatar
        src={user?.selectedImage}
        alt={isDoctor ? "Doctor" : "Patient"}
        sx={{
          width: "100%",
          maxWidth: { xs: "400px", md: 288 },
          border: "1px solid #c9d8ff",
          borderRadius: "8px",
          bgcolor: "#eaefff",
          height: "40vh",
        }}
      />

      <InfoCard>
        {isDoctor ? (
          <>
            <Box display="flex" alignItems="center" gap={1}>
              <Typography variant="h4" fontWeight={600} color="text.primary">
                Dr. {user?.doctorName}
              </Typography>
              <img src={verifiedIcon} alt="Verified" width={20} />
            </Box>

            <Box
              display="flex"
              alignItems="center"
              gap={1}
              color="text.secondary"
            >
              <Typography
                sx={{
                  fontSize: { xs: "12.8px", md: "0.875rem" },
                  color: "#4b5563",
                }}
              >
                {user?.degree} - {user?.specialization}
              </Typography>
              <Button
                variant="outlined"
                size="small"
                sx={{
                  borderRadius: "999px",
                  fontWeight: "bold",
                  fontSize: "9px",
                  padding: "2px 8px",
                }}
              >
                {user?.experience}
              </Button>
            </Box>

            <Box mt={1}>
              <Box display="flex" alignItems="center" gap={1}>
                <Typography
                  variant="body1"
                  fontWeight={500}
                  color="text.primary"
                >
                  About
                </Typography>
                <img src={infoIcon} alt="Info" width={16} />
              </Box>
              <Typography
                variant="body2"
                maxWidth={900}
                sx={{
                  fontSize: { xs: "12.8px", md: "0.875rem" },
                  color: "#4b5563",
                }}
              >
                {`Dr. ${user?.firstName} ${user?.lastName}, a highly skilled ${
                  user?.specialization
                }, is dedicated to providing exceptional healthcare services. With ${
                  user?.experience
                } experience in ${user?.specialization?.toLowerCase()}, Dr. ${
                  user?.lastName
                } specializes in personalized care, early diagnosis, and prevention for optimal patient outcomes.`}
              </Typography>
            </Box>

            <Typography
              variant="body1"
              fontWeight={500}
              color="text.primary"
              mt={1}
            >
              Available Days:{" "}
              <Typography component="span" color="text.secondary">
                {user?.availability?.availableDays
                  ? Object.keys(user.availability.availableDays).join(" - ")
                  : "No availability information"}
              </Typography>
            </Typography>

            <Typography variant="body1" fontWeight={500} color="text.primary">
              Appointment Fee:{" "}
              <Typography component="span" color="text.secondary">
                {user?.consultationFees}
              </Typography>
            </Typography>
          </>
        ) : (
          <>
            <Typography variant="h4" fontWeight={600} color="text.primary">
              {user?.firstName} {user?.lastName}
            </Typography>

            <Typography
              variant="body1"
              mt={2}
              fontWeight={500}
              color="text.primary"
            >
              Date of Birth:{" "}
              <Typography component="span" color="text.secondary">
                {user?.dob || "N/A"}
              </Typography>
            </Typography>

            <Typography variant="body1" fontWeight={500} color="text.primary">
              Gender:{" "}
              <Typography component="span" color="text.secondary">
                {user?.gender || "N/A"}
              </Typography>
            </Typography>

            <Typography variant="body1" fontWeight={500} color="text.primary">
              Blood Group:{" "}
              <Typography component="span" color="text.secondary">
                {user?.bloodGroup || "N/A"}
              </Typography>
            </Typography>

            <Typography variant="body1" fontWeight={500} color="text.primary">
              Phone Number:{" "}
              <Typography component="span" color="text.secondary">
                {user?.phone || "N/A"}
              </Typography>
            </Typography>

            <Typography variant="body1" fontWeight={500} color="text.primary">
              Email:{" "}
              <Typography component="span" color="text.secondary">
                {user?.email || "N/A"}
              </Typography>
            </Typography>
          </>
        )}
      </InfoCard>
    </StyledBox>
  );
};

export default SelectedUserOverview;
