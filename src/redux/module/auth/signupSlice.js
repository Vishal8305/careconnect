import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  formData: {
    firstName: "",
    lastName: "",
    dob: "",
    gender: "",
    contactNumber: "",
    email: "",
    city: "",
    state: "",
    zipCode: "",
    emergencyContact: "",
    currentAddress: "",
    permanentAddress: "",
    isPermanentSame: false,
    weight: "",
    height: "",
    allergies: "",
    allergiesDescription: "",
    bloodGroup: "",
    username: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
    selectedImage: "",
  },
  status: "idle",
  error: null,
};

const patientApi = import.meta.env.VITE_PATIENT_API;

// handling patient signup submission
export const submitSignupForm = createAsyncThunk(
  "signup/submitSignupForm",
  async ({ formData, navigate }, { rejectWithValue, dispatch }) => {
    try {
      const payload = {
        ...formData,
        isAvailableStatus: true,
      };

      const response = await fetch(patientApi, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to submit data");
      }

      const result = await response.json();
      dispatch(resetForm()); // Reset form after successful submission

      toast.success("Account created successfully");
      navigate("/login");

      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const signupSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {
    setFormData: (state, action) => {
      state.formData = { ...state.formData, ...action.payload };
    },

    resetForm: (state) => {
      state.formData = initialState.formData;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitSignupForm.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(submitSignupForm.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(submitSignupForm.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        toast.error(`Signup failed: ${action.payload}`);
      });
  },
});

export const { setFormData, resetForm } = signupSlice.actions;
export default signupSlice.reducer;
