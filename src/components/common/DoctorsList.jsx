import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Backdrop,
  CircularProgress,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const doctorApi = import.meta.env.VITE_DOCTOR_API;

const DoctorsList = ({ title, specialization, doctorId }) => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const isRelated = Boolean(specialization && doctorId);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch(doctorApi);
        if (!response.ok) throw new Error("Failed to fetch doctors");
        const data = await response.json();

        const filteredDoctors = isRelated
          ? data.filter(
              (doctor) =>
                doctor.specialization.toLowerCase() ===
                  specialization.toLowerCase() && doctor.id !== doctorId
            )
          : data.filter((doctor) => doctor.isAvailableStatus).slice(0, 10);

        setDoctors(filteredDoctors);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, [specialization, doctorId, isRelated]);

  return (
    <Box sx={{ ml: { xs: 0, sm: isRelated ? 0 : 6 }, mt: { xs: 8, sm: 0 } }}>
      {/* Loader */}
      {isRelated && (
        <Backdrop
          open={loading}
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.modal + 1 }}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}

      {/* Section Title */}
      <Box textAlign="center" mb={4}>
        <Typography
          variant={isRelated ? "h4" : "h3"}
          fontWeight={600}
          sx={{ fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" } }}
        >
          {title}
        </Typography>
        <Typography
          fontSize="0.875rem"
          color="text.secondary"
          maxWidth={{ xs: "100%", sm: "80%", md: "60%", lg: "40%" }}
          mx="auto"
          mt={1}
          px={{ xs: 2, sm: 3 }}
        >
          Simply browse through our extensive list of trusted doctors.
        </Typography>
      </Box>

      {/* Doctors Grid */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          justifyContent: "flex-start",
          px: { xs: 3, sm: 0 },
          mt: 4,
        }}
      >
        {doctors.map((doctor) => (
          <Card
            key={doctor.id}
            sx={{
              width: { xs: "100%", md: "215px" },
              border: "1px solid #c9d8ff",
              borderRadius: 2,
              overflow: "hidden",
              cursor: "pointer",
              transition: "transform 0.5s",
              "&:hover": { transform: "translateY(-10px)" },
            }}
            onClick={() =>
              isRelated && navigate(`/patient/bookAppointments/${doctor.id}`)
            }
          >
            <CardMedia
              component="img"
              image={doctor.selectedImage || "/placeholder.jpg"}
              alt={doctor.firstName}
              sx={{ bgcolor: "#eaefff", height: { xs: "270px", md: "215px" } }}
            />
            <CardContent>
              <Box display="flex" alignItems="center" gap={1} color="#22c55e">
                <Box
                  width={8}
                  height={8}
                  bgcolor="#22c55e"
                  borderRadius="50%"
                />
                <Typography variant="body2">Available</Typography>
              </Box>
              <Typography variant="h6" fontWeight="medium" color="text.primary">
                {doctor.firstName} {doctor.lastName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {doctor.specialization}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* More Button */}
      {!isRelated && doctors.length > 0 && (
        <Box display="flex" justifyContent="center" mt={4}>
          <Button
            variant="contained"
            sx={{
              bgcolor: "#EFF6FF",
              color: "text.secondary",
              px: 6,
              py: 1.5,
              borderRadius: "50px",
              textTransform: "none",
              fontWeight: "600",
            }}
          >
            more
          </Button>
        </Box>
      )}

      {/* Error / Empty States */}
      {error && (
        <Typography variant="h6" textAlign="center" mt={3} color="error">
          {error}
        </Typography>
      )}
      {!error && doctors.length === 0 && isRelated && (
        <Typography
          variant="h6"
          textAlign="center"
          mt={3}
          color="text.secondary"
        >
          No related doctors found
        </Typography>
      )}
    </Box>
  );
};

export default DoctorsList;
