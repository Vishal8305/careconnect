import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearFormData,
  submitDoctor,
  setFormData
} from "../../../redux/module/auth/addDoctorSlice";
import {
  Avatar,
  Typography,
  TextField,
  MenuItem,
  Grid,
  Box,
  Button,
  FormControlLabel,
  Checkbox,
  Divider,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import UploadImage from "../../../assets/UploadImage.svg";
import { toast } from "react-toastify";
import axios from "axios";

const specializations = [
  "General physician",
  "Gynecologist",
  "Dermatologist",
  "Pediatricians",
  "Neurologist",
  "Gastroenterologist",
];

const degreeOptions = [
  "MBBS",
  "MD General Medicine",
  "MD Gynecology",
  "MD Dermatology",
  "MD Pediatrics",
  "DM Neurology",
  "MCh Neurosurgery",
  "MD Gastroenterology",
];

const feesOptions = ["₹200", "₹300", "₹500", "₹600", "₹700", "₹1000"];
const experience = Array.from({ length: 12 }, (_, i) => `${i + 1} Years`);

const AddDoctor = () => {
  const formData = useSelector((state) => state.AddDoctor.formData);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [sameAddress, setSameAddress] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleTermsChange = (event) => {
    const checked = event.target.checked;
    setAgreeToTerms(checked);
    dispatch(setFormData({ agreeToTerms: checked ? "Yes" : "No" }));
  };

  const formFields = [
    {
      label: "Doctor Name",
      name: "doctorName",
      type: "text",
      placeholder: "Enter your name",
    },
    {
      label: "UserName",
      name: "username",
      type: "text",
      placeholder: "Enter username"
    },
    {
      label: "Gender",
      name: "gender",
      type: "select",
      options: ["Male", "Female", "Other"],
    },
    { label: "DOB", name: "dob", type: "date" },
    {
      label: "Email",
      name: "email",
      type: "email",
      placeholder: "Enter your email",
    },
    {
      label: "Contact",
      name: "contactNumber",
      type: "text",
      placeholder: "Enter your contact number",
    },
    {
      label: "City",
      name: "city",
      type: "text",
      placeholder: "Enter your city",
    },
    {
      label: "State",
      name: "state",
      type: "text",
      placeholder: "Enter your state",
    },
    {
      label: "Current Address",
      name: "currentAddress",
      type: "text",
      placeholder: "Enter current address",
    },
    {
      label: "Permanent Address",
      name: "permanentAddress",
      type: "text",
      placeholder: "Enter permanent address",
    },
    {
      label: "Set Password",
      name: "password",
      type: "password",
      placeholder: "Set your password",
    },
    { label: "Degree", name: "degree", type: "select", options: degreeOptions },
    {
      label: "Specialization",
      name: "specialization",
      type: "select",
      options: specializations,
    },
    {
      label: "Experience (Years)",
      name: "experience",
      type: "select",
      options: experience,
    },
    {
      label: "License Number",
      name: "licenseNo",
      type: "text",
      placeholder: "Enter license number",
    },
    {
      label: "Consultation Fees",
      name: "consultationFees",
      type: "select",
      options: feesOptions,
    },
  ];

  const handleChange = (event) => {
    const { name, value } = event.target;
    const updated = {
      [name]: value,
      ...(sameAddress && name === "currentAddress"
        ? { permanentAddress: value }
        : {}),
    };
    dispatch(setFormData(updated));
  };

  const handleCheckboxChange = (event) => {
    const checked = event.target.checked;
    setSameAddress(checked);
    dispatch(
      setFormData({
        permanentAddress: checked ? formData.currentAddress : "",
      })
    );
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    setLoading(true);
    if (file) {
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
      } finally{
        setLoading(false);
      }
    }
  };

  const handleSubmit = async () => {
    try {
      const dataToSubmit = {
        ...formData,
        isAvailableStatus: true,
        totalPatient: 0,
      };

      setLoading(true);
      await dispatch(submitDoctor(dataToSubmit)).unwrap();
      toast.success("Doctor added successfully!");
      dispatch(clearFormData());
      navigate("/admin/doctorsLists");
    } catch (error) {
      toast.error(`Failed to add doctor: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box mt={8}>
    <Backdrop
      open={loading}
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.modal + 1 }}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  
    <Box sx={{ display: "flex", alignItems: "center", mb: 2, gap: 1.5 }}>
      <Button
        onClick={() => navigate("/admin/doctorsLists")}
        startIcon={<ArrowBackIcon />}
        sx={{
          minWidth: "auto",
          padding: 1,
          borderRadius: "50%",
          color: "#616161",
        }}
      />
      <Typography variant="h5" fontWeight="bold" color="#616161">
        Add Doctor
      </Typography>
    </Box>
  
    <Divider />
  
    <Box sx={{ padding: "20px", width: "100%" }}>
      {/* Image Upload Section */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mb: 2,
          mt: 2,
          gap: 2,
          flexDirection: { xs: "column", sm: "row" },
        }}
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
            src={formData.selectedImage || UploadImage}
            sx={{
              width: 120,
              height: 120,
              cursor: "pointer",
              border: "2px solid #ccc",
            }}
          />
        </label>
        <Typography
          variant="caption"
          color="#6b7280"
          fontSize={20}
          textAlign={{ xs: "center", sm: "left" }}
        >
          Upload Doctor <br /> Picture
        </Typography>
      </Box>
  
      {/* Input Fields Section */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
          justifyContent: "flex-start",
        }}
      >
        {formFields.map((field, index) => (
          <Box
            key={index}
            sx={{
              flex: "1 1 100%",
              maxWidth: {
                xs: "100%",
                sm: "48%",
                md: "31%",
                lg: "23%",
              },
            }}
          >
            {field.type === "select" ? (
              <TextField
                select
                fullWidth
                label={field.label}
                name={field.name}
                value={formData[field.name] || ""}
                onChange={handleChange}
              >
                {field.options.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            ) : (
              <TextField
                fullWidth
                label={field.label}
                name={field.name}
                type={field.type}
                value={formData[field.name] || ""}
                onChange={handleChange}
                disabled={sameAddress && field.name === "permanentAddress"}
                placeholder={field.placeholder}
                InputLabelProps={
                  field.type === "date" ? { shrink: true } : {}
                }
              />
            )}
            {field.name === "currentAddress" && (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={sameAddress}
                    onChange={handleCheckboxChange}
                  />
                }
                label="This is your permanent address"
                sx={{
                  "& .MuiTypography-root": {
                    fontSize: "0.85rem",
                    whiteSpace: "nowrap",
                  },
                }}
              />
            )}
          </Box>
        ))}
      </Box>
  
      {/* Submit Section */}
      <Box
        mt={3}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          width: "fit-content",
        }}
      >
        <FormControlLabel
          control={
            <Checkbox checked={agreeToTerms} onChange={handleTermsChange} />
          }
          label="I agree to the Terms and Conditions"
        />
        <Button
          variant="contained"
          color="primary"
          disabled={!agreeToTerms}
          sx={{ width: "fit-content" }}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Box>
    </Box>
  </Box>
  
  
  );
};

export default AddDoctor;
