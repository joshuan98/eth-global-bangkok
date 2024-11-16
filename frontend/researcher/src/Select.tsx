import { Masonry } from '@mui/lab';
import { Box, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import profileImage from './assets/profile.png'; // Import the profile image
import selectImage from './assets/select.png';
import data from './data.json';
import Loading from "./Loading"; // Import the Loading component

interface SelectProps {
  logout: () => Promise<void>;
}

const Select: React.FC<SelectProps> = ({ logout }) => {
  const [loading, setLoading] = useState(false); // Loading state for payment submission
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({});
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const initialCheckedState: { [key: string]: boolean } = {};
    Object.values(data).flat().forEach((item) => {
      initialCheckedState[item] = false;
    });
    setCheckedItems(initialCheckedState);
  }, []);

  const handleCheckboxChange = (item: string) => {
    setCheckedItems((prevState) => ({
      ...prevState,
      [item]: !prevState[item],
    }));
  };

  const handleUnlockDataClick = () => {
    setOpenDialog(true); // Open the dialog on button click
  };

  const handleDialogClose = () => {
    setOpenDialog(false); // Close the dialog
  };

  const handlePaymentSubmit = () => {
    setLoading(true); // Start loading
    setTimeout(() => {
      setLoading(false); // Stop loading after 3 seconds
      setOpenDialog(false); // Close dialog after payment submission
      console.log("Payment processed successfully.");
      navigate("/report");
    }, 3000); // 3 seconds delay for loading
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
        overflow: 'hidden',
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
        src={selectImage}
        alt="Landing"
        sx={{
          width: '100%',
          height: 'auto',
          display: 'block',
        }}
      />

      {/* Checkbox Masonry Overlay */}
      <Box
        sx={{
          padding: 3,
          position: 'absolute',
          top: "180px",
          zIndex: 1,
          marginTop: '100px',
          width: '95%',
        }}
      >
        <Masonry
          columns={{ xs: 1, sm: 2, md: 4 }}
          spacing={2}
        >
          {Object.entries(data).map(([category, items]) => (
            <Box
              key={category}
              sx={{
                backgroundColor: 'white',
                borderRadius: '8px',
                padding: 2,
                color: 'black',
              }}
            >
              <Typography variant="h6" fontWeight="bold" mb={2}>
                {category}
              </Typography>

              {items.map((item) => (
                <FormControlLabel
                  key={item}
                  control={
                    <Checkbox
                      checked={checkedItems[item] || false}
                      onChange={() => handleCheckboxChange(item)}
                      sx={{
                        color: 'black',
                        '&.Mui-checked': {
                          color: 'black',
                        },
                      }}
                    />
                  }
                  label={
                    <Typography
                      color="black"
                      variant="body2"
                      sx={{ display: 'block' }}
                    >
                      {item}
                    </Typography>
                  }
                  sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    margin: 0,
                  }}
                />
              ))}
            </Box>
          ))}
        </Masonry>

        {/* Unlock Data Button Below Masonry */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: 4,
          }}
        >
          <Button
            variant="contained"
            sx={{
              height: '100px',
              width: '310px',
              backgroundColor: '#651FFF',
              color: '#fff',
              padding: '10px 20px',
              borderRadius: '8px',
              fontWeight: 'bold',
              fontSize: '32px',
              textTransform: 'none',
            }}
            onClick={handleUnlockDataClick}
          >
            Unlock Data
          </Button>
        </Box>
      </Box>

      {/* Payment Dialog */}
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Payment Information</DialogTitle>
        <DialogContent
          sx={{
            backgroundColor: '#f7f7f7',
          }}
        >
          <TextField
            autoFocus
            margin="dense"
            label="Cardholder Name"
            type="text"
            fullWidth
            variant="outlined"
            sx={{
              backgroundColor: '#e0e0e0',
              borderRadius: '4px',
              mb: 2,
            }}
          />
          <TextField
            margin="dense"
            label="Card Number"
            type="text"
            fullWidth
            variant="outlined"
            sx={{
              backgroundColor: '#e0e0e0',
              borderRadius: '4px',
              mb: 2,
            }}
          />
          <Box
            sx={{
              display: 'flex',
              gap: 2,
            }}
          >
            <TextField
              margin="dense"
              label="Expiration Date (MM/YY)"
              type="text"
              variant="outlined"
              sx={{
                backgroundColor: '#e0e0e0',
                borderRadius: '4px',
                width: '50%',
              }}
            />
            <TextField
              margin="dense"
              label="CVV"
              type="password"
              variant="outlined"
              sx={{
                backgroundColor: '#e0e0e0',
                borderRadius: '4px',
                width: '50%',
              }}
            />
          </Box>
          {/* Total Amount Display */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-start',
              marginTop: 3,
            }}
          >
            <Typography variant="h6" fontWeight="bold" color="black">
              Total: $2,349.57
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handlePaymentSubmit} color="primary" variant="contained">
            Submit Payment
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Select;
