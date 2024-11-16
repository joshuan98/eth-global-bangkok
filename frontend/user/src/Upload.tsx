import { Box, Button } from '@mui/material';
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import profileImage from './assets/profile.png'; // Import the profile image
import uploadImage from './assets/upload.png';
import Loading from "./Loading"; // Import the Loading component

interface UploadProps {
  logout: () => Promise<void>;
}

const Upload: React.FC<UploadProps> = ({ logout }) => {
  const [loading, setLoading] = useState(false); // State to control loading
  const navigate = useNavigate();

  const handleUploadClick = () => {
    setLoading(true); // Start loading
    setTimeout(() => {
      setLoading(false); // Stop loading after 2 seconds
      navigate("/fields1"); // Navigate to Fields1
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

      {/* Upload Image */}
      <Box
        component="img"
        src={uploadImage}
        alt="Landing"
        sx={{
          width: '100%',
          height: 'auto',
          display: 'block',
        }}
      />

      {/* Purple Upload Button */}
      <Box
        sx={{
          position: 'absolute',
          bottom: '180px', // Positioning the button near the bottom of the page
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
            textTransform: 'none', // Keeps the text as "Upload" instead of uppercase
          }}
          onClick={handleUploadClick} // Call handleUploadClick on button click
        >
          Upload
        </Button>
      </Box>
    </Box>
  );
};

export default Upload;
