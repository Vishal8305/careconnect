import React, { useEffect, useState } from "react";
import {
  TextField,
  Checkbox,
  FormControlLabel,
  Typography,
  Grid,
  Box,
  MenuItem,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setFormData } from "../../../redux/module/auth/signupSlice";
import citiesData from "../../../data/cities.json";

const Step2 = () => {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.signup.formData);
  const [states, setStates] = useState([]);
  const [filteredCities, setFilteredCities] = useState([]);
  const [isCustomState, setIsCustomState] = useState(false);
  const [isCustomCity, setIsCustomCity] = useState(false);

  useEffect(() => {
    const indianStates = [
      ...new Set(
        citiesData
          .filter((c) => c.country_name === "India")
          .map((c) => c.state_name)
      ),
    ];
    setStates(indianStates);
  }, []);

  const handleStateChange = (e) => {
    const selectedState = e.target.value;
    const isOther = selectedState === "Other";
    setIsCustomState(isOther);
    setIsCustomCity(isOther);
    setFilteredCities([]);
    dispatch(setFormData({ state: isOther ? "" : selectedState, city: "" }));
  };

  const handleCityChange = (e) => {
    const selectedCity = e.target.value;
    const isOther = selectedCity === "Other";
    setIsCustomCity(isOther);
    dispatch(setFormData({ city: isOther ? "" : selectedCity }));
  };

  useEffect(() => {
    if (formData.state && !isCustomState) {
      const relatedCities = citiesData
        .filter(
          (c) => c.state_name === formData.state && c.country_name === "India"
        )
        .map((c) => c.name);
      setFilteredCities(relatedCities);
    }
  }, [formData.state, isCustomState]);

  return (
<Box component="form" sx={{ width: "100%" }}>
  <Box display="flex" justifyContent="space-between" alignItems="center">
    <Typography variant="h5" fontWeight="medium">
      Patient Signup Form
    </Typography>
    <Typography variant="h6" fontWeight="medium">
      Step 2
    </Typography>
  </Box>

  <Typography
    variant="body1"
    color="primary"
    sx={{ mt: 2, textDecoration: "underline" }}
  >
    Address & Contact Details
  </Typography>

  <Box display="flex" flexWrap="wrap" gap={2} mt={1}>
    <Box flex={1} minWidth="300px">
      {isCustomState ? (
        <TextField
          fullWidth
          label="Enter State"
          placeholder="Enter your state"
          variant="outlined"
          value={formData.state}
          onChange={(e) => dispatch(setFormData({ state: e.target.value }))}
        />
      ) : (
        <TextField
          select
          fullWidth
          label="State"
          placeholder="Select your state"
          variant="outlined"
          value={formData.state}
          onChange={handleStateChange}
        >
          {states.map((state, index) => (
            <MenuItem key={index} value={state}>
              {state}
            </MenuItem>
          ))}
          <MenuItem value="Other">Other</MenuItem>
        </TextField>
      )}
    </Box>

    <Box flex={1} minWidth="300px">
      {isCustomCity ? (
        <TextField
          fullWidth
          label="Enter City"
          placeholder="Enter your city"
          variant="outlined"
          value={formData.city}
          onChange={(e) => dispatch(setFormData({ city: e.target.value }))}
        />
      ) : (
        <TextField
          select
          fullWidth
          label="City"
          placeholder="Select your city"
          variant="outlined"
          value={formData.city}
          onChange={handleCityChange}
          disabled={!formData.state}
        >
          {filteredCities.length > 0 ? (
            filteredCities.map((city, index) => (
              <MenuItem key={index} value={city}>
                {city}
              </MenuItem>
            ))
          ) : (
            <MenuItem disabled>Select a state first</MenuItem>
          )}
          <MenuItem value="Other">Other</MenuItem>
        </TextField>
      )}
    </Box>
  </Box>

  <Box display="flex" flexWrap="wrap" gap={2} mt={1}>
    <Box flex={1} minWidth="300px">
      <TextField
        fullWidth
        label="Zip Code"
        placeholder="Enter your zip code"
        variant="outlined"
        value={formData.zipCode}
        onChange={(e) => dispatch(setFormData({ zipCode: e.target.value }))}
      />
    </Box>

    <Box flex={1} minWidth="300px">
      <TextField
        fullWidth
        label="Emergency Contact"
        placeholder="Enter emergency contact number"
        variant="outlined"
        value={formData.emergencyContact}
        onChange={(e) =>
          dispatch(setFormData({ emergencyContact: e.target.value }))
        }
      />
    </Box>
  </Box>

  <Box display="flex" flexWrap="wrap" gap={2} mt={1}>
    <Box flex={1} minWidth="300px">
      <TextField
        fullWidth
        label="Current Address"
        placeholder="Enter your current address"
        variant="outlined"
        multiline
        rows={2}
        value={formData.currentAddress}
        onChange={(e) =>
          dispatch(setFormData({ currentAddress: e.target.value }))
        }
      />
    </Box>

    <Box flex={1} minWidth="300px">
      <TextField
        fullWidth
        label="Permanent Address"
        placeholder="Enter your permanent address"
        variant="outlined"
        multiline
        rows={2}
        value={formData.permanentAddress}
        onChange={(e) =>
          dispatch(setFormData({ permanentAddress: e.target.value }))
        }
        disabled={formData.isPermanentSame}
      />
    </Box>
  </Box>

  <Box mt={2}>
    <FormControlLabel
      control={
        <Checkbox
          checked={formData.isPermanentSame}
          onChange={(e) => {
            const isChecked = e.target.checked;
            dispatch(
              setFormData({
                isPermanentSame: isChecked,
                permanentAddress: isChecked ? formData.currentAddress : "",
              })
            );
          }}
        />
      }
      label="This is your permanent address"
    />
  </Box>
</Box>

  );
};

export default Step2;
