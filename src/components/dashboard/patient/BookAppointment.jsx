import React, { useEffect, useState, useMemo } from "react";
import {
  Box,
  Typography,
  Button,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import { styled } from "@mui/system";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import dayjs from "dayjs";
import DoctorsList from "../../common/DoctorsList";
import SelectedUserOverview from "../../common/SelectedUserOverview";

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

const TimeSlot = styled(Button)(({ selected }) => ({
  fontSize: "14px",
  fontWeight: 300,
  padding: "8px 0px",
  borderRadius: "999px",
  textTransform: "none",
  minWidth: "120px",
  backgroundColor: selected ? "#4F6EF7" : "transparent",
  color: selected ? "#fff" : "#565656",
  border: selected ? "none" : "1px solid #565656",
}));

const doctorApi = import.meta.env.VITE_DOCTOR_API;
const patientApi = import.meta.env.VITE_PATIENT_API;

const BookAppointment = () => {
  const { userId } = useParams();
  const navigate = useNavigate();

  const [appointmentDate, setAppointmentDate] = useState({
    date: null,
    day: null,
  });
  const [appointmentTime, setAppointmentTime] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const patientId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchDoctorDetails = async () => {
      if (!userId) return;
      setLoading(true);

      try {
        const response = await fetch(`${doctorApi}/${userId}`);
        if (!response.ok) throw new Error("Failed to fetch doctor details");

        const doctorData = await response.json();
        setDoctor(doctorData);

        if (doctorData.availability?.availableDays) {
          const availableDays = doctorData.availability.availableDays;

          // Format available slots for each day
          const formattedSlots = Object.keys(availableDays).map((day) => ({
            day,
            slots: availableDays[day]
              .filter((slot) => slot.status === "Available")
              .map((slot) => slot.time),
          }));

          // Generate week dates
          const today = dayjs();
          const weekDates = Array.from({ length: 7 }, (_, i) => {
            const date = today.add(i, "day");
            return {
              day: date.format("dddd"),
              date: date.format("D MMMM YYYY"),
            };
          });

          // Match available slots with week dates
          const matchedSlots = weekDates
            .map((weekDay) => {
              const slot = formattedSlots.find(
                (slot) => slot.day === weekDay.day
              );
              return slot ? { ...weekDay, slots: slot.slots } : null;
            })
            .filter(Boolean);

          setAvailableSlots(matchedSlots);

          // Set the first available date
          if (matchedSlots.length > 0) {
            setAppointmentDate({
              day: matchedSlots[0].day,
              date: matchedSlots[0].date,
            });
          }
        }
      } catch (err) {
        console.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctorDetails();
  }, [userId]);

  const availableTimes = useMemo(() => {
    if (!appointmentDate) return [];

    const selectedSlot = availableSlots.find(
      (slot) => slot.day === appointmentDate.day
    );

    if (!selectedSlot) return [];

    // Get current date and time
    const now = dayjs();
    const selectedDate = dayjs(appointmentDate.date, "D MMMM YYYY");

    return selectedSlot.slots.filter((time) => {
      const slotTime = dayjs(
        `${appointmentDate.date} ${time}`,
        "D MMMM YYYY h:mm A"
      );

      // If selected date is today, filter out past time slots
      if (selectedDate.isSame(now, "day")) {
        return slotTime.isAfter(now);
      }

      return true;
    });
  }, [appointmentDate, availableSlots]);

  console.log(availableTimes, "time");

  const handleBookAppointment = async () => {
    if (!appointmentTime) {
      toast.error("Please select a time slot before booking.");
      return;
    }
    const appointmentStatus = "Booked";

    try {
      // Fetch patient details to get existing appointments
      const patientResponse = await fetch(`${patientApi}/${patientId}`);
      const patientData = await patientResponse.json();
      const patientName = `${patientData.firstName} ${patientData.lastName}`;

      // Fetch doctor details to get existing appointments & availability
      const doctorResponse = await fetch(`${doctorApi}/${userId}`);
      const doctorData = await doctorResponse.json();
      const doctorName = `${doctorData.doctorName}`;

      const patientAppointmentData = {
        doctorId: userId,
        doctorName,
        doctorProfile: doctorData.selectedImage,
        doctorSpeciality: doctorData.specialization,
        doctorExperience: doctorData.experience,
        doctorDegree: doctorData.degree,
        contactNumber: doctorData.contactNumber,
        email: doctorData.email,
        hospitalName: doctorData.hospitalName,
        appointmentDate,
        appointmentTime,
        appointmentStatus,
      };

      const doctorAppointmentData = {
        patientId,
        patientName,
        patientProfile: patientData.selectedImage,
        patientHeight: patientData.height,
        patientWeight: patientData.weight,
        patientBloodGroup: patientData.bloodGroup,
        city: patientData.city,
        state: patientData.state,
        contactNumber: patientData.contactNumber,
        email: patientData.email,
        currentAddress: patientData.currentAddress,
        appointmentDate,
        appointmentTime,
        appointmentStatus,
      };

      // Update doctor's availability: Mark the selected time slot as "Booked"
      const updatedAvailability = { ...doctorData.availability };

      if (updatedAvailability.availableDays[appointmentDate.day]) {
        updatedAvailability.availableDays[appointmentDate.day] =
          updatedAvailability.availableDays[appointmentDate.day].map((slot) =>
            slot.time === appointmentTime ? { ...slot, status: "Booked" } : slot
          );
      }

      // Append new appointment to the existing array or create a new array if empty
      const updatedPatientAppointments = [
        ...(patientData.appointments || []),
        patientAppointmentData,
      ];

      const updatedDoctorAppointments = [
        ...(doctorData.appointments || []),
        doctorAppointmentData,
      ];

      // Store appointment under patient details
      await fetch(`${patientApi}/${patientId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...patientData,
          appointments: updatedPatientAppointments,
        }),
      });

      // Store appointment under doctor details along with updated availability
      await fetch(`${doctorApi}/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...doctorData,
          appointments: updatedDoctorAppointments,
          availability: updatedAvailability, // Update availability in doctor data
        }),
      });

      toast.success("Appointment booked successfully!");
      navigate("/patient/myAppointments");
    } catch (error) {
      toast.error("Error booking appointment. Please try again.", error);
    }
  };

  return (
    <Box sx={{ mt: { xs: 7, md: 10 } }}>
      <Backdrop
        open={loading}
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.modal + 1 }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <SelectedUserOverview user={doctor} role={'doctor'}/>

      <Box
        sx={{ ml: { xs: 0, md: 36 } }}
        pl={{ sm: 4 }}
        mt={4}
        fontWeight={500}
        color="text.secondary"
      >
        <Typography sx={{ color: "#565656" }} fontWeight={600}>
          Booking Slots
        </Typography>

        <Box
          display="flex"
          mt={2}
          sx={{
            maxWidth: { xs: "320px", md: "900px" },
            overflowX: "auto",
            gap: { xs: 1.5, md: 3 },
          }}
        >
          {availableSlots.length > 0 ? (
            availableSlots.map((item, index) => (
              <BookingSlot
                key={index}
                selected={appointmentDate?.day === item.day}
                onClick={() =>
                  setAppointmentDate({ date: item.date, day: item.day })
                }
              >
                <Typography>{item.day.slice(0, 3)}</Typography>
                <Typography>
                  {new Date(item.date).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                  })}
                </Typography>
              </BookingSlot>
            ))
          ) : (
            <Typography variant="body1" color="grey.700">
              No available slots
            </Typography>
          )}
        </Box>
        <Box
          display="flex"
          overflow="auto"
          sx={{
            maxWidth: { xs: "320px", md: "900px" },
            py: 3,
            gap: { xs: 1, md: 3 },
          }}
        >
          {availableTimes.map((time, index) => (
            <TimeSlot
              key={index}
              selected={appointmentTime === time}
              onClick={() => setAppointmentTime(time)}
            >
              {time}
            </TimeSlot>
          ))}
        </Box>

        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            variant="outlined"
            sx={{ mt: 2, px: 2, py: 1.5, borderRadius: "999px" }}
            onClick={() => navigate("/patient/availableDoctors")}
          >
            Back
          </Button>
          <Button
            variant="contained"
            sx={{
              mt: 2,
              px: 2,
              py: 1.5,
              borderRadius: "999px",
              backgroundColor: "#4F6EF7",
            }}
            onClick={handleBookAppointment}
          >
            Book an appointment
          </Button>
        </Box>
      </Box>

      <Box sx={{ mt: 3 }}>
        <DoctorsList
          specialization={doctor?.specialization}
          doctorId={doctor?.id}
          title={"Related Doctors"}
        />
      </Box>
    </Box>
  );
};

export default BookAppointment;
