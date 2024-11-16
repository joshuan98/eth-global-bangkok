import { Box, Button, Checkbox } from '@mui/material';
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

  // Number of rows and columns in the grid
  const numRows = 3;
  const numCols = 3;

  if (loading) {
    return <Loading />;
  }

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: '100vh', // Full viewport height
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

      {/* Container with Background Image and Grid */}
      <Box
        sx={{
          width: '100%',
          height: '100%',
          position: 'relative',
          backgroundImage: `url(${selectImage})`,
          backgroundSize: 'auto 100%', // Stretch image to fit
          backgroundPosition: 'center',
          display: 'grid',
          gridTemplateRows: `repeat(${numRows}, 1fr)`,
          gridTemplateColumns: `repeat(${numCols}, 1fr)`,
        }}
      >
        {Array.from({ length: numRows * numCols }).map((_, index) => (
          <Box
            key={index}
            sx={{
              border: '1px solid transparent', // Optional border for debugging
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Checkbox />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Select;
