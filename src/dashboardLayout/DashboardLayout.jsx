import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import {
  AppBar,
  Button,
  Container,
  Toolbar,
  useMediaQuery,
} from "@mui/material";
import CareConnectLogo from "../assets/CareConnectLogo.png";
import Sidebar from "../components/layouts/Sidebar";
import BottomBar from "../components/layouts/BottomBar";
import AvailableDoctors from "../components/common/AvailableDoctors";
import BookAppointment from "../components/dashboard/patient/BookAppointment";
import MyAppointments from "../components/common/MyAppointments";
import AppointmentHistory from "../components/common/AppointmentHistory";
import UserProfile from "../components/common/UserProfile";
import AddSlots from "../components/dashboard/doctor/AddSlots";
import AvailableSlots from "../components/dashboard/doctor/AvailableSlots";
import AppointmentsOverview from "../components/dashboard/admin/AppointmentsOverview";
import AddDoctor from "../components/dashboard/admin/AddDoctor";
import ManageUser from "../components/dashboard/admin/ManageUser";
import UsersList from "../components/dashboard/admin/UsersList";
import ConsultationRoom from "../components/dashboard/patient/ConsultationRoom";

const DashboardLayout = ({ role }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <Box sx={{ display: "flex", pb: 12 }}>
      <AppBar
        sx={{
          background: "#fff",
          position: "fixed",
          boxShadow: "none",
          borderBottom: "1px solid #ddd",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
            {/* Logo and Brand Name */}
            <Box
              component="img"
              src={CareConnectLogo}
              alt="CareConnect Logo"
              sx={{
                width: { xs: 150, md: 200 },
                marginLeft: !isMobile && "22px",
              }}
            />
            {/* Buttons (Login) */}
            <Box sx={{ display: "flex", gap: "12px" }}>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#4F6EF7",
                  color: "#fff",
                  padding: "6px 16px",
                  borderRadius: "20px",
                  textTransform: "none",
                  fontSize: "14px",
                  "&:hover": {
                    backgroundColor: "#4058D3",
                  },
                }}
                onClick={() => {
                  localStorage.removeItem("userRole");
                  localStorage.removeItem("userId");
                  navigate("/");
                }}
              >
                Logout
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      {/* Sidebar */}
      {!isMobile && (
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={setIsSidebarOpen} />
      )}
      {/* Main Content */}
      <Box
        sx={{
          flexGrow: 1,
          transition: "margin 0.3s ease",
          padding: "20px",
        }}
      >
        <Routes>
          {role === "patient" && (
            <>
              <Route path="availableDoctors" element={<AvailableDoctors />} />
              <Route
                path="bookAppointments/:userId"
                element={<BookAppointment />}
              />
              <Route path="myAppointments" element={<MyAppointments />} />
              <Route
                path="appointmentsHistory"
                element={<AppointmentHistory />}
              />
              <Route
                path="consultationRoom/:userId"
                element={<ConsultationRoom />}
              />
              <Route path="profile" element={<UserProfile />} />
            </>
          )}

          {role === "doctor" && (
            <>
              {/* <Route path="dashboard" element={<Dashboard />} /> */}
              <Route path="myAppointments" element={<MyAppointments />} />
              <Route path="addSlots" element={<AddSlots />} />
              <Route path="availableSlots" element={<AvailableSlots />} />

              <Route
                path="appointmentsHistory"
                element={<AppointmentHistory />}
              />

              <Route path="profile" element={<UserProfile />} />
            </>
          )}

          {role === "admin" && (
            <>
              <Route path="appointmentsOverview" element={<AppointmentsOverview />} />
              <Route path="doctorsLists" element={<UsersList />} />
              <Route path="patientLists" element={<UsersList />} />
              <Route path="manageUser/:userId" element={<ManageUser />} />
              <Route path="addDoctor" element={<AddDoctor />} />
            </>
          )}
        </Routes>
      </Box>
      {isMobile && <BottomBar />}
    </Box>
  );
};

export default DashboardLayout;
