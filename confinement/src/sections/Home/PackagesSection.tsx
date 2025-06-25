'use client';
import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button,
  useMediaQuery,
  GlobalStyles,
  useTheme,
} from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/parallax';


// --- Static data declared outside component to avoid reallocation on re-renders ---
const packages = [
  {
    image: '/menu/HakkaYellowWineChickenwithBlackFungus_360x.webp',
    name: '28 Days Dual Meal',
    description: 'A 28-days meal plan with dual options for Lunch and Dinner.',
    price: '$1,768.00',
  },
  {
    image: '/menu/MindBoostingWalnutBlackBeanPorkRibsSoup_360x.webp',
    name: '21 Days Dual Meal',
    description: 'A 21-days meal plan with dual options for Lunch and Dinner.',
    price: '$1,368.00',
  },
  {
    image: '/menu/PapayaFishsoup_360x.webp',
    name: '14 Days Dual Meal',
    description: 'A 14-days meal plan with dual options for Lunch and Dinner.',
    price: '$968.00',
  },
];

const PackagesSection: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery('(max-width:600px)');

  return (
    <Box sx={{ py: 0, px: 4, textAlign: 'center', backgroundColor: theme.palette.background.default }}>
      <Typography variant="h4" sx={{ color: theme.palette.primary.main, mb: 4 }}>
        Our Packages
      </Typography>

      {/* Mobile Swiper */}
      {isMobile ? (
        <>
          <GlobalStyles
            styles={{
              '.swiper-button-next, .swiper-button-prev': {
                color: theme.palette.primary.main,
                zIndex: 10,
              },
              '.swiper-button-next:hover, .swiper-button-prev:hover': {
                color: theme.palette.primary.dark,
              },
            }}
          />

          <Swiper
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            parallax={true}
            speed={800}
            style={{ position: 'relative' }}
          >
            <Box
              slot="container-start"
              data-swiper-parallax="-30%"
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: theme.palette.background.default,
              }}
            />

            {packages.map((item, index) => (
              <SwiperSlide key={index}>
                <Box sx={{ px: 2 }}>
                  <Card
                    sx={{
                      boxShadow: 'none',
                      backgroundColor: 'transparent',
                    }}
                  >
                    <CardMedia
                      component="img"
                      image={item.image}
                      alt={`Package ${index + 1}`}
                      loading="lazy"
                      data-swiper-parallax="20%"
                    />
                    <CardContent sx={{ textAlign: 'left' }}>
                      <Typography
                        variant="subtitle1"
                        color={theme.palette.primary.main}
                        data-swiper-parallax="-100"
                      >
                        {item.name}
                      </Typography>
                      <Typography color="text.secondary" data-swiper-parallax="-150">
                        {item.price}
                      </Typography>
                    </CardContent>
                  </Card>
                </Box>
              </SwiperSlide>
            ))}
          </Swiper>
        </>
      ) : (
        // Desktop Grid View
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 4,
            justifyContent: 'center',
          }}
        >
          {packages.map((item, index) => (
            <Box key={index} sx={{ width: { xs: '100%', sm: '45%', md: '30%' } }}>
              <Card sx={{ boxShadow: 'none', backgroundColor: 'transparent' }}>
                <CardMedia
                  component="img"
                  image={item.image}
                  alt={item.name}
                  loading="lazy"
                />
                <CardContent sx={{ textAlign: 'left' }}>
                  <Typography variant="subtitle1" color={theme.palette.primary.main}>
                    {item.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {item.description}
                  </Typography>
                  <Typography color="text.secondary">{item.price}</Typography>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>
      )}

      {/* CTA Button */}
      <Button
        variant="contained"
        href="/order"
        sx={{
          backgroundColor: theme.palette.primary.main,
          color: '#fff',
          borderRadius: '12px',
          px: 4,
          py: 1.5,
          mt: 4,
          textTransform: 'none',
          fontWeight: 600,
          '&:hover': {
            backgroundColor: theme.palette.primary.dark,
          },
        }}
      >
        Order Now
      </Button>
    </Box>
  );
};

export default PackagesSection;
