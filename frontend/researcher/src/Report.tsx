import { Box, Button, Typography } from '@mui/material';
import React, { useState } from "react";
import Lottie from 'react-lottie-player';
import { useNavigate } from "react-router-dom";
import profileImage from './assets/profile.png'; // Import the profile image
import reportImage from './assets/report.png';
import successAnimation from './assets/success.json'; // Import your Lottie JSON file
import successImage from './assets/success.png'; // Import success image
import Loading from "./Loading"; // Import the Loading component

interface ReportProps {
  logout: () => Promise<void>;
}

const Report: React.FC<ReportProps> = ({ logout }) => {
  const [loading, setLoading] = useState(false); // State to control loading
  const [showSuccess, setShowSuccess] = useState(false); // State to control success display
  const navigate = useNavigate();

  const handleUploadClick = () => {
    setLoading(true); // Start loading

    setTimeout(() => {
      setLoading(false); // Stop loading after 2 seconds
      setShowSuccess(true); // Show success display

      const link = document.createElement("a");
      link.href = `./assets/report.csv`; // Path for public assets
      link.download = "report.csv";
      link.click();
      setTimeout(() => setShowSuccess(false), 4000); // Hide success after 4 seconds
    }, 1000); // 1 seconds delay for download simulation
  };

  // Show the Loading component if loading is true
  if (loading) {
    return <Loading />;
  }

  // Show the success message and animation if showSuccess is true
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
          animation: 'fadeInOut 5s ease-in-out', // Apply the fade animation
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
            borderRadius: '50%', // Makes the image circular
            objectFit: 'cover', // Ensures the image scales well within the circular shape
          }}
        />

        {/* Success Text */}
        <Typography variant="h5" color="primary" fontWeight="bold" mt={2}>
          Download Successful!
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
          gap: '8px',
        }}
      >
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

      {/* Background Image */}
      <Box
        component="img"
        src={reportImage}
        alt="Landing"
        sx={{
          width: '100%',
          height: 'auto',
          display: 'block',
        }}
      />

      {/* Purple Download Button */}
      <Box
        sx={{
          position: 'absolute',
          bottom: '370px', // Positioning the button near the bottom of the page
          left: '50%',
          transform: 'translateX(-50%)', // Center horizontally
          zIndex: 1,
        }}
      >
        <Button
          variant="contained"
          sx={{
            height: '100px',
            width: '350px',
            backgroundColor: '#651FFF', // Purple background color
            color: '#fff', // White text color
            padding: '10px 20px', // Padding for size
            borderRadius: '16px', // Rounded corners
            fontWeight: 'bold',
            fontSize: '32px', // Font size to match your example
            textTransform: 'none', // Keeps the text as "Download Now" instead of uppercase
          }}
          onClick={handleUploadClick} // Call handleUploadClick on button click
        >
          Download Now
        </Button>
      </Box>
    </Box>
  );
};

export default Report;
