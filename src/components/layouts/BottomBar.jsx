import React, { useState, useEffect } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import GroupIcon from "@mui/icons-material/Group";
import HistoryIcon from "@mui/icons-material/History";
import TodayIcon from "@mui/icons-material/Today";
import LocalHospitalOutlinedIcon from "@mui/icons-material/LocalHospitalOutlined";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import { useLocation, useNavigate } from "react-router-dom";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonAddAlt1OutlinedIcon from "@mui/icons-material/PersonAddAlt1Outlined";

const BottomBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState("patient");

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const role = localStorage.getItem("userRole") || "patient";
    setUserRole(role);
  }, []);

  const menuItems = {
    patient: [
      {
        name: "Available Doctors",
        icon:
          location.pathname === "/patient/availableDoctors" ? (
            <LocalHospitalIcon />
          ) : (
            <LocalHospitalOutlinedIcon />
          ),
        path: "/patient/availableDoctors",
      },
      {
        name: "My Appointments",
        icon:
          location.pathname === "/patient/myAppointments" ? (
            <CalendarMonthIcon />
          ) : (
            <CalendarMonthOutlinedIcon />
          ),
        path: "/patient/myAppointments",
      },
      {
        name: "Appointments History",
        icon: <HistoryIcon />,
        path: "/patient/appointmentsHistory",
      },
      {
        name: "Profile",
        icon:
          location.pathname === "/patient/profile" ? (
            <AccountCircleIcon />
          ) : (
            <AccountCircleOutlinedIcon />
          ),
        path: "/patient/profile",
      },
    ],
    doctor: [
      {
        name: "Available Slots",
        icon: <TodayIcon />,
        path: "/doctor/availableSlots",
      },
      {
        name: "Appointments",
        icon:
          location.pathname === "/doctor/myAppointments" ? (
            <CalendarMonthIcon />
          ) : (
            <CalendarMonthOutlinedIcon />
          ),
        path: "/doctor/myAppointments",
      },
      {
        name: "Appointments History",
        icon: <HistoryIcon />,
        path: "/doctor/appointmentsHistory",
      },
      {
        name: "Profile",
        icon:
          location.pathname === "/doctor/profile" ? (
            <AccountCircleIcon />
          ) : (
            <AccountCircleOutlinedIcon />
          ),
        path: "/doctor/profile",
      },
    ],
    admin: [
      {
        name: "Add Doctor",
        icon:
      location.pathname === "/admin/addDoctor" ? (
        <PersonAddIcon />
      ) : (
        <PersonAddAlt1OutlinedIcon />
      ),
        path: "/admin/addDoctor",
      },
      {
        name: "Appointments",
        icon:
          location.pathname === "/admin/appointmentsOverview" ? (
            <CalendarMonthIcon />
          ) : (
            <CalendarMonthOutlinedIcon />
          ),
        path: "/admin/appointments",
      },
      {
        name: "Doctors List",
        icon:
          location.pathname === "/admin/doctorsLists" ? (
            <FormatListBulletedIcon />
          ) : (
            <FormatListBulletedOutlinedIcon />
          ),
        path: "/admin/doctorsLists",
      },
      {
        name: "Patient List",
        icon:
          location.pathname === "/admin/patientLists" ? (
            <GroupIcon />
          ) : (
            <GroupOutlinedIcon />
          ),
        path: "/admin/patientLists",
      },
    ],
  };

  const handleItemClick = (path) => {
    navigate(path);
  };

  if (!isMobile) return null;

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
        backgroundColor: "#fff",
        display: "flex",
        justifyContent: "space-around",
        boxShadow: "0 -1px 6px rgba(0, 0, 0, 0.1)",
        zIndex: 1000,
      }}
    >
      <List sx={{ display: "flex", width: "100%", justifyContent: "space-evenly" }}>
        {menuItems[userRole]?.map((item) => (
          <ListItem key={item.name} disablePadding sx={{ width: "auto" }}>
            <ListItemButton
              onClick={() => handleItemClick(item.path)}
              sx={{
                flexDirection: "column",
                px: 1,
                py: 0.5,
                "&:hover": { backgroundColor: "transparent" },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  justifyContent: "center",
                  color: location.pathname === item.path ? "#000" : "#888",
                }}
              >
                {item.icon}
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default BottomBar;
