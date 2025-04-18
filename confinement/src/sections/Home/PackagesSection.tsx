import React from 'react';
import { Box, Typography, Card, CardMedia, CardContent, Button } from '@mui/material';

const packages = [
  {
    image: '/Menu/HakkaYellowWineChickenwithBlackFungus_360x.webp',
    name: '28 Days Dual Meal',
    price: '$1,768.00 (U.P)',
    discounted: 'Early Bird 5%: $1,679.60',
    promo: '(EB5OFF)',
  },
  {
    image: '/Menu/MindBoostingWalnutBlackBeanPorkRibsSoup_360x.webp',
    name: '21 Days Dual Meal',
    price: '$1,368.00 (U.P)',
    discounted: 'Early Bird 5%: $1,299.60',
    promo: '(EB5OFF)',
  },
  {
    image: '/Menu/PapayaFishsoup_360x.webp',
    name: '14 Days Dual Meal',
    price: '$968.00 (U.P)',
    discounted: 'Early Bird 5%: $919.60',
    promo: '(EB5OFF)',
  },
];

const PackagesSection = () => {
  return (
    <Box sx={{ py: 0, px: 4, textAlign: 'center' }}>
      <Typography variant="h4" sx={{ color: '#f27b96', fontWeight: 'bold', mb: 4 }}>
        Our Packages
      </Typography>

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
                alt={`Package ${index + 1}`}
              />
              <CardContent sx={{ textAlign: 'left' }}>
              <Typography fontWeight="bold">{item.name}</Typography>
                <Typography color="text.secondary">{item.price}</Typography>
                <Typography color="text.secondary">{item.discounted}</Typography>
                <Typography color="text.secondary">{item.promo}</Typography>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>
      {/* Order Now Button */}
      <Button
        variant="contained"
        href="/order"
        sx={{
          backgroundColor: '#f27b96',
          color: '#fff',
          borderRadius: '12px',
          px: 4,
          py: 1.5,
          mt: 4,
          textTransform: 'none',
          fontWeight: 'bold',
          '&:hover': {
            backgroundColor: '#e26782',
          },
        }}
      >
        Order Now
      </Button>
    </Box>
  );
};

export default PackagesSection;
