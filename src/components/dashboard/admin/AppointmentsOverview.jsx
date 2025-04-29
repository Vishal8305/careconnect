import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Divider,
  Select,
  MenuItem,
  FormControl,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";

const doctorApi = import.meta.env.VITE_DOCTOR_API;
const patientApi = import.meta.env.VITE_PATIENT_API;

const AppointmentsOverview = () => {
  const columns = [
    "#",
    "Patient",
    "Age",
    "Date & Time",
    "Doctor",
    "Fees",
    "Status",
  ];
  const [appointments, setAppointments] = useState([]);
  const [filterStatus, setFilterStatus] = useState("Booked");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true);
      try {
        const [doctorRes, patientRes] = await Promise.all([
          fetch(`${doctorApi}`).then((res) => res.json()),
          fetch(`${patientApi}`).then((res) => res.json()),
        ]);

        const patientAppointments = patientRes.flatMap((patient) =>
          (patient.appointments || []).map((appt) => ({
            appointmentId: appt.appointmentId,
            patientName: `${patient.firstName} ${patient.lastName}`,
            age: calculateAge(patient.dob),
            datetime: `${appt.appointmentDate.date} ${appt.appointmentTime}`,
            doctorName: appt.doctorName,
            fees: findDoctorFee(doctorRes, appt.doctorId),
            status: appt.appointmentStatus || "Booked",
          }))
        );

        const uniqueAppointmentsMap = new Map();
        for (const appt of patientAppointments) {
          uniqueAppointmentsMap.set(appt.appointmentId, appt);
        }

        const combinedAppointments = Array.from(
          uniqueAppointmentsMap.values()
        ).map((appt, index) => ({
          id: index + 1,
          ...appt,
        }));

        setAppointments(combinedAppointments);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }finally {
        setLoading(false); // Stop loading regardless of success or failure
      }
    };

    fetchAppointments();
  }, []);

  const calculateAge = (dob) => {
    if (!dob) return "-";
    const birthDate = new Date(dob);
    const ageDifMs = Date.now() - birthDate.getTime();
    const ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  const findDoctorFee = (doctors, doctorId) => {
    const doctor = doctors.find((d) => d.id === doctorId);
    return doctor?.consultationFees || "-";
  };

  const filteredAppointments = appointments.filter(
    (appt) => appt.status === filterStatus
  );



  

  return (
    <Box sx={{ padding: "20px" }} >
     <Backdrop
        open={loading}
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.modal + 1 }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mt={8}
        pb={1.5}
        borderBottom={1}
      >
        <Typography
          variant="h5"
          fontWeight="bold"
          color="grey.700"
          sx={{
            fontSize: { xs: "1.2rem", sm: "1.5rem" },
            whiteSpace: "nowrap",
            flex: 1,
          }}
        >
          All Appointments
        </Typography>

        <FormControl
          variant="standard"
          sx={{
            width: { xs: 90, sm: 160 },
            flexShrink: 0,
          }}
        >
          <Select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            sx={{ fontSize: { xs: "0.9rem", sm: "1rem" } }}
          >
            <MenuItem value="Booked">Booked</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
            <MenuItem value="Cancelled">Cancelled</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Divider />

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column, index) => (
                <TableCell key={index} style={{ fontWeight: "bold" }}>
                  {column}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredAppointments.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length} align="center">
                  No {filterStatus.toLowerCase()} appointments found
                </TableCell>
              </TableRow>
            ) : (
              filteredAppointments.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{row.patientName}</TableCell>
                  <TableCell>{row.age}</TableCell>
                  <TableCell>{row.datetime}</TableCell>
                  <TableCell>{row.doctorName}</TableCell>
                  <TableCell>{row.fees}</TableCell>
                  <TableCell>{row.status}</TableCell>
                 
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AppointmentsOverview;
