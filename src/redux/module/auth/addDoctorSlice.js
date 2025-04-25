// src/redux/slices/adminSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  formData: {
    doctorName: "",
    dob: "",
    gender: "",
    contactNumber: "",
    email: "",
    city: "",
    state: "",
    zipCode: "",
    currentAddress: "",
    permanentAddress: "",
    password: "",
    agreeToTerms: false,
    selectedImage: "",
    specialization:"",
    experience:'',
    licenseNo:'',
    consultationFees:'',
    degree:''
  },
  status: "idle", 
  error: null,
};

const doctorApi = import.meta.env.VITE_DOCTOR_API;

// Async thunk to post doctor data
export const submitDoctor = createAsyncThunk(
  'admin/submitDoctor',
  async (doctorData, thunkAPI) => {
    try {
      const response = await axios.post(doctorApi, doctorData);
      
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

const addDoctorSlice = createSlice({
  name: 'addDoctor',
  initialState,
  reducers: {
    setFormData: (state, action) => {
      state.formData = {
        ...state.formData,
        ...action.payload,
      };
    },
    clearFormData: (state) => {
      state.formData = initialState.formData;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitDoctor.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(submitDoctor.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(submitDoctor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setFormData, clearFormData } = addDoctorSlice.actions;
export default addDoctorSlice.reducer;
