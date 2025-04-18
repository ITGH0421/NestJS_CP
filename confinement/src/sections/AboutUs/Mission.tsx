import { Box, Typography } from "@mui/material"


const Mission: React.FC = () => {
    return (
        <Box sx={{textAlign: 'center', my:5}}>
            <Typography variant="h4" sx={{ fontWeight: 700, color: '#f27b96', mb: 2 }}>
                Our Mission
            </Typography>
            <Typography sx={{ maxWidth: 600, mx: 'auto' }}>
                We strongly believe new mothers can greatly benefit by getting more rest, instead of feeling the need to bounce right back after childbirth.
            </Typography>
        </Box>
    );


};

export default Mission;




