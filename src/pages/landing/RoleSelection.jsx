import React, { useState } from "react";
import { Box, Typography, Paper } from "@mui/material";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";
import MedicalInformationIcon from "@mui/icons-material/MedicalInformation";
import PersonIcon from "@mui/icons-material/Person";

const Container = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "70vh",
  marginTop:'10px'
});

const TextContainer = styled(Box)({
  textAlign: "left",
  width: "100%",
  maxWidth: 350,
});

const RoleCard = styled(Paper)(({ selected }) => ({
  cursor: "pointer",
  padding: "20px",
  display: "flex",
  alignItems: "center",
  width: "90%",
  gap: "12px",
  borderRadius: "8px",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  backgroundColor:  "white",
  border: selected ? "2px solid #f2f3ff" : "2px solid #ccc",
  transition: "all 0.2s ease-in-out",
  "&:hover": {
    transform: "scale(1.05)",
    backgroundColor: "#f2f3ff",
  },
}));

const RoleSelection = () => {
  const [selectedRole, setSelectedRole] = useState(null);
  const navigate = useNavigate()

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    localStorage.setItem("userRole", role);
    navigate('/login')
  };

  return (
    <Container>
      <TextContainer>
        <Typography variant="h4" color="#000b6d" fontWeight="bold" mb={1}>
          Hello!
        </Typography>
        <Typography variant="h6" color="textPrimary" mb={1}>
          Are you a Doctor or a Patient?
        </Typography>
      </TextContainer>

      <Box
        display="flex"
        flexDirection="column"
        gap={2}
        width="100%"
        maxWidth={350}
        alignItems="center"
      >
        <RoleCard
          selected={selectedRole === "patient"}
          onClick={() => handleRoleSelect("patient")}
        >
          <PersonIcon   sx={{color:"#4F6EF7",fontSize:'30px'}}/>
          <Typography variant="h6" color="textPrimary">
            Patient
          </Typography>
        </RoleCard>

        <RoleCard
          selected={selectedRole === "doctor"}
          onClick={() => handleRoleSelect("doctor")}
        >
          <MedicalInformationIcon  sx={{color:"#4F6EF7",fontSize:'30px'}} />
          <Typography variant="h6" color="textPrimary">
            Doctor
          </Typography>
        </RoleCard>
      </Box>
    </Container>
  );
};

export default RoleSelection;
