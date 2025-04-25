import General_physician from "../../assets/General_physician.svg";
import Gynecologist from "../../assets/Gynecologist.svg";
import Neurologist from "../../assets/Neurologist.svg";
import Pediatricians from "../../assets/Pediatricians.svg";
import Dermatologist from "../../assets/Dermatologist.svg";
import AllDoctors from "../../assets/AllDoctors.png";
import Gastroenterologist from "../../assets/Gastroenterologist.svg";
import { Box, Typography } from "@mui/material";

const specialityData = [
  {
    speciality: "All Doctors",
    image: AllDoctors,
  },
  {
    speciality: "General Physician",
    image: General_physician,
  },
  {
    speciality: "Gynecologist",
    image: Gynecologist,
  },
  {
    speciality: "Dermatologist",
    image: Dermatologist,
  },
  {
    speciality: "Pediatricians",
    image: Pediatricians,
  },
  {
    speciality: "Neurologist",
    image: Neurologist,
  },
  {
    speciality: "Gastroenterologist",
    image: Gastroenterologist,
  },
];

const SpecialityMenu = ({ onSelectSpeciality }) => {
  return (
    <Box
      sx={{
        scrollbarWidth: "none",
        overflowX: "auto",
        display: "flex",
        width: "100%",
        maxWidth: { xs: "320px", sm: "600px", lg: "100%" },
      }}
    >
      {specialityData.map((item, index) => (
        <Box key={index}>
          <Box
            onClick={() => onSelectSpeciality(item.speciality)}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              textAlign="center"
              sx={{
                minWidth: "110px",
                pt: 3,
                cursor: "pointer",
                transition: "transform 0.5s",
                "&:hover": { transform: "translateY(-10px)" },
              }}
            >
              <Box
                component="img"
                src={item.image}
                alt="Speciality"
                sx={{
                  width: item.speciality === "All Doctors" ? 100 : 66,
                  height: item.speciality === "All Doctors" ? 100 : 66,
                  position: item.speciality === "All Doctors" && "relative",
                  bottom: item.speciality === "All Doctors" && "10px",
                }}
              />
              <Typography
                variant="body2"
                sx={{
                  fontSize: "12px",
                  mt: item.speciality === "All Doctors" ? 0 : 0,
                  position: item.speciality === "All Doctors" && "relative",
                  bottom: item.speciality === "All Doctors" && "34px",
                }}
              >
                {item.speciality}
              </Typography>
            </Box>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default SpecialityMenu;
