// src/components/carousel/CarouselBasic.tsx
'use client';

import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';

import { Box, SxProps } from '@mui/material';

type CarouselBasicProps = {
  images: string[];
  sx?: SxProps;
};

const CarouselBasic: React.FC<CarouselBasicProps> = ({ images, sx }) => {
  return (
    <Box sx={{ position: 'relative', overflow: 'hidden', ...sx }}>
      <Swiper
      modules={[Autoplay, Pagination]}
      spaceBetween={0}
      slidesPerView={1}
      pagination={{ clickable: true }}
      autoplay={{ delay: 5000 }}
      loop
      style={{ width: '100%', height: '100%' }}
    >
      {images.map((src, i) => (
        <SwiperSlide key={i}>
          <Box sx={{ position: 'relative', width: '100%', height: { xs: 250, md: 400 } }}>
            <img src={src} alt={`Slide ${i}`} style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
          </Box>
        </SwiperSlide>
      ))}
    </Swiper>
    </Box>
  );
};

export default CarouselBasic;
    
