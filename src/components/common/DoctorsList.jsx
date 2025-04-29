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
  const [allDoctors, setAllDoctors] = useState([]);
  const [visibleDoctors, setVisibleDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  const isRelated = Boolean(specialization && doctorId);
  const PAGE_SIZE = 5;

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
          : data.filter((doctor) => doctor.isAvailableStatus);

        setAllDoctors(filteredDoctors);
        setVisibleDoctors(filteredDoctors.slice(0, PAGE_SIZE));
        setCurrentIndex(PAGE_SIZE);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, [specialization, doctorId, isRelated]);

  const handleLoadMore = () => {
    const nextIndex = currentIndex + PAGE_SIZE;
    setVisibleDoctors(allDoctors.slice(0, nextIndex));
    setCurrentIndex(nextIndex);
  };

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
        {visibleDoctors.map((doctor) => (
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
            onClick={() => {
              if (isRelated) {
                navigate(`/patient/bookAppointments/${doctor.id}`);
                window.scrollTo(0, 0);
              }
            }}
          >
            <CardMedia
              component="img"
              image={doctor.selectedImage || "/placeholder.jpg"}
              alt={doctor.firstName}
              sx={{ bgcolor: "#eaefff", height: { xs: "270px", md: "215px" } , objectFit:'contain' }}
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

      {/* Load More Button */}
      {!isRelated && visibleDoctors.length < allDoctors.length && (
        <Box display="flex" justifyContent="center" mt={4}>
          <Button
            variant="contained"
            onClick={handleLoadMore}
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
      {!error && visibleDoctors.length === 0 && isRelated && (
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
