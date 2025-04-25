import React, { useState } from "react";
import { Box, Container, Paper, Grid, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Step1 from "./FormSteps/Step1";
import Step2 from "./FormSteps/Step2";
import Step3 from "./FormSteps/Step3";
import Step4 from "./FormSteps/Step4";
import { useDispatch, useSelector } from "react-redux";
import {
  resetForm,
  submitSignupForm,
} from "../../redux/module/auth/signupSlice";

const steps = [Step1, Step2, Step3, Step4];

const SignupPage = () => {
  const [step, setStep] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.signup.formData);

  const handleNext = () => {
    if (step < steps.length - 1) setStep(step + 1);
  };

  const handlePrev = () => {
    if (step > 0) setStep(step - 1);
  };

  const CurrentStep = steps[step];

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.preventDefault();
    console.log("Submitting Data:", formData);
    dispatch(submitSignupForm({ formData, navigate }));
  };

  const handleCancel = () => {
    navigate("/login");
    dispatch(resetForm());
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
      mt={6}
    >
      <Container maxWidth="lg">
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          sx={{ minHeight: "85vh" }}
        >
          <Paper sx={{ p: 3, width: { xs: "100%", sm: "70%" } }}>
            <CurrentStep />

            {/* Navigation Buttons */}
            <Grid container justifyContent="space-between" sx={{ mt: 4 }}>
              <Button
                variant="outlined"
                color="primary"
                onClick={handlePrev}
                disabled={step === 0}
              >
                Prev
              </Button>
              <div>
                <Button
                  variant="contained"
                  color="error"
                  sx={{ mr: 2 }}
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
                {step < 3 ? (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                  >
                    Next
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    type="submit"
                    disabled={!formData.agreeToTerms}
                    onClick={handleSubmit}
                    sx={{ backgroundColor: "#4F6EF7" }}
                  >
                    Submit
                  </Button>
                )}
              </div>
            </Grid>
          </Paper>
        </Grid>
      </Container>
    </Box>
  );
};

export default SignupPage;
