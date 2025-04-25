import { Stack, styled } from "@mui/material";

export const FormWrapper = styled(Stack)(({ theme }) => ({
    flexDirection: "row",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  }));

  export const ButtonWrapper = styled(Stack)(({ theme }) => ({
    flexDirection: "column",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "row",
    },
  }));