import React, { useState } from "react";
import {
  Button,
  Box,
  Typography,
  Divider,
  IconButton,
  RadioGroup,
  Radio,
  FormControlLabel,
  Checkbox,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { styled } from "@mui/system";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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

const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const timeSlots = [
  "9:00 AM",
  "9:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "5:00 PM",
  "5:30 PM",
  "6:00 PM",
  "6:30 PM",
  "7:00 PM",
  "7:30 PM",
  "8:00 PM",
  "8:30 PM",
  "9:00 PM",
];

const doctorApi = import.meta.env.VITE_DOCTOR_API;

const AddSlots = () => {
  const [selectionMode, setSelectionMode] = useState("manual");
  const [selectedWeekdays, setSelectedWeekdays] = useState([]);
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [isAllSelected, setIsAllSelected] = useState(false);
  const [loading, setLoading] = useState(false);
  const doctorId = localStorage.getItem("userId");
  const navigate = useNavigate();
  const api = `${doctorApi}/${doctorId}`;

  const handleSelectionModeChange = (mode) => {
    setSelectionMode(mode);
    if (mode === "auto") {
      setSelectedWeekdays([1, 2, 3, 4, 5]); // Monday to Friday
      setSelectedSlots([...timeSlots]); // Select all time slots
      setIsAllSelected(true);
    } else {
      setSelectedWeekdays([]);
      setSelectedSlots([]);
      setIsAllSelected(false);
    }
  };

  const handleWeekdayChange = (dayIndex) => {
    setSelectedWeekdays((prev) =>
      prev.includes(dayIndex)
        ? prev.filter((day) => day !== dayIndex)
        : [...prev, dayIndex]
    );
  };

  const toggleSlotSelection = (slot) => {
    if (selectedWeekdays.length === 0) {
      toast.error(
        "Please select at least one day before choosing a time slot."
      );
      return;
    }
    setSelectedSlots((prev) =>
      prev.includes(slot) ? prev.filter((s) => s !== slot) : [...prev, slot]
    );
  };

  const handleSelectAllSlots = () => {
    if (selectedWeekdays.length === 0) {
      toast.error(
        "Please select at least one day before selecting all time slots."
      );
      return;
    }
    setSelectedSlots(isAllSelected ? [] : [...timeSlots]);
    setIsAllSelected(!isAllSelected);
  };

  const handleConfirmSlots = async () => {
    if (selectedWeekdays.length === 0 || selectedSlots.length === 0) {
      toast.error("Please select at least one weekday and one slot.");
      return;
    }

    setLoading(true);

    const availabilityData = {
      mode: selectionMode,
      availableDays: selectedWeekdays.reduce((acc, dayIndex) => {
        const dayName = weekdays[dayIndex];
        acc[dayName] = selectedSlots.map((time) => ({
          time,
           status: "Available"
        }));
        return acc;
      }, {}),
    };

    try {
      const response = await fetch(api, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ availability: availabilityData }),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success(result.message || "Availability updated successfully!");
        navigate("/doctor/availableSlots");
      } else {
        throw new Error(result.error || "Failed to update availability.");
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ mt: 8 }}>
      <Backdrop
        open={loading}
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.modal + 1 }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box display="flex" alignItems="center" gap={2} mb={2}>
          <IconButton onClick={() => navigate("/doctor/availableSlots")}>
            <ArrowBack />
          </IconButton>
          <Typography variant="h5" fontWeight="bold" color="#424242">
            Add Slots
          </Typography>
        </Box>
        
          <RadioGroup
            row
            value={selectionMode}
            onChange={(e) => handleSelectionModeChange(e.target.value)}
          >
            <FormControlLabel value="auto" control={<Radio />} label="Auto Select" />
            <FormControlLabel
              value="manual"
              control={<Radio />}
              label="Manual"
            />
          </RadioGroup>
      </Box>
      <Divider sx={{ mb: 2 }} />

      <Typography sx={{ color: "#565656" }} fontWeight={600} mt={3}>
        Select Booking Slots
      </Typography>
      <Box display="flex" gap={3} mt={2} overflow="auto">
        {weekdays.map((day, index) => (
          <BookingSlot
            key={index}
            selected={selectedWeekdays.includes(index)}
            onClick={() => handleWeekdayChange(index)}
          >
            <Typography>{day.slice(0, 3)}</Typography>
          </BookingSlot>
        ))}
      </Box>

      <Box sx={{ display: "flex", gap: 2 }} mt={4} alignItems="center">
        <Typography sx={{ color: "#565656" }} fontWeight={600}>
          Select Time Slots
        </Typography>
        <FormControlLabel
          control={
            <Checkbox checked={isAllSelected} onChange={handleSelectAllSlots} />
          }
          label="Select All"
        />
      </Box>

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 2 }}>
        {timeSlots.map((slot) => (
          <Button
            key={slot}
            variant="outlined"
            onClick={() => toggleSlotSelection(slot)}
            sx={{
              minWidth: "120px",
              backgroundColor: selectedSlots.includes(slot)
                ? "#4F6EF7"
                : "transparent",
              color: selectedSlots.includes(slot) ? "#fff" : "#565656",
              border: `1px solid ${
                selectedSlots.includes(slot) ? "#4F6EF7" : "#565656"
              }`,
            }}
          >
            {slot}
          </Button>
        ))}
      </Box>

      <Button
        variant="contained"
        sx={{ mt: 4 }}
        onClick={handleConfirmSlots}
        disabled={selectedWeekdays.length === 0 || selectedSlots.length === 0}
      >
        Confirm Slots
      </Button>
    </Box>
  );
};

export default AddSlots;
