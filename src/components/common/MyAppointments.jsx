import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Button,
  CardContent,
  Backdrop,
  CircularProgress,
  FormControl,
  Select,
  MenuItem,
  Stack,
  CardMedia,
} from "@mui/material";
import verifiedIcon from "../../assets/verified_icon.svg";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  cancelAppointment,
  fetchAppointments,
} from "../../redux/module/myAppointment/appointmentSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FormWrapper } from "../../Style";

const MyAppointments = () => {
  const dispatch = useDispatch();
  const userId = localStorage.getItem("userId");
  const userRole = localStorage.getItem("userRole");
  const { appointments, loading } = useSelector((state) => state.appointments);

  const [filter, setFilter] = useState("today");
  const navigate = useNavigate();

  useEffect(() => {
    if (userId && userRole) {
      dispatch(fetchAppointments({ userId, userRole }));
    }
  }, [dispatch, userId, userRole]);

  const getFormattedDate = (date = new Date()) => {
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const todayDate = getFormattedDate();

  const filteredAppointments = appointments
    ?.filter((appointment) => {
      if (appointment.appointmentStatus !== "Booked") return false;
      const appointmentDate = appointment.appointmentDate?.date;

      if (filter === "today") {
        return appointmentDate === todayDate;
      }
      if (filter === "upcoming") {
        return new Date(appointmentDate) > new Date(todayDate);
      }
      return true;
    })
    .sort((a, b) => {
      const timeA = new Date(`01/01/2000 ${a.appointmentTime}`).getTime();
      const timeB = new Date(`01/01/2000 ${b.appointmentTime}`).getTime();
      return timeA - timeB;
    });

  const handleCancelAppointment = async (appointmentToCancel) => {
    try {
      await dispatch(
        cancelAppointment({ userId, appointment: appointmentToCancel })
      ).unwrap();
      toast.success("Appointment cancelled successfully");
    } catch (err) {
      toast.error(err || "Failed to cancel appointment");
    }
  };

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

            <Box sx={{ display: "flex", gap: 2 }}>
              <Typography mt={1} color="text.secondary">
                {subInfo}
              </Typography>

              {userRole === "patient" && (
                <Button
                  variant="outlined"
                  size="small"
                  sx={{ borderRadius: "999px", fontSize: "12px", px: 2 }}
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
            {userRole === "patient" && (
              <Button
                variant="outlined"
                sx={{
                  width: { xs: "100%", sm: 200 },
                  py: 1,
                  color: "#696969",
                  borderColor: "#696969",
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: "#007BFF",
                    color: "#fff",
                    borderColor: "#007BFF",
                  },
                }}
                onClick={() => {
                  navigate(
                    `/patient/consultationRoom/${appointment.doctorId}`,
                    {
                      state: { appointment },
                    }
                  );
                }}
              >
                Start Appointment
              </Button>
            )}
            <Button
              variant="outlined"
              sx={{
                width: { xs: "100%", sm: 200 },
                py: 1,
                color: "#696969",
                borderColor: "#696969",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "#DC3545",
                  color: "#fff",
                  borderColor: "#DC3545",
                },
              }}
              onClick={() => handleCancelAppointment(appointment)}
            >
              Cancel Appointment
            </Button>
          </>
        </Box>
      </Box>
    );
  };

  return (
    <Box>
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
          My Appointments
        </Typography>

        <FormControl
          variant="standard"
          sx={{
            width: { xs: 90, sm: 160 },
            flexShrink: 0,
          }}
        >
          <Select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            label="Filter"
            sx={{
              fontSize: { xs: "0.9rem", sm: "1rem" },
            }}
          >
            <MenuItem value="today">Today</MenuItem>
            <MenuItem value="upcoming">Upcoming</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box>
        {filteredAppointments?.length > 0 ? (
          filteredAppointments.map((appointment, index) =>
            renderAppointmentCard(appointment, index)
          )
        ) : (
          <Typography variant="body1" color="grey.700" mt={2}>
            {filter === "today"
              ? "There are no appointments booked for today. Please review upcoming appointments."
              : filter === "upcoming"
              ? "There are no upcoming appointments scheduled."
              : "No appointments have been booked."}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default MyAppointments;
