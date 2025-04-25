import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Button,
  CardContent,
  FormControl,
  Backdrop,
  CircularProgress,
  Select,
  MenuItem,
  Stack,
  CardMedia,
} from "@mui/material";
import verifiedIcon from "../../assets/verified_icon.svg";
import { FormWrapper } from "../../Style";



const doctorApi = import.meta.env.VITE_DOCTOR_API;
const patientApi = import.meta.env.VITE_PATIENT_API;

const AppointmentHistory = () => {
  const userId = localStorage.getItem("userId");
  const userRole = localStorage.getItem("userRole");

  const [appointmentData, setAppointmentData] = useState([]);
  const [filterStatus, setFilterStatus] = useState("Completed");
  const [loading, setLoading] = useState(true);

  // Determine the API URL dynamically
  const api =
    userRole === "doctor"
      ? `${doctorApi}/${userId}`
      : `${patientApi}/${userId}`;

  useEffect(() => {
    const fetchAppointmentData = async () => {
      if (!api) {
        console.error("User ID not found in localStorage");
        setLoading(false);
        return;
      }
      try {
        const response = await fetch(api);
        if (!response.ok) {
          throw new Error("Failed to fetch appointment data");
        }
        const data = await response.json();
        setAppointmentData(data.appointments);
      } catch (error) {
        console.error("Error fetching appointment data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAppointmentData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  const filteredAppointments = appointmentData?.filter(
    (appointment) => appointment?.appointmentStatus === filterStatus
  );



      const renderAppointmentCard = (appointment, index) => {
        const imageSrc =
          userRole === "patient"
            ? appointment.doctorProfile
            : appointment.patientProfile;
    
        const name =
          userRole === "patient"
            ? `Dr. ${appointment.doctorName}`
            : appointment.patientName;
        const subInfo =
          userRole === "patient"
            ? `${appointment.doctorDegree} - ${appointment.doctorSpeciality}`
            : `Height: ${appointment.patientHeight} cm | Weight: ${appointment.patientWeight} kg | Blood Group: ${appointment.patientBloodGroup}`;
    
        const appointmentDetails = (
          <Box mt={1}>
            <Typography fontWeight={500} color="grey.800">
              <strong>Appointment Details</strong>
            </Typography>
            <Stack
              mt={1}
              p={1}
              border="1px solid #ddd"
              borderRadius={2}
              width="fit-content"
            >
              <Typography fontWeight={500} color="grey.800">
                📅 Date: {appointment.appointmentDate.date}
              </Typography>
              <Typography fontWeight={500} color="grey.800">
                🕒 Time: {appointment.appointmentTime}
              </Typography>
            </Stack>
          </Box>
        );
    
        return (
          <Box
            key={index}
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: 2,
              borderBottom: "1px solid #ddd",
              py: 2,
            }}
          >
            {/* Left Image */}
            <CardMedia
              component="img"
              src={imageSrc}
              alt={userRole === "patient" ? "Doctor" : "Patient"}
              sx={{
                width: { xs: "100%", sm: 200 },
                height: 200,
                borderRadius: 2,
                objectFit: "contain",
                backgroundColor: "#eaefff",
                flexShrink: 0,
              }}
            />
    
            {/* Middle Content */}
            <Box flex={1} px={2}>
              <CardContent sx={{ p: 0, color: "grey.700" }}>
                <Box display="flex" alignItems="center" gap={1}>
                  <Typography
                    variant="h6"
                    fontWeight={600}
                    color="#262626"
                    sx={{
                      textTransform: userRole !== "patient" ? "uppercase" : "none",
                    }}
                  >
                    {name}
                  </Typography>
                  {userRole === "patient" && (
                    <img src={verifiedIcon} alt="Verified" width={20} />
                  )}
                </Box>
    
               <Box sx={{display:'flex' , gap:2}}>
               <Typography mt={1} color="text.secondary">
                  {subInfo}
                </Typography>
    
                {userRole === "patient" && (
                  <Button
                    variant="outlined"
                    size="small"
                    sx={{ borderRadius: "999px", fontSize: "12px", px: 2,  }}
                  >
                    {appointment.doctorExperience}
                  </Button>
                )}
               </Box>
    
                <FormWrapper mt={1} gap={1}>
                  <Typography>
                    <strong>Email:</strong> {appointment.email}
                  </Typography>
                  <Box
                    component="span"
                    sx={{ display: { xs: "none", sm: "inline" } }}
                  >
                    |
                  </Box>
                  <Typography>
                    <strong>Contact No:</strong> {appointment.contactNumber}
                  </Typography>
                </FormWrapper>
    
                {userRole !== "patient" && (
                  <Typography mt={1}>
                    <strong>Address:</strong> {appointment.currentAddress}
                  </Typography>
                )}
    
                {appointmentDetails}
              </CardContent>
            </Box>
    
            {/* Right Actions */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1,
                alignItems: "center",
                justifyContent: "center",
                minWidth: 180,
                mt: { xs: 2, md: 0 },
              }}
            >
              <>
              <Button
                  variant="outlined"
                  sx={{
                    minWidth: 180,
                    py: 1,
                    color:
                      appointment.appointmentStatus === "Completed"
                        ? "green"
                        : "red",
                    borderColor:
                      appointment.appointmentStatus === "Completed"
                        ? "green"
                        : "red",
                  }}
                >
                  {appointment.appointmentStatus}
                </Button>
                
              </>
    
              
            </Box>
          </Box>
        );
      };

  return (
    <Box sx={{ ml: { xs: 0, sm: 2 } }}>
      <Backdrop
        open={loading}
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.modal + 1 }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <Box
  display="flex"
  flexWrap="nowrap"
  justifyContent="space-between"
  alignItems="center"
  mt={10}
  pb={1.5}
  borderBottom={1}
>
  <Typography
    variant="h5"
    fontWeight="bold"
    color="grey.700"
    sx={{
      fontSize: { xs: "1.2rem", sm: "1.5rem" },
      whiteSpace: "nowrap",
      flex: 1,
    }}
  >
    Appointments History
  </Typography>

  <FormControl
    variant="standard"
    sx={{
      width: { xs: 90, sm: 160 },
      flexShrink: 0,
    }}
  >
    <Select
        value={filterStatus}
        onChange={(e) => setFilterStatus(e.target.value)}
      label="Filter"
      sx={{
        fontSize: { xs: "0.9rem", sm: "1rem" },
      }}
    >
      <MenuItem value="Completed">Completed</MenuItem>
      <MenuItem value="Cancelled">Cancelled</MenuItem>
    </Select>
  </FormControl>
</Box>

     

      <Box>
        {filteredAppointments?.length > 0 ? (
          filteredAppointments?.map((appointment, index) => (
            renderAppointmentCard(appointment, index)
          ))
        ) : (
          <Typography variant="body1" color="grey.700" mt={2}>
            No appointment history found.
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default AppointmentHistory;
