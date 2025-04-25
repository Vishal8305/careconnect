import { configureStore } from "@reduxjs/toolkit";
import signupReducer from "../module/auth/signupSlice";
import loginReducer from "../module/auth/loginSlice";
import appointmentReducer from '../module/myAppointment/appointmentSlice'
import profileReducer from '../module/userProfile/profileSlice'
import addDoctorSlice from '../module/auth/addDoctorSlice'

export const store = configureStore({
  reducer: {
    signup: signupReducer,
    login: loginReducer,
    appointments: appointmentReducer,
    profile: profileReducer,
    AddDoctor:addDoctorSlice
  },
});

