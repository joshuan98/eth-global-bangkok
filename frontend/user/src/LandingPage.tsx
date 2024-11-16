import { Box } from '@mui/material';
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import React from 'react';
import landingImage from './assets/landing.png';

interface LandingPageProps {
  onSuccess: (response: CredentialResponse) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onSuccess }) => {
  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%', // Adjusted to use 100% width instead of 100vw
        margin: 0,
        padding: 0,
        overflowX: 'hidden', // Prevents horizontal scroll if any
      }}
    >
      {/* Google Login */}
      <Box
        sx={{
          position: 'absolute',
          top: '16px',
          right: '32px',
          zIndex: 1,
        }}
      >
        <GoogleLogin onSuccess={onSuccess} useOneTap />
      </Box>

      {/* Landing Image */}
      <Box
        component="img"
        src={landingImage}
        alt="Landing"
        sx={{
          width: '100%',
          height: 'auto', // Maintains the aspect ratio of the image
          display: 'block', // Removes any extra bottom spacing
        }}
      />
    </Box>
  );
};

export default LandingPage;
