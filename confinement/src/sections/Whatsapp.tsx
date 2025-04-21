'use client';
import React from 'react';
import { Box, IconButton } from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

const WhatsAppFloating = () => {
  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 24,
        right: 24,
        zIndex: 9999
      }}
    >
      <IconButton
        href="https://wa.me/6591234567" // replace with your number
        target="_blank"
        rel="noopener noreferrer"
        sx={{
          backgroundColor: '#25D366',
          color: '#fff',
          '&:hover': {
            backgroundColor: '#20b558'
          },
          width: 56,
          height: 56,
          boxShadow: 3
        }}
      >
        <WhatsAppIcon />
      </IconButton>
    </Box>
  );
};

export default WhatsAppFloating;
