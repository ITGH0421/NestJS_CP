'use client';
import React, { useEffect, useState } from 'react';
import { Box, Typography, Fade, Slide } from '@mui/material';
import Image from 'next/image';

const Root: React.FC = () => {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setInView(true), 100); // slight delay to trigger
    return () => clearTimeout(timer);
  }, []);

  return (
    <Box
      sx={{
        position: 'relative',
        px: { xs: 2, md: 20 },
        py: 5,
        overflow: 'hidden',
        backgroundImage: 'url("/AboutUs/cpc-dish.png")',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(255, 255, 255, 0.83)',
          zIndex: 0,
        }}
      />

      <Fade in={inView} timeout={1000}>
        <Slide direction="up" in={inView} timeout={2000}>
          <Box
            sx={{
              position: 'relative',
              zIndex: 1,
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              gap: { xs: 4, md: 6 },
              alignItems: 'center',
            }}
          >
            {/* Text */}
            <Box sx={{ flex: 1 }}>
              <Typography
                variant="h4"
                sx={{
                  
                  color: '#f27b96',
                  mb: 2,
                  textAlign: { xs: 'center', md: 'left' },
                }}
              >
                Our Roots
              </Typography>
              <Typography paragraph sx={{ textAlign: { xs: 'center', md: 'left' }, color: '#6D6E71'}}>
                Chilli Padi started off as a restaurant which was founded in 1997 and has been synonymous with authentic
                Peranakan Cuisine, rich heritage and gourmet excellence. We have since built an island-wide footprint with our
                catering arm, flagship restaurant and chain of cafeterias, collectively known as{' '}
                <Box component="span" sx={{ textDecoration: 'underline', fontWeight: 500 }}>
                  Chilli Padi Holding
                </Box>.
              </Typography>
              <Typography paragraph sx={{ textAlign: { xs: 'center', md: 'left' }, color: '#6D6E71' }}>
                Over the years, Chilli Padi has received numerous accolades including the coveted Singapore’s Best Restaurant by
                Singapore Tatler, Asia Pacific Brands Award and Promising SME500, among others.
              </Typography>
              <Typography paragraph sx={{ textAlign: { xs: 'center', md: 'left' }, color: '#6D6E71' }}>
                In 2011, we initially offered our confinement meals at our restaurant. Encouraged by the positive response and
                demand, we expanded to serve mummies islandwide during their postpartum recovery.
              </Typography>
            </Box>

            {/* Image */}
            <Box
              sx={{
                width: { xs: '100%', sm: '80%', md: 280 },
                maxWidth: 340,
                mx: { xs: 'auto', md: 0 },
                borderRadius: 3,
                overflow: 'hidden',
              }}
            >
              <Image
                src="/AboutUs/owner.jpeg"
                alt="Founder of Chilli Padi"
                width={280}
                height={400}
                style={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: '12px',
                  objectFit: 'cover',
                }}
              />
            </Box>
          </Box>
        </Slide>
      </Fade>
    </Box>
  );
};

export default Root;
