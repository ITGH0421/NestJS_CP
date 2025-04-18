'use client';

import React, { useEffect, useState } from 'react';
import { Box, Fade } from '@mui/material';
import Image from 'next/image';

const images = [
  '/Banners/Confinement_Banner.jpg',
  '/Banners/Confinement_Banner_2.png',
  '/Banners/Confinement_Banner_3.jpg',
]; // Add your banner images here

const Banner: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFadeIn(false);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        setFadeIn(true);
      }, 500); // Fade-out time before switching
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: { xs: '250px', sm: '300px', md: '400px' },
        overflow: 'hidden',
        mb: 6,
      }}
    >
      <Fade in={fadeIn} timeout={600}>
        <Box sx={{ position: 'absolute', inset: 0 }}>
          <Image
            src={images[currentIndex]}
            alt={`Banner ${currentIndex + 1}`}
            fill
            style={{ objectFit: 'cover', objectPosition: 'center' }}
            priority
          />
        </Box>
      </Fade>
    </Box>
  );
};

export default Banner;
