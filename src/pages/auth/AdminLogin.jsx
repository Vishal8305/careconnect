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
  import { useState } from "react";
  import { useNavigate } from "react-router-dom";
  import { Visibility, VisibilityOff } from "@mui/icons-material";
import ScrollToTop from "../../components/common/ScrollToTop";
  
  function AdminLogin() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("admin@example.com");
    const [password, setPassword] = useState("admin@123");
    const navigate = useNavigate();
  
    const handleLogin = () => navigate("/admin/appointmentsOverview");
  
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
      <ScrollToTop/>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 3, width: "100%", textAlign: "center" }}>
          <Typography variant="h5" fontWeight="bold" color="#5e5e5e" gutterBottom>
            <span style={{ color: "#000b6d" }}>Admin</span> Login
          </Typography>
  
          <Typography variant="body1" color="textSecondary" gutterBottom>
            Log in to manage the platform.
          </Typography>
  
          <Box sx={{ mt: 2, textAlign: "left" }}>
            <Typography variant="body2" fontWeight="bold" mb={0.5}>
              Email
            </Typography>
            <TextField
              fullWidth
              size="small"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
  
            <Typography variant="body2" fontWeight="bold" mt={2} mb={0.5}>
              Password
            </Typography>
            <TextField
              fullWidth
              size="small"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
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
        </Paper>
      </Container>
    );
  }
  
  export default AdminLogin;
  