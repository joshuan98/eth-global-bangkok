import { Box, Button } from '@mui/material';
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
            width: '310px',
            backgroundColor: '#651FFF', // Purple background color
            color: '#fff', // White text color
            padding: '10px 20px', // Padding for size
            borderRadius: '8px', // Rounded corners
            fontWeight: 'bold',
            fontSize: '16px', // Font size to match your example
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
