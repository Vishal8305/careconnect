import React, { useEffect, useState } from "react";
import {
  Backdrop,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Checkbox,
  CircularProgress,
  Divider,
  FormControl,
  FormControlLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Typography,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

const doctorApi = import.meta.env.VITE_DOCTOR_API;
const patientApi = import.meta.env.VITE_PATIENT_API;

const UsersList = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("true");
  const [error, setError] = useState(null);
  const location = useLocation();

  const role = location.pathname.includes("doctorsLists")
    ? "doctor"
    : "patient";

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const apiUrl = role === "doctor" ? doctorApi : patientApi;
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error("Failed to fetch users");

        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [role]);

  const filteredUsers = users?.filter(
    (item) => String(item?.isAvailableStatus) === filterStatus
  );
  

  return (
    <Box sx={{ mt: 7 }}>
      <Backdrop
        open={loading}
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.modal + 1 }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mt={10}
        pb={3}
      >
        <Typography variant="h5" fontWeight="bold" color="grey.700">
          {role === "doctor" ? "All Doctors" : "All Patients"}
        </Typography>

        
          <FormControl
            variant="standard"
            sx={{
              width: { xs: 90, sm: 160 },
              flexShrink: 0,
            }}
          >
            <Select
              label="Filter"
              sx={{
                fontSize: { xs: "0.9rem", sm: "1rem" },
              }}
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <MenuItem value="true">Available</MenuItem>
              <MenuItem value="false">Unavailable</MenuItem>
            </Select>
          </FormControl>
        
      </Box>

      {error && (
        <Typography
          variant="body1"
          color="error"
          sx={{ mt: 3, textAlign: "center" }}
        >
          {error}
        </Typography>
      )}
      <Divider />

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          justifyContent: "center",
          px: { xs: 2, sm: 0 },
          mt: 3,
        }}
      >
        {filteredUsers?.map((item, index) => (
          <Card
            key={index}
            sx={{
              width: "220px",
              border: "1px solid #c9d8ff",
              borderRadius: 2,
              overflow: "hidden",
              transition: "transform 0.3s, box-shadow 0.3s",
              "&:hover": {
                transform: "translateY(-5px)",
                boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.2)",
              },
            }}
          >
            <CardMedia
              component="img"
              image={item.selectedImage || "/default-user.png"}
              alt={role === "doctor" ? item.doctorName : item.firstName}
              sx={{
                bgcolor: "#eaefff",
                height: "220px",
                width: "100%",
                objectFit: "cover",
              }}
            />
            <CardContent sx={{ textAlign: "left", paddingBottom: "16px" }}>
              {role === "doctor" ? (
                <>
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    color="text.primary"
                  >
                    Dr. {item.doctorName}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 1 }}
                  >
                    {item.specialization}
                  </Typography>
                  <Box display="flex" alignItems="center">
                    <Checkbox
                      checked={item.isAvailableStatus === true}
                      sx={{
                        padding: 0,
                        mr: 1,
                        color: "#0075ff",
                        "&.Mui-checked": {
                          color: "#0075ff",
                          backgroundColor: "white",
                        },
                        "&.Mui-checked .MuiSvgIcon-root": {
                          color: "#0075ff",
                        },
                      }}
                    />
                    <Typography variant="body2">
                      {item.isAvailableStatus ? "Available" : "Unavailable"}
                    </Typography>
                  </Box>
                </>
              ) : (
                <>
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    color="text.primary"
                  >
                    {item.firstName} {item.lastName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Gender: {item.gender}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    City: {item.city}
                  </Typography>
                </>
              )}
              <Button
                variant="outlined"
                fullWidth
                sx={{ mt: 2 }}
                onClick={() =>
                  navigate(`/admin/manageUser/${item.id}`, {
                    state: { role },
                  })
                }
              >
                See More
              </Button>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default UsersList;
