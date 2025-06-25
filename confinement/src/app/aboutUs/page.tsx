import { Box, Typography } from "@mui/material"
import Root from '@/sections/aboutUs/Root'
import Missionpoint from '@/sections/aboutUs/Missionpoint'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default async function AboutUs() {
  // await wait(1000);
  return (
    <>
    {/* <Header /> */}
    <Typography>Testing testing </Typography>
    {/* <Footer/> */}
    </>

    // <>
    // 
    //   <Root />
    //   {/* Mission */}
    //   <Box sx={{ textAlign: 'center', my: 5 }}>
    //     <Typography variant="h4" sx={{ color: '#f27b96', mb: 2 }}>
    //       Our Mission
    //     </Typography>
    //     <Typography sx={{ maxWidth: 600, mx: 'auto', color: '#6D6E71' }}>
    //       We strongly believe new mothers can greatly benefit by getting more rest, instead of feeling the need to bounce right back after childbirth.
    //     </Typography>
    //   </Box>
    //   {/* Mission Points */}
    //   <Missionpoint />
    //   {/* CTA */}
    //   <Box
    //     sx={{
    //       py: 6,
    //       px: 10,
    //       textAlign: 'center',
    //       color: '#6D6E71',
    //       borderRadius: 4,
    //     }}
    //   >
    //     <Typography sx={{ mb: 2 }}>
    //       We bring convenience with our array of nourishing confinement dishes delivered right to your doorstep,
    //       allowing you the luxury of spending quality time with your newborn and family, as well as ensuring you
    //       get adequate rest for your postpartum recovery!
    //     </Typography>
    //   </Box>
    //     
    // </>
  );
}

// function wait(ms: number) {
//   return new Promise(resolve => setTimeout(resolve, ms));
// }
