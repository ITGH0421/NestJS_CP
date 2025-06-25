
import { Box, Typography } from '@mui/material';
import Image from 'next/image';

const partners = [
  { name: 'Mummies Club', src: '/Partners/Mummies_Club_Logo_160x160@2x.webp' },
  { name: 'Mount Alvernia', src: '/Partners/MA_160x160@2x.webp' },
  { name: 'BMB', src: '/Partners/bmb-logo-transparent_160x160@2x.avif' },
  { name: 'BYEOL', src: '/Partners/bbyeol_logo_160x160@2x.avif' },
  { name: 'Queen', src: '/Partners/MyQueen_Logo_160x160@2x.avif' },
];

export default function PartnersSection() {
  return (
    <Box sx={{ py: 8, px: 2, textAlign: 'center', backgroundColor: 'white' }}>
      <Typography
        variant="h5"
        sx={{
          fontWeight: 'bold',
          color: '#f27b96',
          mb: 6,
          letterSpacing: 2,
          textTransform: 'uppercase',
        }}
      >
        Partners
      </Typography>

      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: { xs: 4, md: 6 },
          maxWidth: 1200,
          mx: 'auto',
        }}
      >
        {partners.map((partner) => (
          <Box
            key={partner.name}
            sx={{
              width: { xs: 120, sm: 140, md: 160 },
              height: { xs: 80, sm: 100, md: 110 },
              position: 'relative',
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'scale(1.05)',
              },
            }}
          >
            <Image
              src={partner.src}
              alt={partner.name}
              fill
              style={{ objectFit: 'contain' }}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
}
