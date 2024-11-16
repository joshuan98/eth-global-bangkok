import { Box, Button } from '@mui/material';
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import selectImage from './assets/select.png';
import Loading from "./Loading";

interface SelectProps {
  logout: () => Promise<void>;
}

const Select: React.FC<SelectProps> = ({ logout }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle files when dropped
  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files);

    if (files.length > 0) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        navigate("/upload");
      }, 2000);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

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
      {/* Logout Button at the Top Right */}
      <Box
        sx={{
          position: 'absolute',
          top: '16px',
          right: '32px',
          zIndex: 2,
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

      {/* Background Image */}
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

      {/* Invisible Drag-and-Drop Area */}
      <Box
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 1,
        }}
      />
    </Box>
  );
};

export default Select;
