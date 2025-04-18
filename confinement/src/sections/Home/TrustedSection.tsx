'use client';
import React from 'react';
import { Box, Typography, Card, CardMedia, CardContent } from '@mui/material';
import { title } from 'process';

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
  return (
    <Box sx={{ py: 10, px: 4, textAlign: 'center' }}>
      {/* Title */}
      <Typography variant="h3" sx={{ color: '#f27b96', fontWeight: 'bold', mb: 5 }}>
        Trusted By Mothers Since 2011
      </Typography>
      <Typography variant="h6" sx={{ color: '#000000', mb: 2 }}>
        Chilli Padi Confinement strives to assist new mothers transit into postpartum comfortably by delivering delicious meals which restore hormonal balance and increase the production of breast milk.
      </Typography>
      <Typography variant="h6" sx={{ color: '#000000', mb: 8 }}>
        Over the past decade, we have served our confinement meals to over thirty thousand new mothers. Thank you for allowing us to be a part of your confinement journey!
      </Typography>

      {/* Cards */}
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
                sx={{
                  width: '100%',
                  height: '250px',
                  objectFit: 'cover',
                  borderRadius: 2,
                }}
              />

              <CardContent sx={{ px: 0 }}>
                <Typography variant="h5" color="#f27b96" sx={{ fontWeight: 'bold', mb: 1 }}>
                  {item.title}
                </Typography>

                {item.text.split('\n').map((line, idx) => (
                  <Typography key={idx} variant="body2" color="#828282" paragraph>
                    {line}
                  </Typography>
                ))}
              </CardContent>

            </Card>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default TrustedSection;
