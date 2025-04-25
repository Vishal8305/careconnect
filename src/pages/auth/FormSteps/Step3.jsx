import React from "react";
import {
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Typography,
  Box,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setFormData } from "../../../redux/module/auth/signupSlice";

const Step3 = () => {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.signup.formData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch(setFormData({ ...formData, [name]: value }));
  };

  const roleFields = [
    { label: "Weight (kg/lbs)", name: "weight", type: "text" },
    { label: "Height (cm/inches)", name: "height", type: "text" },
    {
      label: "Do you have any allergies?",
      name: "allergies",
      type: "select",
      options: ["Yes", "No"],
      conditionalField: "Yes",
      childField: {
        name: "allergiesDescription",
        placeholder: "Specify allergies",
      },
    },
    {
      label: "Blood Group",
      name: "bloodGroup",
      type: "select",
      options: [
        "A+",
        "A-",
        "B+",
        "B-",
        "O+",
        "O-",
        "AB+",
        "AB-",
        "Bombay Blood Group (hh)",
        "Rh-null (Golden Blood)",
      ],
    },
  ];

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h6">Patient Signup Form</Typography>
        <Typography variant="body1">Step 3</Typography>
      </Box>

      <Typography
        color="primary"
        mt={2}
        variant="subtitle1"
        sx={{ textDecoration: "underline" }}
      >
        Medical History
      </Typography>

      <Box
        mt={2}
        display="flex"
        flexWrap="wrap"
        gap={3}
        justifyContent="space-between"
      >
        {roleFields.map(
          ({ label, name, type, options, conditionalField, childField }) => (
            <Box key={name} flex="1 1 45%">
              {type === "select" ? (
                <FormControl fullWidth>
                  <InputLabel id={`${name}-label`}>{label}</InputLabel>
                  <Select
                    name={name}
                    value={formData[name] || ""}
                    onChange={handleInputChange}
                    labelId={`${name}-label`}
                    id={name}
                    label={label}
                  >
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
                  value={formData[name] || ""}
                  onChange={handleInputChange}
                  placeholder={`Enter ${label.toLowerCase()}`}
                />
              )}

              {conditionalField &&
                formData[name] === conditionalField &&
                childField && (
                  <TextField
                    fullWidth
                    margin="normal"
                    label={childField.placeholder}
                    name={childField.name}
                    value={formData[childField.name] || ""}
                    onChange={handleInputChange}
                    placeholder={childField.placeholder}
                  />
                )}
            </Box>
          )
        )}
      </Box>
    </Box>
  );
};

export default Step3;
