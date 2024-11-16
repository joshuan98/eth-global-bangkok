import ArrowBackIcon from '@mui/icons-material/ArrowBack'; // Import the Back Arrow icon
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'; // Import the Arrow icon
import { Box, Button } from '@mui/material';
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import fields2Image from './assets/fields2.png';
import profileImage from './assets/profile.png'; // Import the profile image
import Loading from "./Loading"; // Import the Loading component

interface Fields2Props {
  logout: () => Promise<void>;
}

const Fields2: React.FC<Fields2Props> = ({ logout }) => {
  const [loading, setLoading] = useState(false); // State to control loading
  const navigate = useNavigate();

  const handleClick = () => {
    setLoading(true); // Start loading
    setTimeout(() => {
      setLoading(false); // Stop loading after 2 seconds
      navigate("/fields1"); // Navigate to the next page after 2 seconds
    }, 500);
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
            fontWeight: 'bold',
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
            fontWeight: 'normal',
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

      {/* Fields2 Image */}
      <Box
        component="img"
        src={fields2Image}
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

      <Box
        sx={{
          position: 'absolute',
          bottom: '450px', // Position from the bottom
          left: '50px', // Position from the left
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
          }}>
          <ArrowBackIcon /> {/* Left arrow icon */}
        </Button>
      </Box>
    </Box>
  );
};

export default Fields2;
