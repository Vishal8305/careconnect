import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import AppointmentImage from '../../assets/appointment_img.png';
import { useNavigate } from 'react-router-dom';

const BannerContainer = styled(Box)({
  display: 'flex',
  backgroundColor: '#5f6FFF',
  borderRadius: '8px',
  padding: '20px',
  marginTop: '30px',
  marginBottom: '30px',
  '@media (min-width: 640px)': { padding: '40px' },
  '@media (min-width: 768px)': { padding: '56px', marginLeft: '40px', marginRight: '40px' },
  '@media (min-width: 1024px)': { padding: '48px' },
});

const LeftContainer = styled(Box)({
  flex: 1,
  paddingTop: '32px',
  paddingBottom: '32px',
  '@media (min-width: 640px)': { paddingTop: '40px', paddingBottom: '40px' },
  '@media (min-width: 768px)': { paddingTop: '64px', paddingBottom: '64px' },
  '@media (min-width: 1024px)': { paddingTop: '96px', paddingLeft: '20px' },
});

const RightContainer = styled(Box)({
  display: 'none',
  '@media (min-width: 768px)': { display: 'block', width: '50%', position: 'relative' },
  '@media (min-width: 1024px)': { width: '370px' },
});

const Banner = () => {
  const navigate = useNavigate()
  return (
    <BannerContainer sx={{mt: {xs:'50px'}}}>
      {/* ----- Left Side --------- */}
      <LeftContainer>
        <Typography
          variant="h4"
          sx={{ fontWeight: 'bold', color: 'white', fontSize: { xs: '1.25rem', sm: '1.5rem', md: '2rem', lg: '3rem' } }}
        >
          Book Appointment
        </Typography>
        <Typography
          sx={{ fontWeight: 'bold', color: 'white', marginTop: '16px', fontSize: { xs: '1.25rem', sm: '1.5rem', md: '2rem', lg: '3rem' } }}
        >
          With 100+ Trusted Doctors
        </Typography>
        <Button
          sx={{
            backgroundColor: 'white',
            color: 'gray',
            paddingX: '32px',
            paddingY: '12px',
            borderRadius: '50px',
            marginTop: '24px',
            textTransform: 'none',
            fontSize: { xs: '0.875rem', sm: '1rem' },
            '&:hover': { transform: 'scale(1.05)' },
            transition: 'all 0.3s ease-in-out',
          }}
          onClick={()=>navigate('/roleSelection')}
        >
          Create account
        </Button>
      </LeftContainer>
      {/*  --------- Right Side ----------- */}
      <RightContainer>
        <Box
          component="img"
          src={AppointmentImage}
          alt=""
          sx={{
            width: '100%',
            position: 'absolute',
            bottom: 0,
            right: 0,
            maxWidth: 'md',
          }}
        />
      </RightContainer>
    </BannerContainer>
  );
};

export default Banner;