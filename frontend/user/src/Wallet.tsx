import { Box, Button } from '@mui/material';
import React from "react";
import { useNavigate } from "react-router-dom";
import profileImage from './assets/profile.png'; // Import the profile image
import walletImage from './assets/wallet.png';

interface WalletProps {
  receive: () => Promise<void>;
  logout: () => Promise<void>;
}

const Wallet: React.FC<WalletProps> = ({ receive, logout }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    receive()
  };

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
          gap: '16px', // Space between logout button and profile image
        }}
      >
        {/* Logout Button */}
        <Button
          onClick={logout}
          variant="contained"
          color="primary"
        >
          Logout
        </Button>

        {/* Profile Image */}
        <Box
          component="img"
          src={profileImage}
          alt="Profile"
          sx={{
            width: '40px', // Adjust the size as needed
            height: '40px',
            borderRadius: '50%', // Circular shape
            border: '2px solid #f0f0f0', // Optional border for visual separation
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
          gap: '8px', // Space between buttons
        }}
      >
        {/* Upload Documents Button */}
        <Button
          sx={{
            backgroundColor: 'white',
            color: 'black',
            fontWeight: 'normal',
            boxShadow: 'none',
            '&:hover': {
              backgroundColor: '#f0f0f0',
            },
          }}
          onClick={() => navigate("/select")}
        >
          Upload Documents
        </Button>

        {/* My Wallet Button */}
        <Button
          sx={{
            backgroundColor: 'white',
            color: 'black',
            fontWeight: 'bold',
            boxShadow: 'none',
            '&:hover': {
              backgroundColor: '#f0f0f0',
            },
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

      {/* Stretched Circular "Withdraw" Button */}
      <Box
        sx={{
          position: 'absolute',
          top: '230px', // Position from the bottom
          left: '490px', // Position from the left
          zIndex: 2,
        }}
      >
        <Button
          onClick={handleClick}
          variant="outlined" // Use outlined variant
          sx={{
            minWidth: '150px', // Wider for a pill shape
            height: '50px', // Adjust height for pill-like appearance
            backgroundColor: '#fff', // White background
            color: '#000', // Black text color
            borderColor: '#34D399', // Green outline
            borderRadius: '24px', // Rounded corners for pill shape
            textTransform: 'none', // Keep text casing as is
            fontSize: '16px', // Adjust font size as needed
            fontWeight: 500, // Adjust font weight
            '&:hover': {
              backgroundColor: '#ECFDF5', // Slightly lighter green on hover
            },
          }}
        >
          Withdraw
        </Button>
      </Box>
    </Box>
  );
};

export default Wallet;
