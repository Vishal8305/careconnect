import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Divider,
  Grid,
  Avatar,
  TextField,
  Select,
  MenuItem,
  FormControl,
  Backdrop,
  CircularProgress,
  InputLabel,
  Stack,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProfileData,
  setFormData,
  setLoading,
  setRole,
  setUuId,
  updateProfileData,
} from "../../redux/module/userProfile/profileSlice";
import axios from "axios";

const UserProfile = () => {
  const [isEdit, setIsEdit] = useState(false);
  const dispatch = useDispatch();
  const {
    role,
    uuId,
    profileData,
    specialityData,
    degreeOptions,
    experienceOptions,
    feesOptions,
    loading,
  } = useSelector((state) => state.profile);
  const formData = useSelector((state) => state.profile.formData);

  useEffect(() => {
    const storedRole = localStorage.getItem("userRole");
    const storedId = localStorage.getItem("userId");

    if (storedRole) dispatch(setRole(storedRole));
    if (storedId) dispatch(setUuId(storedId));
  }, [dispatch]);

  useEffect(() => {
    if (role && uuId) {
      dispatch(fetchProfileData());
    }
  }, [role, uuId, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "allergies" && value === "No") {
      dispatch(
        setFormData({ ...formData, allergies: value, allergiesDescription: null })
      );
    } else {
      dispatch(setFormData({ ...formData, [name]: value }));
    }
  };

  const handleImageChange = async (event) => {
    const file = event.target.files[0];

    if (file) {
      dispatch(setLoading(true));
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", import.meta.env.VITE_UPLOAD_PRESET); // Cloudinary Upload Preset

      try {
        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/${
            import.meta.env.VITE_CLOUD_NAME
          }/image/upload`,
          formData
        );

        const imageUrl = response.data.secure_url; // Get Cloudinary URL
        dispatch(setFormData({ selectedImage: imageUrl }));
      } catch (error) {
        console.error("Cloudinary Upload Error:", error);
      } finally {
        dispatch(setLoading(false));
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProfileData(formData));
    setIsEdit(false);
  };

  return (
    <Box mt={8}>
      <Backdrop
        open={loading}
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.modal + 1 }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box display="flex" flexDirection="column" gap={1}>
        <Box display="flex" flexDirection="column">
          <Box sx={{ display: "flex", gap: "10px" }}>
            {isEdit ? (
              <Box display="flex" alignItems="center" gap={2}>
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  id="upload-image"
                  onChange={handleImageChange}
                />
                <label htmlFor="upload-image">
                  <Avatar
                    src={formData.selectedImage}
                    sx={{
                      width: 144,
                      height: 144,
                      borderRadius: 2,
                      cursor: "pointer",
                      border: "2px solid #ccc",
                    }}
                  />
                </label>
                <Typography variant="caption" color="#6b7280" fontSize={20}>
                  Upload Picture
                </Typography>
              </Box>
            ) : (
              <Avatar
                src={profileData?.selectedImage}
                alt={profileData?.firstName}
                sx={{ width: 144, height: 144, borderRadius: 2 }}
              />
            )}
          </Box>

          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            {isEdit ? (
              <Box sx={{ display: "flex" }}>
                {role === "patient" ? (
                  <>
                    <TextField
                      name="firstName"
                      label="First Name"
                      value={formData.firstName}
                      variant="outlined"
                      size="small"
                      fullWidth
                      sx={{ width: "fit-content", marginTop: "18px" }}
                      onChange={handleChange}
                    />
                    <TextField
                      name="lastName"
                      label="Last Name"
                      value={formData.lastName}
                      variant="outlined"
                      size="small"
                      fullWidth
                      sx={{
                        width: "fit-content",
                        marginTop: "18px",
                        marginLeft: "10px",
                      }}
                      onChange={handleChange}
                    />
                  </>
                ) : (
                  <TextField
                    name="doctorName"
                    label="Doctor Name"
                    value={formData.doctorName}
                    variant="outlined"
                    size="small"
                    fullWidth
                    sx={{ width: "fit-content", marginTop: "18px" }}
                    onChange={handleChange}
                  />
                )}
              </Box>
            ) : (
              <Typography
                variant="h4"
                fontWeight={500}
                color="#262626"
                sx={{
                  textTransform: "uppercase",
                  marginTop: "22px",
                  fontSize: { xs: "25px", sm: "34px" },
                }}
              >
                {role === "patient"
                  ? `${profileData?.firstName} ${profileData?.lastName}`
                  : `${profileData?.doctorName}`}
              </Typography>
            )}

            <Box mt={2} textAlign="center">
              {isEdit ? null : (
                <Button
                  variant="outlined"
                  sx={{
                    px: 4,
                    py: 1,
                    borderRadius: 10,
                    borderColor: "primary.main",
                    textTransform: "none",
                    "&:hover": {
                      backgroundColor: "primary.main",
                      color: "white",
                    },
                  }}
                  onClick={() => setIsEdit(true)}
                >
                  Edit
                </Button>
              )}
            </Box>
          </Box>
        </Box>
        <Divider sx={{ bgcolor: "#ADADAD", height: 1 }} />

        <Box
          display="flex"
          flexWrap="wrap"
          gap={3}
          // sx={{ border: "1px solid red" }}
        >
          {/* Contact Information */}
          <Box flex={1} minWidth={300}>
            <Typography
              color="gray"
              fontWeight={500}
              sx={{ textDecoration: "underline" }}
            >
              CONTACT INFORMATION
            </Typography>
            <Box mt={2} color="gray">
              {/* Email */}
              <Box display="flex" mb={1}>
                <Stack sx={{ width: "100%" }}>
                  <Typography fontWeight={600} flex={1}>
                    Email:
                  </Typography>
                </Stack>
                {isEdit ? (
                  <TextField
                    name="email"
                    value={formData.email}
                    variant="outlined"
                    size="small"
                    fullWidth
                    onChange={handleChange}
                  />
                ) : (
                  <Typography color="gray" flex={2}>
                    {profileData?.email}
                  </Typography>
                )}
              </Box>

              {/* Phone */}
              <Box display="flex" mb={1}>
                <Stack sx={{ width: "100%" }}>
                  <Typography fontWeight={600} flex={1}>
                    Phone:
                  </Typography>
                </Stack>
                {isEdit ? (
                  <TextField
                    name="contactNumber"
                    value={formData.contactNumber}
                    variant="outlined"
                    size="small"
                    fullWidth
                    onChange={handleChange}
                  />
                ) : (
                  <Typography color="gray" flex={2}>
                    {profileData?.contactNumber}
                  </Typography>
                )}
              </Box>

              {/* Emergency Contact */}
              <Box display="flex" mb={1}>
                <Stack sx={{ width: "100%" }}>
                  <Typography fontWeight={600} flex={1}>
                    Emergency:
                  </Typography>
                </Stack>
                {isEdit ? (
                  <TextField
                    name="emergencyContact"
                    value={formData.emergencyContact}
                    variant="outlined"
                    size="small"
                    fullWidth
                    onChange={handleChange}
                  />
                ) : (
                  <Typography color="gray" flex={2}>
                    {profileData?.emergencyContact}
                  </Typography>
                )}
              </Box>
            </Box>
          </Box>

          {/* Basic Information */}
          <Box flex={1} minWidth={300}>
            <Typography
              color="gray"
              fontWeight={500}
              sx={{ textDecoration: "underline" }}
            >
              BASIC INFORMATION
            </Typography>
            <Box mt={2} color="gray">
              {/* Gender */}
              <Box display="flex" mb={1}>
                <Stack sx={{ width: "100%" }}>
                  <Typography fontWeight={600} flex={1}>
                    Gender:
                  </Typography>
                </Stack>
                {isEdit ? (
                  <Select
                    name="gender"
                    value={formData.gender}
                    variant="outlined"
                    size="small"
                    fullWidth
                    onChange={handleChange}
                  >
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                  </Select>
                ) : (
                  <Typography color="gray" flex={2}>
                    {profileData?.gender}
                  </Typography>
                )}
              </Box>

              {/* Date of Birth */}
              <Box display="flex" mb={1}>
                <Stack sx={{ width: "100%" }}>
                  <Typography fontWeight={600} flex={1}>
                    Birthdate:
                  </Typography>
                </Stack>
                {isEdit ? (
                  <TextField
                    name="dob"
                    type="date"
                    value={formData.dob}
                    variant="outlined"
                    size="small"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    onChange={handleChange}
                  />
                ) : (
                  <Stack sx={{ width: "100%" }}>
                    <Typography color="gray" flex={2} textAlign="end">
                      {profileData?.dob}
                    </Typography>
                  </Stack>
                )}
              </Box>
            </Box>
          </Box>

          {/* Account Information */}
          <Box flex={1} minWidth={300}>
            <Typography
              color="gray"
              fontWeight={500}
              sx={{ textDecoration: "underline" }}
            >
              ACCOUNT INFORMATION
            </Typography>

            <Box mt={2} color="gray">
              <Box display="flex" mb={1}>
                <Stack sx={{ width: "100%" }}>
                  <Typography fontWeight={600} flex={1}>
                    Username:
                  </Typography>
                </Stack>
                {isEdit ? (
                  <TextField
                    name="username"
                    value={formData.username}
                    variant="outlined"
                    size="small"
                    fullWidth
                    onChange={handleChange}
                  />
                ) : (
                  <Typography color="gray" flex={2}>
                    {profileData?.username}
                  </Typography>
                )}
              </Box>

              <Box display="flex" mb={1}>
                <Stack sx={{ width: "100%" }}>
                  <Typography fontWeight={600} flex={1}>
                    Terms Accepted:
                  </Typography>
                </Stack>
                <Typography
                  color={profileData?.agreeToTerms ? "green" : "red"}
                  flex={2}
                >
                  {profileData?.agreeToTerms ? "Yes" : "No"}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Content Section: Two Columns */}
        <Box display="flex" flexWrap="wrap" gap={3}>
          {role === "patient" && (
            <Box width={{ xs: "100%", sm: "32%" }}>
              <Typography
                color="gray"
                fontWeight={500}
                sx={{ textDecoration: "underline" }}
              >
                MEDICAL HISTORY
              </Typography>
              <Stack mt={2} color="gray" sx={{ rowGap: "10px" }}>
                {/* Weight */}
                <Box display="flex" justifyContent="space-between">
                  <Stack sx={{ width: "100%" }}>
                    <Typography fontWeight={600}>Weight:</Typography>
                  </Stack>

                  {isEdit ? (
                    <TextField
                      name="weight"
                      value={formData?.weight || ""}
                      variant="outlined"
                      size="small"
                      fullWidth
                      onChange={handleChange}
                    />
                  ) : (
                    profileData?.weight
                  )}
                </Box>

                {/* Height */}
                <Box display="flex" justifyContent="space-between">
                  <Stack sx={{ width: "100%" }}>
                    <Typography fontWeight={600}>Height:</Typography>
                  </Stack>

                  {isEdit ? (
                    <TextField
                      name="height"
                      value={formData?.height || ""}
                      variant="outlined"
                      size="small"
                      fullWidth
                      onChange={handleChange}
                    />
                  ) : (
                    profileData?.height
                  )}
                </Box>

                {/* Blood Group */}
                <Box display="flex" justifyContent="space-between">
                  <Stack sx={{ width: "100%" }}>
                    <Typography fontWeight={600}>Blood Group:</Typography>
                  </Stack>
                  {isEdit ? (
                    <Select
                      name="bloodGroup"
                      value={formData?.bloodGroup || ""}
                      variant="outlined"
                      size="small"
                      fullWidth
                      onChange={handleChange}
                    >
                      {[
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
                      ].map((group) => (
                        <MenuItem key={group} value={group}>
                          {group}
                        </MenuItem>
                      ))}
                    </Select>
                  ) : (
                    profileData?.bloodGroup
                  )}
                </Box>

                {/* Allergies */}
                <Box display="flex" justifyContent="space-between">
                  <Stack sx={{ width: "100%" }}>
                    <Typography fontWeight={600}>Allergies:</Typography>
                  </Stack>
                  {isEdit ? (
                    <Select
                      name="allergies"
                      value={formData?.allergies || ""}
                      variant="outlined"
                      size="small"
                      fullWidth
                      onChange={handleChange}
                    >
                      <MenuItem value="Yes">Yes</MenuItem>
                      <MenuItem value="No">No</MenuItem>
                    </Select>
                  ) : (
                    profileData?.allergies
                  )}
                </Box>

                {/* Specify Allergies */}
                <Box display="flex" justifyContent="space-between">
                  <Stack sx={{ width: "100%" }}>
                    <Typography fontWeight={600}>Specify Allergies:</Typography>
                  </Stack>

                  {formData?.allergies === "Yes" && isEdit ? (
                    <TextField
                      name="allergyDetails"
                      variant="outlined"
                      size="small"
                      fullWidth
                      value={formData?.allergiesDescription}
                      onChange={handleChange}
                    />
                  ) : (
                    profileData?.allergiesDescription || "N/A"
                  )}
                </Box>
              </Stack>
            </Box>
          )}

          {role === "doctor" && (
            <Box width={{ xs: "100%", sm: "32%" }}>
              <Typography
                color="gray"
                fontWeight={500}
                sx={{ textDecoration: "underline" }}
              >
                PROFESSIONAL DETAILS
              </Typography>
              <Stack mt={2} color="gray" sx={{ rowGap: "10px" }}>
                {/* Degree */}
                <Box display="flex" justifyContent="space-between">
                  <Stack sx={{ width: "100%" }}>
                    <Typography fontWeight={600}>Degree:</Typography>
                  </Stack>
                  {isEdit ? (
                    <FormControl fullWidth>
                      <Select
                        name="degree"
                        size="small"
                        value={formData.degree || ""}
                        onChange={(e) =>
                          dispatch(
                            setFormData({
                              ...formData,
                              degree: e.target.value,
                            })
                          )
                        }
                      >
                        {degreeOptions.map((option, index) => (
                          <MenuItem key={index} value={option}>
                            {option}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  ) : profileData?.degree?.length > 0 ? (
                  <Typography sx={{width:'100%'}} textAlign='end'>
                  {profileData?.degree}
                  </Typography>
                  ) : (
                    "N/A"
                  )}
                </Box>

                {/* Specialization */}
                <Box display="flex" justifyContent="space-between">
                  <Stack sx={{ width: "100%" }}>
                    <Typography fontWeight={600}>Specialization:</Typography>
                  </Stack>

                  {isEdit ? (
                    <Select
                      name="specialization"
                      value={formData?.specialization || ""}
                      variant="outlined"
                      size="small"
                      fullWidth
                      onChange={handleChange}
                    >
                      {specialityData.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </Select>
                  ) : (
                    <Stack sx={{ width: "100%" }}>
                      <Typography textAlign="end">
                        {profileData?.specialization}
                      </Typography>
                    </Stack>
                  )}
                </Box>

                {/* Experience */}
                <Box display="flex" justifyContent="space-between">
                  <Stack sx={{ width: "100%" }}>
                    <Typography fontWeight={600}>Experience:</Typography>
                  </Stack>

                  {isEdit ? (
                    <Select
                      name="experience"
                      value={formData?.experience || ""}
                      variant="outlined"
                      size="small"
                      fullWidth
                      onChange={handleChange}
                    >
                      {experienceOptions.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </Select>
                  ) : (
                    <Stack sx={{ width: "100%" }}>
                      <Typography textAlign="end">
                        {profileData?.experience}
                      </Typography>
                    </Stack>
                  )}
                </Box>

                {/* Consultation Fees */}
                <Box display="flex" justifyContent="space-between">
                  <Stack sx={{ width: "100%" }}>
                    <Typography fontWeight={600}>Consultation Fees:</Typography>
                  </Stack>

                  {isEdit ? (
                    <Select
                      name="consultationFees"
                      value={formData?.consultationFees || ""}
                      variant="outlined"
                      size="small"
                      fullWidth
                      onChange={handleChange}
                    >
                      {feesOptions.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </Select>
                  ) : (
                    <Stack sx={{ width: "100%" }}>
                      <Typography textAlign="end">
                        {profileData?.consultationFees}
                      </Typography>
                    </Stack>
                  )}
                </Box>

                {/* License No */}
                <Box display="flex" justifyContent="space-between">
                  <Stack sx={{ width: "100%" }}>
                    <Typography fontWeight={600}>License No:</Typography>
                  </Stack>

                  {isEdit ? (
                    <TextField
                      name="licenseNo"
                      value={formData?.licenseNo || ""}
                      variant="outlined"
                      size="small"
                      fullWidth
                      onChange={handleChange}
                    />
                  ) : (
                    <Stack sx={{ width: "100%" }}>
                      <Typography textAlign="end">
                        {profileData?.licenseNo}
                      </Typography>
                    </Stack>
                  )}
                </Box>
              </Stack>
            </Box>
          )}

          <Box width={{ xs: "100%", sm: "32%" }}>
            <Typography
              color="gray"
              fontWeight={500}
              sx={{ textDecoration: "underline" }}
            >
              ADDRESS INFORMATION
            </Typography>
            <Stack mt={2} color="gray" sx={{ rowGap: "10px" }}>
              {/* State */}
              <Box display="flex" justifyContent="space-between">
                <Stack sx={{ width: "100%" }}>
                  <Typography fontWeight={600}>State:</Typography>
                </Stack>
                {isEdit ? (
                  <TextField
                    name="state"
                    value={formData.state}
                    variant="outlined"
                    size="small"
                    fullWidth
                    onChange={handleChange}
                  />
                ) : (
                  profileData?.state
                )}
              </Box>

              {/* City */}
              <Box display="flex" justifyContent="space-between">
                <Stack sx={{ width: "100%" }}>
                  <Typography fontWeight={600}>City:</Typography>
                </Stack>
                {isEdit ? (
                  <TextField
                    name="city"
                    value={formData.city}
                    variant="outlined"
                    size="small"
                    fullWidth
                    onChange={handleChange}
                  />
                ) : (
                  profileData?.city
                )}
              </Box>

              {/* Current Address */}
              <Box display="flex" justifyContent="space-between">
                <Stack sx={{ width: "100%" }}>
                  <Typography fontWeight={600}>Current Address:</Typography>
                </Stack>

                {isEdit ? (
                  <TextField
                    name="currentAddress"
                    value={formData.currentAddress}
                    variant="outlined"
                    size="small"
                    fullWidth
                    multiline
                    rows={2}
                    onChange={handleChange}
                  />
                ) : (
                  <Stack sx={{ width: "100%" }}>
                    <Typography sx={{ textAlign: "end" }}>
                      {profileData?.currentAddress}
                    </Typography>
                  </Stack>
                )}
              </Box>

              {/* Permanent Address */}
              <Box display="flex" justifyContent="space-between">
                <Stack sx={{ width: "100%" }}>
                  <Typography fontWeight={600}>Permanent Address:</Typography>
                </Stack>

                {isEdit ? (
                  <TextField
                    name="permanentAddress"
                    value={formData.permanentAddress}
                    variant="outlined"
                    size="small"
                    fullWidth
                    multiline
                    rows={2}
                    onChange={handleChange}
                  />
                ) : (
                  <Stack sx={{ width: "100%" }}>
                    <Typography sx={{ textAlign: "end" }}>
                      {profileData?.permanentAddress}
                    </Typography>
                  </Stack>
                )}
              </Box>
            </Stack>
          </Box>
        </Box>

        {/* Edit Button */}
        {isEdit ? (
          <Box sx={{ display: "flex", alignItems: "center", gap: 3, mt: 3 }}>
            <Button
              variant="outlined"
              sx={{
                px: 4,
                py: 1,
                borderRadius: 10,
                borderColor: "primary.main",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "primary.main",
                  color: "white",
                },
              }}
              onClick={() => setIsEdit(false)}
            >
              Cancel
            </Button>
            <Button
              variant="outlined"
              sx={{
                px: 4,
                py: 1,
                borderRadius: 10,
                borderColor: "primary.main",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "primary.main",
                  color: "white",
                },
              }}
              onClick={handleSubmit}
            >
              Save Information
            </Button>
          </Box>
        ) : null}
      </Box>
    </Box>
  );
};

export default UserProfile;
