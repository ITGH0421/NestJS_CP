import { Box, Typography } from "@mui/material"


const CTA: React.FC = () => {
    return (
        <Box sx={{ px: 4, py: 6 }}>
        <Box
            sx={{
                py: 6,
                px: 4,
                textAlign: 'center',
                backgroundColor: '#fce9ed',
                borderRadius: 4,
            }}
        >
            <Typography sx={{ mb: 2 }}>
                We bring convenience with our array of nourishing confinement dishes delivered right to your doorstep,
                allowing you the luxury of spending quality time with your newborn and family, as well as ensuring you
                get adequate rest for your postpartum recovery!
            </Typography>
        </Box>
        </Box>
    );


};

export default CTA;




