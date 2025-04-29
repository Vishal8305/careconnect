import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Avatar,
  Grid,
  Container,
  Divider,
} from "@mui/material";
import {
  LocalHospital as LocalHospitalIcon,
  Healing as HealingIcon,
  Medication as MedicationIcon,
  CheckCircle as CheckCircleIcon,
} from "@mui/icons-material";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { completeAppointment } from "../../../redux/module/myAppointment/appointmentSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const symptomOptions = {
  "General Physician": ["Fever", "Cold", "Body Ache", "Fatigue"],
  Gynecologist: [
    "Irregular periods",
    "Pelvic pain",
    "Pregnancy",
    "Menstrual cramps",
  ],
  Dermatologist: ["Rashes", "Itching", "Acne", "Eczema"],
  Pediatricians: ["Cough", "Mild Fever", "Vaccination", "Ear Infection"],
  Neurologist: ["Headache", "Seizures", "Dizziness", "Memory Loss"],
  Gastroenterologist: ["Stomach Pain", "Constipation", "Acidity", "Diarrhea"],
};

const doctorDiagnosis = {
  Fever: {
    reason: "Body’s immune response to infection.",
    how: "Caused by viruses or bacteria triggering inflammation.",
    medicine: "Paracetamol 500mg, every 6 hours if fever persists.",
  },
  Cold: {
    reason: "Viral upper respiratory infection.",
    how: "Transmitted through air or contact with infected surfaces.",
    medicine: "Antihistamines twice a day, steam inhalation morning/evening.",
  },
  "Body Ache": {
    reason: "Muscle fatigue or viral infection.",
    how: "Due to inflammation or strain.",
    medicine: "Ibuprofen 400mg after food, twice daily.",
  },
  Fatigue: {
    reason: "Physical or mental exhaustion.",
    how: "Due to lack of sleep, stress, or underlying illness.",
    medicine: "Proper rest, hydration, and multivitamins.",
  },
  "Irregular periods": {
    reason: "Hormonal imbalance.",
    how: "Stress, diet, or PCOS affecting hormone levels.",
    medicine: "Consult for hormonal profile, possible oral contraceptives.",
  },
  "Pelvic pain": {
    reason: "Infection or reproductive issues.",
    how: "Due to UTIs or ovarian cysts.",
    medicine: "Antibiotics course, start after test confirmation.",
  },
  Pregnancy: {
    reason: "Natural gestation process.",
    how: "Conception leads to hormonal and physical changes.",
    medicine: "Prenatal vitamins daily, ultrasound in 6 weeks.",
  },
  "Menstrual cramps": {
    reason: "Uterine muscle contractions.",
    how: "Prostaglandins cause cramping during menstruation.",
    medicine: "Mefenamic acid or ibuprofen during cramps.",
  },
  Rashes: {
    reason: "Skin inflammation or allergy.",
    how: "Allergic reaction or eczema.",
    medicine: "Topical steroids, apply morning and night.",
  },
  Itching: {
    reason: "Histamine release from allergens.",
    how: "Body’s immune response to irritants.",
    medicine: "Antihistamines before bedtime.",
  },
  Acne: {
    reason: "Excess oil and blocked pores.",
    how: "Hormones and bacteria clog follicles.",
    medicine: "Benzoyl peroxide gel at night, gentle cleanser twice daily.",
  },
  Eczema: {
    reason: "Chronic skin condition.",
    how: "Triggered by allergens or irritants.",
    medicine: "Moisturizers frequently, topical corticosteroids as needed.",
  },
  Cough: {
    reason: "Irritation in throat or lungs.",
    how: "Due to infections or allergies.",
    medicine: "Cough syrup thrice daily, warm fluids frequently.",
  },
  "Mild Fever": {
    reason: "Low-grade infection.",
    how: "Similar to general fever, often viral.",
    medicine: "Paracetamol every 8 hours if temp > 100°F.",
  },
  Vaccination: {
    reason: "Preventive immunization.",
    how: "Stimulates immune memory against diseases.",
    medicine: "Administered once; monitor for mild fever post-vaccine.",
  },
  "Ear Infection": {
    reason: "Bacterial or viral infection in middle ear.",
    how: "Often follows a cold or flu in children.",
    medicine: "Antibiotics if bacterial, pain relievers as needed.",
  },
  Headache: {
    reason: "Stress, tension or migraine.",
    how: "Muscle tension or neurotransmitter imbalance.",
    medicine: "Paracetamol or ibuprofen, hydration important.",
  },
  Seizures: {
    reason: "Sudden electrical activity in brain.",
    how: "Neurological imbalance or epilepsy.",
    medicine: "Anti-epileptic drugs prescribed post diagnosis.",
  },
  Dizziness: {
    reason: "Low blood pressure or inner ear issues.",
    how: "Affects balance and coordination.",
    medicine: "Rest, fluids, and electrolyte solution.",
  },
  "Memory Loss": {
    reason: "Aging, trauma, or neurodegeneration.",
    how: "Impairment in brain’s ability to retrieve information.",
    medicine: "Cognitive therapy and neuroprotective medication.",
  },
  "Stomach Pain": {
    reason: "Indigestion or gas.",
    how: "Improper digestion or acidity buildup.",
    medicine: "Antacid post-meal, light food for 3 days.",
  },
  Constipation: {
    reason: "Lack of fiber or dehydration.",
    how: "Slowed intestinal movement.",
    medicine: "Fiber supplements and mild laxative at night.",
  },
  Acidity: {
    reason: "Excess acid in stomach.",
    how: "Spicy food, irregular meals increase acid.",
    medicine: "Omeprazole daily before breakfast.",
  },
  Diarrhea: {
    reason: "Infection or food intolerance.",
    how: "Leads to rapid bowel movement and fluid loss.",
    medicine: "ORS for hydration, probiotics, light meals.",
  },
};

const ConsultationRoom = () => {
  const { userId } = useParams();
  const [selectedSymptom, setSelectedSymptom] = useState("");
  const location = useLocation();
  const appointment = location.state?.appointment;
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const symptoms = symptomOptions[appointment?.doctorSpeciality] || [];

  const handleCompleteAppointment = async (appointmentToComplete) => {
    try {
      await dispatch(
        completeAppointment({ userId, appointment: appointmentToComplete })
      ).unwrap();
      toast.success("Appointment marked as completed");
      navigate('/patient/appointmentsHistory')
    } catch (err) {
      toast.error(err || "Failed to complete appointment");
    }
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 10 }}>
      <Box display="flex" alignItems="center" mb={4}>
        <Avatar sx={{ bgcolor: "primary.main", mr: 3, width: 64, height: 64 }}>
          <LocalHospitalIcon fontSize="large" />
        </Avatar>
        <Box>
          <Typography variant="h4" fontWeight="bold">
            {appointment?.doctorName}
          </Typography>
          <Typography color="text.secondary">
            Specialization: {appointment?.doctorSpeciality}
          </Typography>
        </Box>
      </Box>

      <Typography variant="h6" gutterBottom>
        👨‍⚕️ {appointment?.doctorName}: Hello{" "}
        <Box
          component="span"
          sx={{
            color: "primary.main",
            fontWeight: 600,
            textTransform: "uppercase",
          }}
        >
          {appointment?.patientName}
        </Box>
        , I'm a {appointment?.doctorSpeciality}. How can I help you today?
      </Typography>

      <Divider sx={{ my: 3 }} />

      <Typography variant="h6" mb={2}>
        Select your symptom:
      </Typography>
      <Grid container spacing={2} mb={selectedSymptom ? 4 : 0}>
        {symptoms.map((symptom) => (
          <Grid item xs={12} sm={4} md={3} key={symptom}>
            <Button
              variant={selectedSymptom === symptom ? "contained" : "outlined"}
              fullWidth
              onClick={() => setSelectedSymptom(symptom)}
              disabled={!!selectedSymptom}
              sx={{
                textTransform: "none",
                borderRadius: 3,
                py: 1.5,
                fontWeight: 600,
              }}
            >
              {symptom}
            </Button>
          </Grid>
        ))}
      </Grid>

      {selectedSymptom && (
        <Box
          p={4}
          mt={2}
          bgcolor="#f9f9f9"
          border="1px solid #e0e0e0"
          borderRadius={4}
        >
          <Typography variant="h6" mb={1}>
            <HealingIcon sx={{ verticalAlign: "middle", mr: 1 }} />
            Diagnosis for: {selectedSymptom}
          </Typography>
          <Typography mb={1}>
            <strong>Reason:</strong> {doctorDiagnosis[selectedSymptom].reason}
          </Typography>
          <Typography mb={1}>
            <strong>How it happens:</strong>{" "}
            {doctorDiagnosis[selectedSymptom].how}
          </Typography>
          <Typography mb={2}>
            <strong>Medicine:</strong>{" "}
            <MedicationIcon
              sx={{ verticalAlign: "middle", fontSize: 18, mr: 0.5 }}
            />
            {doctorDiagnosis[selectedSymptom].medicine}
          </Typography>
          <Box textAlign="right">
            <Button
              variant="contained"
              color="success"
              endIcon={<CheckCircleIcon />}
              sx={{ px: 4, py: 1.5, borderRadius: 3, fontWeight: 600 }}
              onClick={() => handleCompleteAppointment(appointment)}
            >
              Complete Appointment
            </Button>
          </Box>
        </Box>
      )}
    </Container>
  );
};

export default ConsultationRoom;
