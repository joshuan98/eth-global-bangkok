import { Box, Button } from '@mui/material';
import React from "react";
import { useNavigate } from "react-router-dom";
import walletImage from './assets/wallet.png';

interface WalletProps {
  sendTransaction: () => Promise<void>;
  logout: () => Promise<void>;
}

const Wallet: React.FC<WalletProps> = ({ sendTransaction, logout }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    sendTransaction()
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
      {/* Logout Button */}
      <Box
        sx={{
          position: 'absolute',
          top: '16px',
          right: '32px',
          zIndex: 1,
        }}
      >
        <Button
          onClick={logout}
          variant="contained"
          color="primary"
        >
          Logout
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
          top: '210px', // Position from the bottom
          left: '440px', // Position from the left
          zIndex: 2,
        }}
      >
        <Button
          onClick={handleClick}
          variant="outlined" // Use outlined variant
          sx={{
            minWidth: '130px', // Wider for a pill shape
            height: '40px', // Adjust height for pill-like appearance
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
