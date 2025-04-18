import { Box, Typography, Avatar, Card, CardContent } from "@mui/material"

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
            width: '100vw', // 👈 full viewport width
            mx: 0, // 👈 reset margin
            px: 0, // 👈 reset horizontal padding
            backgroundImage: 'url("/TrustedPortion/MicrosoftTeams-image_43_540x.webp")',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
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
                p: 4,
                borderRadius: 4,
                boxShadow: 3,
                backgroundColor: '#fff',
            }}
        >
            {missionPoints.map((point, index) => (
                <Card
                    key={index}
                    elevation={0}
                    sx={{
                        display: 'flex',
                        gap: 2,
                        alignItems: 'flex-start',
                        backgroundColor: 'transparent',
                    }}
                >
                    <Avatar sx={{ bgcolor: '#f27b96', fontWeight: 'bold' }}>{index + 1}</Avatar>
                    <CardContent sx={{ px: 0, pb: '0 !important' }}>
                        <Typography variant="body1">{point}</Typography>
                    </CardContent>
                </Card>
            ))}
        </Box>
    </Box>
    );


};

export default Missionpoint;




