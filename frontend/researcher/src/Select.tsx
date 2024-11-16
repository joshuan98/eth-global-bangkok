import { Box, Button, Typography } from '@mui/material';
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import selectImage from './assets/select.png';
import Loading from "./Loading";

interface SelectProps {
  logout: () => Promise<void>;
}

const Select: React.FC<SelectProps> = ({ logout }) => {
  const [loading, setLoading] = useState(false); // Track loading state
  const navigate = useNavigate();

  // Handle files when dropped
  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files);

    if (files.length > 0) {
      setLoading(true);  // Show Loading component
      setTimeout(() => {
        setLoading(false);  // Hide Loading component after 2 seconds
        navigate("/upload");  // Navigate to /upload
      }, 2000);  // 2-second delay
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  if (loading) {
    return <Loading />; // Show Loading component when loading is true
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

      {/* Select Image */}
      <Box
        component="img"
        src={selectImage}
        alt="Landing"
        sx={{
          width: '100%',
          height: 'auto',
          display: 'block',
        }}
      />

      {/* Drag-and-Drop Area */}
      <Box
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        sx={{
          position: 'absolute',
          top: '55%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '400px',
          height: '200px',
          border: '2px dashed #888',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          backgroundColor: '#f0f0f0',
          zIndex: 1,
        }}
      >
        <Typography variant="body1" color="textSecondary">
          Drag and drop a file here to proceed
        </Typography>
      </Box>
    </Box>
  );
};

export default Select;
