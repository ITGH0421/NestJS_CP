'use client';

import { Box, Typography, Card, CardContent } from "@mui/material";
import { motion } from 'framer-motion';

const missionPoints = [
  "To provide post partum care for new mothers through our array of nourishing confinement dishes that restore mothers' hormonal balance, improve immunity and promote lactation thus providing optimal nutrition to the newborn.",
  "To share and spread the knowledge and benefits of consuming 'Superfoods' during confinement period.",
  "To aid new mothers' transition into postpartum comfortably by providing the convenience of having the homecooked meals delivered to their residence, ensuring that they have ample rest for a smooth postpartum recovery.",
  "To prepare meals using only freshest and finest ingredients daily in our own central kitchen. The finest crafted dishes which taste great, are low in sodium and MSG-free."
];

const Missionpoint: React.FC = () => {
  return (
    <Box
      sx={{
        width: '100vw',
        mx: 0,
        px: 0,
        py: 3,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
          maxWidth: 800,
          mx: 'auto',
          px: 2,
        }}
      >
        {missionPoints.map((point, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
          >
            <Card
              elevation={0}
              sx={{
                display: 'flex',
                gap: 2,
                alignItems: 'flex-start',
                backgroundColor: '#FACAD5',
                borderRadius: 4,
                py: 1,
                px: 2,
              }}
            >
              <CardContent>
                <Typography variant="body1" color="#6D6E71">{point}</Typography>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </Box>
    </Box>
  );
};

export default Missionpoint;
