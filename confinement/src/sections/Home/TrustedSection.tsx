'use client';

import React from 'react';
import { Box, Typography, Card, CardMedia, CardContent, useMediaQuery, useTheme } from '@mui/material';

import { Navigation, Pagination, EffectCreative } from 'swiper/modules';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-creative';
import 'swiper/css/pagination';

const trustedItems = [
  {
    image: '/TrustedPortion/CPC_Unboxing_GIF_397x397_1_540x.webp',
    title: 'Convenience & Quality',
    text: `Our unique thermal wares ensure that warm and nutritious meals are delivered to your doorstep timely. Skip the hassle on meal planning, grocery shopping, cooking or washing dishes.\nIndulge in the luxury of spending quality time with your newborn and family.Focus on your loved ones and let us focus on your well-being.`,
  },
  {
    image: '/TrustedPortion/MicrosoftTeams-image_43_540x.webp',
    title: 'Meals crafted for your recovery',
    text: `Our meals are prepared low in sodium and MSG-free without compromising the taste.\n These essential nutrients and traditional herbs improve digestion, support healthy lactation and restore the body's core energy.`,
  },
  {
    image: '/TrustedPortion/Confinement_3_720x.webp',
    title: 'Calchemy Firbre™ for Rice',
    text: `At Chilli Padi Confinement, we enhance our Fragrant White Rice with Alchemy Fibre™ for Rice, providing a healthier choice for new mothers.\nThis revolutionary blend of low GI, high fiber, and prebiotics transforms white rice, significantly increasing its fibre content without compromising taste or texture.`,
  },
];

const TrustedSection: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (

    <Box sx={{ py: 9, px: 4, textAlign: 'center' }}>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        viewport={{ once: true }}
      >
        <Typography variant="h4" sx={{ color: '#f27b96', mb: 5 }}>
          Trusted By Mothers Since 2011
        </Typography>
        <Typography sx={{ color: '#6D6E71', mb: 2, mx: { xs: 2, md: 10 } }}>
          Chilli Padi Confinement strives to assist new mothers transit into postpartum comfortably by delivering delicious meals which restore hormonal balance and increase the production of breast milk.
        </Typography>
        <Typography sx={{ color: '#6D6E71', mb: 8, mx: { xs: 2, md: 10 } }}>
          Over the past decade, we have served our confinement meals to over thirty thousand new mothers. Thank you for allowing us to be a part of your confinement journey!
        </Typography>
      </motion.div>
      {isMobile ? (
        <Swiper
          modules={[EffectCreative, Pagination]}
          effect="creative"
          grabCursor
          centeredSlides
          slidesPerView="auto"
          pagination={{ clickable: true }}
          creativeEffect={{
            prev: {
              shadow: true,
              translate: ['-120%', 0, -500],
              scale: 0.8,
            },
            next: {
              translate: ['120%', 0, -500],
              scale: 0.8,
            },
          }}
          style={{ paddingBottom: '40px' }}
        >
          {trustedItems.map((item, index) => (
            <SwiperSlide key={index} style={{ width: '90%' }}>
              <Card
                sx={{
                  borderRadius: 2,
                  boxShadow: 'none',
                  backgroundColor: 'transparent',
                }}
              >
                <CardMedia
                  component="img"
                  image={item.image}
                  alt={`Trusted Info ${index + 1}`}
                  sx={{ width: '100%', height: '250px', objectFit: 'cover', borderRadius: 2 }}
                />
                <CardContent sx={{ textAlign: 'left' }}>
                  <Typography variant="h5" color="#f27b96" sx={{ mb: 1 }}>
                    {item.title}
                  </Typography>
                  {item.text.split('\n').map((line, idx) => (
                    <Typography key={idx} variant="body2" color="#6D6E71" paragraph>
                      {line}
                    </Typography>
                  ))}
                </CardContent>
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>

      ) : (
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 4,
            justifyContent: 'center',
          }}
        >
          {trustedItems.map((item, index) => (
            <Box
              key={index}
              sx={{
                width: { xs: '100%', sm: '45%', md: '30%' },
                color: 'white',
                textAlign: 'left',
              }}
            >
              <Card
                sx={{
                  borderRadius: 2,
                  boxShadow: 'none',
                  backgroundColor: 'transparent',
                }}
              >
                <CardMedia
                  component="img"
                  image={item.image}
                  alt={`Trusted Info ${index + 1}`}
                  sx={{ width: '100%', height: '250px', objectFit: 'cover', borderRadius: 2 }}
                />
                <CardContent sx={{ px: 0 }}>
                  <Typography variant="h5" color="#f27b96" sx={{ mb: 1 }}>
                    {item.title}
                  </Typography>
                  {item.text.split('\n').map((line, idx) => (
                    <Typography key={idx} variant="body2" color="#6D6E71" paragraph>
                      {line}
                    </Typography>
                  ))}
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default TrustedSection;
