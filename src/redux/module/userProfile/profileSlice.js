import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const doctorApi = import.meta.env.VITE_DOCTOR_API;
const patientApi = import.meta.env.VITE_PATIENT_API;

// Function for fetch profile data
export const fetchProfileData = createAsyncThunk(
  "profile/fetchProfileData",
  async (_, { getState, rejectWithValue }) => {
    const { role, uuId } = getState().profile;
    if (!role || !uuId) return rejectWithValue("Missing role or user ID");

    try {
      const apiUrl =
        role === "patient" ? `${patientApi}/${uuId}` : `${doctorApi}/${uuId}`;
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Function for update profile data
export const updateProfileData = createAsyncThunk(
  "profile/updateProfileData",
  async (updatedData, { getState, rejectWithValue }) => {
    const { role, uuId } = getState().profile;
    if (!role || !uuId) return rejectWithValue("Missing role or user ID");

    // ✅ Filter out doctor-specific fields for patients
    const dataToSend = { ...updatedData };
    if (role === "patient") {
      delete dataToSend.specialization;
      delete dataToSend.degree;
      delete dataToSend.experience;
      delete dataToSend.fees;
    }

    try {
      const apiUrl =
        role === "patient" ? `${patientApi}/${uuId}` : `${doctorApi}/${uuId}`;
      const response = await fetch(apiUrl, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        throw new Error(`Failed to update profile. Status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const normalizeSpecialization = (specialization, options) => {
  return (
    options.find(
      (item) => item.toLowerCase() === (specialization || "").toLowerCase()
    ) ||
    specialization ||
    ""
  );
};

const specialityData = [
  "General Physician",
  "Gynecologist",
  "Dermatologist",
  "Pediatricians",
  "Neurologist",
  "Gastroenterologist",
];

const degreeOptions = [
  "MBBS",
  "MD General Medicine",
  "MD Dermatology",
  "MD Pediatrics",
  "MD Gynecology",
  "DM Neurology",
  "MCh Neurosurgery",
  "MD Gastroenterology",
  "DM Gastroenterology",
];
const experienceOptions = Array.from(
  { length: 12 },
  (_, i) => `${i + 1} Years`
);

const feesOptions = ["₹200", "₹300", "₹500", "₹600", "₹700", "₹1000"];

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    role: null,
    uuId: null,
    profileData: null,
    formData: {},
    loading: false,
    updateStatus: "idle",
    error: null,
    specialityData,
    degreeOptions,
    experienceOptions,
    feesOptions,
  },
  reducers: {
    setRole: (state, action) => {
      state.role = action.payload;
    },
    setUuId: (state, action) => {
      state.uuId = action.payload;
    },
    setFormData: (state, action) => {
      state.formData = { ...state.formData, ...action.payload };
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch profile data
      .addCase(fetchProfileData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProfileData.fulfilled, (state, action) => {
        state.loading = false;
        state.profileData = action.payload;

        // 👇 Normalize specialization field when setting formData
        state.formData = {
          ...action.payload,
          specialization: normalizeSpecialization(
            action.payload.specialization,
            state.specialityData
          ),
        };
      })

      .addCase(fetchProfileData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update profile data
      .addCase(updateProfileData.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProfileData.fulfilled, (state, action) => {
        state.loading = false;
        state.profileData = action.payload;
      })
      .addCase(updateProfileData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setRole, setUuId, setLoading, setFormData } =
  profileSlice.actions;
export default profileSlice.reducer;
