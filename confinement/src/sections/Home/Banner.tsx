'use client';

import React from 'react';
import CarouselBasic from '@/components/carousel/CarouselBasic';


const images = [
  '/banners/Confinement_Banner.png',
  '/banners/Confinement_Banner_2.png',
  '/banners/Confinement_Banner_3.png',
];


const Banner: React.FC = () => {
  return (
    <CarouselBasic
      images={images}
      sx={{
        height: { xs: '250px', sm: '300px', md: '400px' },
        mb: 6,
      }}
    />
  );
};

export default Banner;
