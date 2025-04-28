import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { toast } from "react-toastify";

const doctorApi = import.meta.env.VITE_DOCTOR_API;
const patientApi = import.meta.env.VITE_PATIENT_API;

const LoginPage = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("patient");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const storedRole = localStorage.getItem("userRole") || "patient";
    setRole(storedRole);
  }, []);

  const handleLogin = async () => {
    const { username, password } = form;
    if (!username || !password) {
      toast.error("Username and password are required.");
      return;
    }

    const apiUrl = role === "patient" ? patientApi : doctorApi;

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) throw new Error("Failed to fetch user data");

      const users = await response.json();
      console.log(users,'data')
      const user = users.find((u) => u.username === username)

      if (!user) {
        toast.error("Username not found.");
        return;
      }

      if (user.password !== password) {
        toast.error("Incorrect password.");
        return;
      }

      // Save userId and role info in localStorage
      localStorage.setItem("userId", user.id);

      if (role === "doctor") {
        const { isAvailableStatus } = user;
        localStorage.setItem(
          "isAvailableStatus",
          JSON.stringify(isAvailableStatus)
        );

        if (!isAvailableStatus) {
          navigate("/doctor/myAppointments");
          return;
        }
      }

      // Final successful login navigation
      const dashboardPath =
        role === "patient"
          ? "/patient/availableDoctors"
          : "/doctor/myAppointments";
      navigate(dashboardPath);
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: { xs: "70vh", sm: "85vh" },
      }}
    >
      <Paper
        elevation={3}
        sx={{ p: 4, borderRadius: 3, width: "100%", textAlign: "center" }}
      >
        <Typography variant="h5" fontWeight="bold" color="#5e5e5e" gutterBottom>
          <span style={{ color: "#000b6d", textTransform: "capitalize" }}>
            {role}
          </span>{" "}
          Login
        </Typography>

        <Typography variant="body1" color="textSecondary" gutterBottom>
          {role === "doctor"
            ? "Log in to manage patient appointments."
            : "Log in to book appointments with doctors."}
        </Typography>

        <Box component="form" sx={{ mt: 2, textAlign: "left" }}>
          <Typography variant="body2" fontWeight="bold" sx={{ mb: 0.5 }}>
            Username
          </Typography>
          <TextField
            fullWidth
            name="username"
            variant="outlined"
            margin="dense"
            size="small"
            value={form.username}
            onChange={handleChange}
          />

          <Typography variant="body2" fontWeight="bold" sx={{ mt: 2, mb: 0.5 }}>
            Password
          </Typography>
          <TextField
            fullWidth
            name="password"
            type={showPassword ? "text" : "password"}
            variant="outlined"
            margin="dense"
            size="small"
            value={form.password}
            onChange={handleChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword((prev) => !prev)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              bgcolor: "#4F6EF7",
              color: "white",
              fontWeight: "bold",
              "&:hover": { bgcolor: "#4F6EF7" },
            }}
            onClick={handleLogin}
          >
            Login
          </Button>
        </Box>

        {role === "patient" && (
          <Typography variant="body2" sx={{ mt: 2 }} color="textSecondary">
            Create a new account?{" "}
            <Button
              onClick={() => navigate("/register")}
              sx={{
                p: 0,
                minWidth: "auto",
                textTransform: "none",
                fontWeight: "bold",
                color: "#4F6EF7",
                "&:hover": {
                  backgroundColor: "transparent",
                  textDecoration: "underline",
                },
              }}
            >
              Signup
            </Button>
          </Typography>
        )}
      </Paper>
    </Container>
  );
};

export default LoginPage;
