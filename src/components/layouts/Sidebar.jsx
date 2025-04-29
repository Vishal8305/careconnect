import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import MuiDrawer from "@mui/material/Drawer";
import { styled, useTheme } from "@mui/material/styles";
import ListItem from "@mui/material/ListItem";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import useMediaQuery from "@mui/material/useMediaQuery";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import HistoryIcon from "@mui/icons-material/History";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import TodayIcon from "@mui/icons-material/Today";
import ChecklistIcon from "@mui/icons-material/Checklist";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import GroupIcon from "@mui/icons-material/Group";
import { useLocation, useNavigate } from "react-router-dom";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
  backgroundColor: "#fff",
  color: "#000",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
  backgroundColor: "#fff",
  color: "#000",
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const theme = useTheme();
  const isLgUp = useMediaQuery(theme.breakpoints.up("lg"));
  const [open, setOpen] = useState(isLgUp);
  const location = useLocation();
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState("patient");

  const isRestrictedDoctor =
    userRole === "doctor" &&
    JSON.parse(localStorage.getItem("isAvailableStatus")) === false;

  useEffect(() => {
    const role = localStorage.getItem("userRole") || "patient";
    setUserRole(role);
  }, []);

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  const menuItems = {
    patient: [
      {
        name: "Available Doctors",
        icon: <MedicalServicesIcon />,
        path: "/patient/availableDoctors",
      },
      {
        name: "My Appointments",
        icon: <EventAvailableIcon />,
        path: "/patient/myAppointments",
      },
      {
        name: "Appointments History",
        icon: <HistoryIcon />,
        path: "/patient/appointmentsHistory",
      },
      {
        name: "Profile",
        icon: <AccountCircleIcon />,
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
        icon: <EventAvailableIcon />,
        path: "/doctor/myAppointments",
      },
      {
        name: "Appointments History",
        icon: <HistoryIcon />,
        path: "/doctor/appointmentsHistory",
      },
      {
        name: "Profile",
        icon: <AccountCircleIcon />,
        path: "/doctor/profile",
      },
    ],
    admin: [
      {
        name: "Add Doctor",
        icon: <ChecklistIcon />,
        path: "/admin/addDoctor",
      },
      {
        name: "Appointments",
        icon: <EventAvailableIcon />,
        path: "/admin/appointmentsOverview",
      },
      {
        name: "Doctors List",
        icon: <FormatListBulletedIcon />,
        path: "/admin/doctorsLists",
      },
      {
        name: "Patient List",
        icon: <GroupIcon />,
        path: "/admin/patientLists",
      },
    ],
  };

  const handleDrawerToggle = () => {
    setOpen(!open);
    toggleSidebar(!open);
  };

  const handleItemClick = (path) => {
    if (isRestrictedDoctor) {
      navigate("/doctor/myAppointments");
    } else {
      navigate(path);
    }
  };

  return (
    <Box>
      <Box sx={{ position: "fixed", left: "2px", zIndex: 9999, top: "12px" }}>
        <IconButton sx={{ color: "#000" }} onClick={handleDrawerToggle}>
          {open ? <ChevronLeftIcon sx={{ fontSize: "28px" }} /> : <MenuIcon />}
        </IconButton>
      </Box>

      <Drawer
        variant="permanent"
        open={open}
        sx={{
          "& .MuiDrawer-paper": {
            top: "68px",
            zIndex: 0,
            background: "#fff",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100vh",
          },
        }}
      >
        <List>
          {menuItems[userRole]?.map((item) => (
            <ListItem key={item.name} disablePadding>
              <ListItemButton
                onClick={() => handleItemClick(item.path)}
                sx={{
                  px: 3,
                  py: 1,
                  minHeight: 48,
                  borderRight:
                    location.pathname === item.path
                      ? "4px solid #2F54EB"
                      : "none",
                  justifyContent: open ? "initial" : "center",
                  color: location.pathname === item.path ? "#000b6d" : "#000",
                  backgroundColor:
                    location.pathname === item.path ? "#f2f3ff" : "transparent",
                  "&:hover": { backgroundColor: "#f2f3ff" },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    color: location.pathname === item.path ? "#000b6d" : "#000",
                    justifyContent: "center",
                    mr: open ? 3 : "auto",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.name}
                  sx={{
                    opacity: open ? 1 : 0,
                    color: location.pathname === item.path ? "#000b6d" : "#000",
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
};

export default Sidebar;
