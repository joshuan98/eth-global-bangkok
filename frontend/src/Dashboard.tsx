import { Box, Button } from '@mui/material';
import React from "react";
import uploadImage from './assets/upload.png';

interface DashboardProps {
  logout: () => Promise<void>;
}

const Dashboard: React.FC<DashboardProps> = ({ logout }) => {
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
          variant="contained" // Gives the button a filled style
          color="primary"     // Sets a primary color (like blue by default)
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
    </Box>
  );
};

export default Dashboard;
