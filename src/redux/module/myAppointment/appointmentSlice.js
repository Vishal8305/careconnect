import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  appointments: [],
  loading: false,
  error: null,
};

const patientApi = import.meta.env.VITE_PATIENT_API;
const doctorApi = import.meta.env.VITE_DOCTOR_API;

export const fetchAppointments = createAsyncThunk(
  'appointments/fetchAppointments',
  async ({ userId, userRole }, { rejectWithValue }) => {
    try {
      const apiUrl = userRole === 'patient' ? patientApi : doctorApi;
      const response = await fetch(`${apiUrl}/${userId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      return data.appointments || [];
    } catch (err) {
      return rejectWithValue(err.message || 'Unknown error');
    }
  }
);

export const cancelAppointment = createAsyncThunk(
  'appointments/cancelAppointment',
  async ({ userId, appointment }, { rejectWithValue }) => {
    try {
      // Fetch patient data
      const patientResponse = await fetch(`${patientApi}/${userId}`);
      if (!patientResponse.ok) throw new Error('Failed to fetch patient data');

      const patientData = await patientResponse.json();
      const updatedPatientAppointments = patientData.appointments.map((appt) =>
        appt.appointmentTime === appointment.appointmentTime &&
        appt.appointmentDate.date === appointment.appointmentDate.date
          ? { ...appt, appointmentStatus: 'Cancelled' }
          : appt
      );

      await fetch(`${patientApi}/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...patientData, appointments: updatedPatientAppointments }),
      });

      // Fetch doctor data
      const doctorResponse = await fetch(`${doctorApi}/${appointment.doctorId}`);
      if (!doctorResponse.ok) throw new Error('Failed to fetch doctor data');

      const doctorData = await doctorResponse.json();
      const targetDate = appointment.appointmentDate.date.trim();
      const dayOfWeek = new Date(targetDate).toLocaleDateString('en-US', {
        weekday: 'long',
      });

      const updatedDoctorAppointments = doctorData.appointments.map((appt) =>
        appt.appointmentTime === appointment.appointmentTime &&
        appt.appointmentDate.date === appointment.appointmentDate.date
          ? { ...appt, appointmentStatus: 'Cancelled' }
          : appt
      );

      if (doctorData.availability?.availableDays[dayOfWeek]) {
        doctorData.availability.availableDays[dayOfWeek] =
          doctorData.availability.availableDays[dayOfWeek].map((slot) =>
            slot.time === appointment.appointmentTime
              ? { ...slot, status: 'Available' }
              : slot
          );
      }

      await fetch(`${doctorApi}/${appointment.doctorId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...doctorData,
          appointments: updatedDoctorAppointments,
          availability: doctorData.availability,
        }),
      });

      return updatedPatientAppointments;
    } catch (err) {
      return rejectWithValue(err.message || 'Failed to cancel appointment');
    }
  }
);

export const completeAppointment = createAsyncThunk(
  'appointments/completeAppointment',
  async ({  appointment }, { rejectWithValue }) => {
    try {
      // Fetch doctor data using the correct doctorId
      const doctorResponse = await fetch(`${doctorApi}/${appointment.doctorId}`);
      if (!doctorResponse.ok) throw new Error('Failed to fetch doctor data');
      const doctorData = await doctorResponse.json();

      // Update doctor data: increment total patients and mark the appointment as completed
      const updatedTotalPatient = (Number(doctorData.totalPatient) || 0) + 1;
      const updatedAppointments = doctorData.appointments.map((appt) =>
        appt.appointmentId === appointment.appointmentId
          ? { ...appt, appointmentStatus: 'Completed' }
          : appt
      );

      // Update doctor's availability (make the slot available again)
      const dayOfWeek = new Date(appointment.appointmentDate.date).toLocaleDateString(
        'en-US', { weekday: 'long' }
      );
      const updatedAvailability = { ...doctorData.availability };
      if (updatedAvailability.availableDays[dayOfWeek]) {
        updatedAvailability.availableDays[dayOfWeek] =
          updatedAvailability.availableDays[dayOfWeek].map((slot) =>
            slot.time === appointment.appointmentTime
              ? { ...slot, status: 'Available' }
              : slot
          );
      }

      // Send the updated doctor data back to the doctor API
      await fetch(`${doctorApi}/${appointment.doctorId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...doctorData,
          totalPatient: updatedTotalPatient,
          appointments: updatedAppointments,
          availability: updatedAvailability,
        }),
      });

      // Fetch patient data using the correct patientId
      const patientResponse = await fetch(`${patientApi}/${appointment.patientId}`);
      if (!patientResponse.ok) throw new Error('Failed to fetch patient data');
      const patientData = await patientResponse.json();

      // Update patient appointments: mark the appointment as completed
      const updatedPatientAppointments = patientData.appointments.map((appt) =>
        appt.appointmentId === appointment.appointmentId
          ? { ...appt, appointmentStatus: 'Completed' }
          : appt
      );

      // Send the updated patient data back to the patient API
      await fetch(`${patientApi}/${appointment.patientId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...patientData,
          appointments: updatedPatientAppointments,
        }),
      });

      // Return the updated appointments
      return updatedAppointments;
    } catch (err) {
      return rejectWithValue(err.message || 'Failed to complete appointment');
    }
  }
);


const appointmentSlice = createSlice({
  name: 'appointments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAppointments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAppointments.fulfilled, (state, action) => {
        state.loading = false;
        state.appointments = action.payload;
      })
      .addCase(fetchAppointments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(cancelAppointment.pending, (state) => {
        state.loading = true;
      })
      .addCase(cancelAppointment.fulfilled, (state, action) => {
        state.loading = false;
        state.appointments = action.payload;
      })
      .addCase(cancelAppointment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(completeAppointment.pending, (state) => {
        state.loading = true;
      })
      .addCase(completeAppointment.fulfilled, (state, action) => {
        state.loading = false;
        state.appointments = action.payload;
      })
      .addCase(completeAppointment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default appointmentSlice.reducer;
