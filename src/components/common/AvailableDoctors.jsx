import React, { useEffect, useState } from "react";
import {
  Backdrop,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Typography,
  CircularProgress,
  Stack,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import SpecialityMenu from "./SpecialityMenu";

const Specialties = [
  "General Physician",
  "Gynecologist",
  "Dermatologist",
  "Pediatricians",
  "Neurologist",
  "Gastroenterologist",
];

const doctorApi = import.meta.env.VITE_DOCTOR_API;

const AvailableDoctors = () => {
  const [selectedSpecialty, setSelectedSpecialty] = useState('All Doctors');
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch(doctorApi);
        if (!response.ok) throw new Error("Failed to fetch doctors");

        const data = await response.json();
        const availableDoctors = data.filter(
          (doc) => doc.isAvailableStatus === true
        );
        setDoctors(availableDoctors);
        setFilteredDoctors(availableDoctors);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  useEffect(() => {
    if (selectedSpecialty === 'All Doctors' || selectedSpecialty === null) {
      setFilteredDoctors(doctors);
    } else {
      setFilteredDoctors(
        doctors.filter((doc) => doc.specialization === selectedSpecialty)
      );
    }
  }, [selectedSpecialty, doctors]);
  

  return (
    <Box sx={{ mt: 10 }}>
      <Backdrop
        open={loading}
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.modal + 1 }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <Typography variant="h5" fontWeight="bold" mb={2} color="#616161">
        Available Doctors
      </Typography>
      <Divider />
      <Typography variant="body1" color="text.secondary" mt={2}>
        Browse through the doctors specialist
      </Typography>
      {/* Specialties List */}
      <Stack sx={{ alignItems: { xs: "center", sm: "start" } }}>
        <SpecialityMenu
          onSelectSpeciality={(specialty) =>
            setSelectedSpecialty(specialty)
          }
        />
      </Stack>

      <Box
        display="flex"
        flexDirection={{ xs: "column", sm: "row" }}
        gap={2}
        mt={3}
      >
        {/* Doctors Grid */}
        <Box
          sx={{
            width: "100%",
            gap: "20px",
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          {error ? (
            <Typography color="error">{error}</Typography>
          ) : filteredDoctors.length === 0 ? (
            <Typography variant="h6" color="text.secondary" sx={{ mt: 2 }}>
              No doctors available
            </Typography>
          ) : (
            filteredDoctors.map((item, index) => (
              <Card
                sx={{
                  width: { xs: "100%", sm: "215px" },
                  border: "1px solid #c9d8ff",
                  borderRadius: 2,
                  overflow: "hidden",
                  cursor: "pointer",
                  transition: "transform 0.5s",
                  "&:hover": { transform: "translateY(-10px)" },
                }}
                key={index}
                onClick={() => navigate(`/patient/bookAppointments/${item.id}`)}
              >
                <CardMedia
                  component="img"
                  image={item.selectedImage}
                  alt=""
                  sx={{
                    bgcolor: "#eaefff",
                    height: { xs: "300px", sm: "218px" },
                    width: "100%",
                    objectFit: "contain",
                  }}
                />
                <CardContent>
                  <Box
                    display="flex"
                    alignItems="center"
                    gap={1}
                    textAlign="center"
                    color="#22c55e"
                  >
                    <Box
                      width={8}
                      height={8}
                      bgcolor="#22c55e"
                      borderRadius="50%"
                    />
                    <Typography variant="body2">Available</Typography>
                  </Box>
                  <Typography
                    variant="h6"
                    fontWeight="medium"
                    color="text.primary"
                  >
                    {item.doctorName} 
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.specialization}
                  </Typography>
                </CardContent>
              </Card>
            ))
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default AvailableDoctors;
