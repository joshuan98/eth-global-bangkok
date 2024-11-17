import { Box, Button, Typography } from '@mui/material';
import React, { useState } from "react";
import Lottie from 'react-lottie-player';
import { useNavigate } from "react-router-dom";
import profileImage from './assets/profile.png';
import successAnimation from './assets/success.json';
import successImage from './assets/success.png';
import walletImage from './assets/wallet.png';
import Loading from "./Loading"; // Import the Loading component

interface WalletProps {
  receive: () => Promise<void>;
  logout: () => Promise<void>;
}

const Wallet: React.FC<WalletProps> = ({ receive, logout }) => {
  const [loading, setLoading] = useState(false); // State to control loading
  const [showSuccess, setShowSuccess] = useState(false); // State to control success display
  const navigate = useNavigate();

  const handleClick = () => {
    setLoading(true); // Start loading
    receive();

    setTimeout(() => {
      setLoading(false); // Stop loading after 5 seconds
      setShowSuccess(true); // Show success display

      setTimeout(() => setShowSuccess(false), 4000); // Hide success after 4 seconds
    }, 5000); // 5 seconds delay for success message
  };

  // Show the Loading component if loading is true
  if (loading) {
    return <Loading />;
  }

  // Show the success message if showSuccess is true
  if (showSuccess) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          backgroundColor: '#f0f0f0',
          padding: '20px',
          animation: 'fadeInOut 5s ease-in-out',
        }}
      >
        {/* Success Lottie Animation */}
        <Lottie
          loop={true}
          animationData={successAnimation}
          play
          style={{ width: 200, height: 200 }}
        />

        {/* Success Image */}
        <Box
          component="img"
          src={successImage}
          alt="Success"
          sx={{
            width: '150px',
            height: '150px',
            marginTop: 2,
            borderRadius: '50%', // Circular shape
            objectFit: 'cover', // Ensures the image scales well
          }}
        />

        {/* Success Text */}
        <Typography variant="h5" color="primary" fontWeight="bold" mt={2}>
          Withdrawal Successful!
        </Typography>

        {/* Fade-in and Fade-out Animation */}
        <style>
          {`
            @keyframes fadeInOut {
              0% { opacity: 0; }
              10% { opacity: 1; }
              90% { opacity: 1; }
              100% { opacity: 0; }
            }
          `}
        </style>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        margin: 0,
        padding: 0,
        overflowX: 'hidden',
      }}
    >
      {/* Logout Button and Profile Image at the Top Right */}
      <Box
        sx={{
          position: 'absolute',
          top: '16px',
          right: '32px',
          zIndex: 2,
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
        }}
      >
        <Button onClick={logout} variant="contained" color="primary">
          Logout
        </Button>
        <Box
          component="img"
          src={profileImage}
          alt="Profile"
          sx={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            border: '2px solid #f0f0f0',
          }}
        />
      </Box>

      {/* Top Left Container for Upload Documents and My Wallet Buttons */}
      <Box
        sx={{
          position: 'absolute',
          top: '16px',
          left: '250px',
          zIndex: 2,
          display: 'flex',
          gap: '8px',
        }}
      >
        <Button
          sx={{
            backgroundColor: 'white',
            color: 'black',
            fontWeight: 'normal',
            boxShadow: 'none',
            '&:hover': { backgroundColor: '#f0f0f0' },
          }}
          onClick={() => navigate("/select")}
        >
          Upload Documents
        </Button>
        <Button
          sx={{
            backgroundColor: 'white',
            color: 'black',
            fontWeight: 'bold',
            boxShadow: 'none',
            '&:hover': { backgroundColor: '#f0f0f0' },
          }}
          onClick={() => navigate("/wallet")}
        >
          My Wallet
        </Button>
      </Box>

      {/* Wallet Image */}
      <Box
        component="img"
        src={walletImage}
        alt="Landing"
        sx={{
          width: '100%',
          height: 'auto',
          display: 'block',
        }}
      />

      {/* Withdraw Button */}
      <Box
        sx={{
          position: 'absolute',
          top: '210px',
          left: '440px',
          zIndex: 2,
        }}
      >
        <Button
          onClick={handleClick}
          variant="outlined"
          sx={{
            minWidth: '130px',
            height: '40px',
            backgroundColor: '#fff',
            color: '#000',
            borderColor: '#34D399',
            borderRadius: '24px',
            textTransform: 'none',
            fontSize: '16px',
            fontWeight: 500,
            '&:hover': { backgroundColor: '#ECFDF5' },
          }}
        >
          Withdraw
        </Button>
      </Box>
    </Box>
  );
};

export default Wallet;
