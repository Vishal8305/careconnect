import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Backdrop,
  CircularProgress,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SelectedUserOverview from "../../common/SelectedUserOverview";

const doctorApi = import.meta.env.VITE_DOCTOR_API;
const patientApi = import.meta.env.VITE_PATIENT_API;

const ManageUser = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const role = location.state?.role || "doctor"; // default to doctor

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (!userId) return;
      setLoading(true);

      try {
        const apiUrl = role === "doctor" ? doctorApi : patientApi;
        const response = await fetch(`${apiUrl}/${userId}`);
        if (!response.ok) throw new Error("Failed to fetch user details");

        const userData = await response.json();
        setUser(userData);
      } catch (err) {
        console.error(err.message);
        toast.error("Error fetching user data");
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [userId, role]);

  const handleRemoveUser = async () => {
    if (!userId) return;
  
    setLoading(true);
    try {
      const apiUrl = role === "doctor" ? doctorApi : patientApi;
      const response = await fetch(`${apiUrl}/${userId}`, {
        method: "DELETE",
      });
  
      if (!response.ok) throw new Error("Failed to remove user");
  
      toast.success(`${role === "doctor" ? "Doctor" : "Patient"} has been successfully removed.`);
      navigate(role === "doctor" ? "/admin/doctorsLists" : "/admin/patientLists");
    } catch (err) {
      console.error(err);
      toast.error(`Failed to remove ${role}.`);
    } finally {
      setLoading(false);
      setOpenConfirmModal(false);
    }
  };
  

  const handleToggleAvailability = async () => {
    if (!userId || user === null) return;
  
    const newStatus = !user.isAvailableStatus;
    setLoading(true);
  
    try {
      const apiUrl = role === "doctor" ? doctorApi : patientApi;
      const response = await fetch(`${apiUrl}/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isAvailableStatus: newStatus }),
      });
  
      if (!response.ok) throw new Error("Failed to update status");
  
      const updatedUser = await response.json();
      setUser(updatedUser);
      toast.success(`${role === "doctor" ? "Doctor" : "Patient"} has been successfully ${newStatus ? "unblocked" : "blocked"}.`);
    } catch (err) {
      console.error(err);
      toast.error(`Failed to update ${role} status.`);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <Box mt={8}>
      <Backdrop
        open={loading}
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.modal + 1 }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <Box display="flex" alignItems="center" mb={2} gap={1.5}>
        <Button
          onClick={() =>
            navigate(
              role === "doctor" ? "/admin/doctorsLists" : "/admin/patientLists"
            )
          }
          startIcon={<ArrowBackIcon />}
          sx={{
            minWidth: "auto",
            padding: 1,
            borderRadius: "50%",
            color: "#616161",
          }}
        />
        <Typography variant="h5" fontWeight="bold" color="#616161">
          {role === "doctor" ? "Doctor Overview" : "Patient Overview"}
        </Typography>
      </Box>

      <Divider sx={{ mb: 2 }} />

      {/* Display user details */}
      <SelectedUserOverview user={user} role={role} />

      <Box ml={36} pl={{ sm: 4 }} mt={4}>
        <Typography sx={{ color: "#565656" }} fontWeight={600}>
          {role === "doctor" ? "Manage Doctor Access" : "Manage Patient Access"}
        </Typography>

        <Box display="flex" justifyContent="flex-start" pr={8} gap={2} mt={4}>
          <Button
            variant="outlined"
            color="error"
            sx={{ px: 4, py: 1.5, borderRadius: "999px" }}
            onClick={() => setOpenConfirmModal(true)}
          >
            {role === "doctor" ? "Remove Doctor" : "Remove Patient"}
          </Button>

          <Button
            variant="contained"
            color={user?.isAvailableStatus ? "error" : "success"}
            sx={{ px: 4, py: 1.5, borderRadius: "999px" }}
            onClick={handleToggleAvailability}
          >
            {user?.isAvailableStatus
              ? role === "doctor"
                ? "Block Doctor"
                : "Block Patient"
              : role === "doctor"
              ? "Unblock Doctor"
              : "Unblock Patient"}
          </Button>
        </Box>
      </Box>

      <Divider sx={{ mt: 8 }} />

      <Dialog
        open={openConfirmModal}
        onClose={() => setOpenConfirmModal(false)}
      >
        <DialogTitle>Confirm Removal</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to remove{" "}
            {`"${user?.firstName || user?.doctorName} ${user?.lastName || ""}"`}
            ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirmModal(false)} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleRemoveUser}
            color="error"
            variant="contained"
          >
            Remove
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ManageUser;
