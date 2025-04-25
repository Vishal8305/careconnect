import React from "react";
import {
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setFormData } from "../../../redux/module/auth/signupSlice";

const Step1 = () => {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.signup.formData);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(setFormData({ [name]: value }));
  };

  const formFields = [
    {
      label: "First Name",
      name: "firstName",
      type: "text",
      placeholder: "First Name",
    },
    {
      label: "Last Name",
      name: "lastName",
      type: "text",
      placeholder: "Last Name",
    },
    { label: "DOB", name: "dob", type: "date" },
    {
      label: "Gender",
      name: "gender",
      type: "select",
      options: ["Male", "Female", "Other"],
    },
    {
      label: "Contact No.",
      name: "contactNumber",
      type: "text",
      placeholder: "Contact No.",
    },
    { label: "Email", name: "email", type: "email", placeholder: "Email" },
  ];

  return (
    <Box component="form">
      {/* Header */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems={isSmallScreen ? "flex-start" : "center"}
        // flexDirection={isSmallScreen ? "column" : "row"}
        flexDirection="row"
        gap={1}
      >
        <Typography
          sx={{ fontSize: { xs: "20px", sm: "24px" } }}
          fontWeight="medium"
        >
          Patient Signup Form
        </Typography>
        <Typography  fontWeight="medium"  sx={{ fontSize: { xs: "18px", sm: "22px" } }}>
          Step 1
        </Typography>
      </Box>

      {/* Personal Information Title */}
      <Typography
        variant="body1"
        color="primary"
        sx={{
          mt: 3,
          textDecoration: "underline",
          textAlign: isSmallScreen ? "center" : "left",
        }}
      >
        Personal Information
      </Typography>

      {/* Form Fields */}
      <Box
        sx={{
          mt: 3,
          display: "grid",
          gap: 2,
          gridTemplateColumns: { xs: "1fr", sm: "1fr", md: "1fr 1fr" },
        }}
      >
        {formFields.map(({ label, name, type, placeholder, options }) => (
          <Box key={name}>
            {type === "select" ? (
              <FormControl fullWidth>
                <InputLabel id={`${name}-label`}>{label} *</InputLabel>
                <Select
                  labelId={`${name}-label`}
                  id={`${name}-select`}
                  name={name}
                  value={formData[name] || ""}
                  onChange={handleChange}
                  label={label}
                >
                  <MenuItem value="">Select Gender</MenuItem>
                  {options.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            ) : (
              <TextField
                fullWidth
                label={label}
                name={name}
                type={type}
                value={formData[name]}
                onChange={handleChange}
                placeholder={placeholder}
                InputLabelProps={{ shrink: type === "date" ? true : undefined }}
              />
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Step1;
