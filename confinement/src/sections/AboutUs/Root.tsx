'use client';
import React from 'react';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';

const Root: React.FC = () => {
  return (
    <Box sx={{ px: { xs: 2, sm: 4, md: 10 }, pt: 5 }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: { xs: 4, md: 6 },
          justifyContent: 'space-between',
          alignItems: 'center',
          px: { xs: 2, md: 6 },
          py: 4,
          backgroundColor: '#fce9ed',
          borderRadius: 4,
        }}
      >
        {/* Text */}
        <Box sx={{ flex: 1 }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              color: '#f27b96',
              mb: 2,
              textAlign: { xs: 'center', md: 'left' },
            }}
          >
            Our Roots
          </Typography>
          <Typography paragraph sx={{ textAlign: { xs: 'center', md: 'left' } }}>
            Chilli Padi started off as a restaurant which was founded in 1997 and has been synonymous with authentic
            Peranakan Cuisine, rich heritage and gourmet excellence. We have since built an island-wide footprint with our
            catering arm, flagship restaurant and chain of cafeterias, collectively known as{' '}
            <Box component="span" sx={{ textDecoration: 'underline', fontWeight: 500 }}>
              Chilli Padi Holding
            </Box>.
          </Typography>
          <Typography paragraph sx={{ textAlign: { xs: 'center', md: 'left' } }}>
            Over the years, Chilli Padi has received numerous accolades including the coveted Singapore’s Best Restaurant by
            Singapore Tatler, Asia Pacific Brands Award and Promising SME500, among others.
          </Typography>
          <Typography paragraph sx={{ textAlign: { xs: 'center', md: 'left' } }}>
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
            src="/AboutUs/AboutUsPhoto.webp"
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
    </Box>
  );
};

export default Root;
