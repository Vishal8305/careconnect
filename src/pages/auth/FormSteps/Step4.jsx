import React, { useState } from "react";
import {
  Box,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
  Avatar,
  CircularProgress,
  Backdrop,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setFormData } from "../../../redux/module/auth/signupSlice";
import axios from "axios";

const Step4 = () => {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.signup.formData);
  const [passwordError, setPasswordError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    dispatch(setFormData({ [name]: type === "checkbox" ? checked : value }));

    if (name === "confirmPassword") {
      if (value === "") {
        setPasswordError(false);
      } else {
        setPasswordError(formData.password !== value);
      }
    }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];

    if (file) {
      setLoading(true);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", import.meta.env.VITE_UPLOAD_PRESET);

      try {
        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/${
            import.meta.env.VITE_CLOUD_NAME
          }/image/upload`,
          formData
        );

        const imageUrl = response.data.secure_url;
        dispatch(setFormData({ selectedImage: imageUrl }));
      } catch (error) {
        console.error("Cloudinary Upload Error:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      <Backdrop
        open={loading}
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.modal + 1 }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <Box component="form" sx={{ width: "100%" }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Patient Signup Form</Typography>
          <Typography variant="subtitle1">Step 4</Typography>
        </Box>

        <Typography color="primary" sx={{ mt: 2, textDecoration: "underline" }}>
          Create Account
        </Typography>

        <Box
          display="flex"
          flexDirection={{ xs: "column", md: "row" }}
          alignItems="flex-start"
          justifyContent="space-between"
          mt={4}
        >
          {/* Profile Image Section */}
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mb={{ xs: 4, md: 0 }}
            sx={{ width: { xs: "100%", md: "30%" } }}
          >
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: "none" }}
              id="upload-image"
            />
            <label htmlFor="upload-image">
              <Avatar
                src={
                  formData.selectedImage || "https://via.placeholder.com/150"
                }
                sx={{
                  width: 120,
                  height: 120,
                  cursor: "pointer",
                  mb: 1,
                  border: "2px solid #ccc",
                }}
              />
            </label>
            <Typography variant="caption" color="gray">
              Click to upload profile picture
            </Typography>
          </Box>

          {/* Form Fields */}
          <Box sx={{ width: { xs: "100%", md: "65%" } }}>
            <TextField
              fullWidth
              required
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              required
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              required
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={passwordError}
              helperText={passwordError ? "Passwords do not match" : ""}
              sx={{ mb: 2 }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                />
              }
              label="Agree to Terms & Conditions *"
            />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Step4;
