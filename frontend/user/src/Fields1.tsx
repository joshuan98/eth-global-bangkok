import ArrowForwardIcon from '@mui/icons-material/ArrowForward'; // Import the Arrow icon
import { Box, Button } from '@mui/material';
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import fields1Image from './assets/fields1.png';
import Loading from "./Loading"; // Import the Loading component

interface Fields1Props {
  logout: () => Promise<void>;
}

const Fields1: React.FC<Fields1Props> = ({ logout }) => {
  const [loading, setLoading] = useState(false); // State to control loading
  const navigate = useNavigate();

  const handleClick = () => {
    setLoading(true); // Start loading
    setTimeout(() => {
      setLoading(false); // Stop loading after 2 seconds
      navigate("/fields2"); // Navigate to the next page after 2 seconds
    }, 2000);
  };

  // Show the Loading component if loading is true
  if (loading) {
    return <Loading />;
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

      {/* Fields1 Image */}
      <Box
        component="img"
        src={fields1Image}
        alt="Landing"
        sx={{
          width: '100%',
          height: 'auto',
          display: 'block',
        }}
      />

      {/* Circular Button */}
      <Box
        sx={{
          position: 'absolute',
          bottom: '450px', // Position from the bottom
          right: '32px', // Position from the right
          zIndex: 2,
        }}
      >
        <Button
          onClick={handleClick}
          variant="contained"
          sx={{
            width: '60px', // Set fixed width for circular shape
            height: '60px', // Set fixed height for circular shape
            backgroundColor: '#66748b', // Dark grey or purple shade for the button
            color: '#fff', // White icon color
            borderRadius: '50%', // Make the button circular
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)', // Optional shadow
            '&:hover': {
              backgroundColor: '#5a6b7b', // Slightly darker shade on hover
            },
          }}
        >
          <ArrowForwardIcon /> {/* Right arrow icon */}
        </Button>
      </Box>
    </Box>
  );
};

export default Fields1;
