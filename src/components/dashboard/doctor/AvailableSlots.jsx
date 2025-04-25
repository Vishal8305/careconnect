import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Divider,
  Button,
  styled,
  RadioGroup,
  FormControlLabel,
  Radio,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import { ArrowForward } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const BookingSlot = styled(Box)(({ selected }) => ({
  textAlign: "center",
  padding: "24px 0",
  minWidth: "64px",
  borderRadius: "9999px",
  cursor: "pointer",
  fontWeight: 600,
  border: selected ? "none" : "1px solid #565656",
  backgroundColor: selected ? "#4F6EF7" : "transparent",
  color: selected ? "#fff" : "#565656",
}));

const doctorApi = import.meta.env.VITE_DOCTOR_API;

const AvailableSlots = () => {
  const [selectedDay, setSelectedDay] = useState(null);
  const [availableDays, setAvailableDays] = useState({});
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const doctorId = localStorage.getItem("userId");
  const api = `${doctorApi}/${doctorId}`;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        setLoading(true);
        const response = await fetch(api);
        if (!response.ok) throw new Error("Failed to fetch doctor data");
        const data = await response.json();

        if (data.availability && data.availability.availableDays) {
          setAvailableDays(data.availability.availableDays);

          // Select the first available day by default
          const firstDay = Object.keys(data.availability.availableDays)[0];
          setSelectedDay(firstDay);

          if (firstDay) {
            const availableSlots = data.availability.availableDays[
              firstDay
            ].map((slot) => slot.time);

            setSelectedSlots(availableSlots);
          }
        }
      } catch (err) {
        console.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctor();
  }, [api]);

  const handleDaySelection = (day) => {
    setSelectedDay(day);
    const selectedDayData = availableDays[day];

    if (selectedDayData) {
      setSelectedSlots(selectedDayData.map((slot) => slot.time));
    }
  };
  const hasAvailability = Object.keys(availableDays).length > 0;

  return (
    <Box mt={6}>
      <Backdrop
        open={loading}
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.modal + 1 }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h5" fontWeight="bold" my={2} color="#616161">
          Available Slots
        </Typography>

        <Box sx={{ display: "flex", gap: 2, alignItems: "center",mb: .5 }}>
          <Button
            variant="outlined"
            sx={{ borderRadius: "50px" }}
            onClick={() => navigate("/doctor/addSlots")}
          >
            Add Slots
          </Button>
        </Box>
      </Box>

      <Divider sx={{ mb: 2 }} />

      {!hasAvailability ? (
        <Typography
          variant="h6"
          color="error"
          textAlign="center"
          fontWeight={500}
        >
          No available slots. Please click "Add Slots" to create your booking
          schedule.
        </Typography>
      ) : (
        <Box>
          <Typography sx={{ color: "#565656" }} fontWeight={600} mt={3}>
            Selected Booking Slots
          </Typography>
          <Box
            display="flex"
            gap={2.5}
            mt={2}
            overflow="auto"
            sx={{ maxWidth: { xs: "330px", sm: "500px" } }}
          >
            {Object.keys(availableDays).map((day, index) => (
              <BookingSlot
                key={index}
                selected={selectedDay === day}
                onClick={() => handleDaySelection(day)}
              >
                <Typography>{day.slice(0, 3)}</Typography>
              </BookingSlot>
            ))}
          </Box>

          {/* Time Slots */}
          <Typography sx={{ color: "#565656" }} fontWeight={600} mt={3}>
            Available Slots for {selectedDay}
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 1,
              mt: 2,
              width: "100%",
              justifyContent: { xs: "center", sm: "start" },
            }}
          >
            {selectedSlots.length > 0 ? (
              selectedSlots.map((slot) => (
                <Button
                  key={slot}
                  variant="contained"
                  sx={{ width: "130px", backgroundColor: "#4F6EF7" }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <ArrowForward />
                    {slot}
                  </Box>
                </Button>
              ))
            ) : (
              <Typography>No Slots Available</Typography>
            )}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default AvailableSlots;
