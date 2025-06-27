import { varAlpha } from 'minimal-shared/utils';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import InputBase from '@mui/material/InputBase';

// ----------------------------------------------------------------------

export function BankingInviteFriends({ price, title, imgUrl, description, sx, ...other }) {
  return (
    <Box
      sx={[
        (theme) => ({
          p: 5,
          borderRadius: 2,
          position: 'relative',
          color: 'common.white',
          backgroundImage: `linear-gradient(135deg, ${theme.vars.palette.primary.main}, ${theme.vars.palette.primary.dark})`,
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <Box
        component="img"
        alt="Invite"
        src={imgUrl}
        sx={{
          top: 16,
          right: 16,
          zIndex: 9,
          width: 128,
          height: 128,
          position: 'absolute',
        }}
      />

      <Box sx={{ whiteSpace: 'pre-line', typography: 'h6' }}>{title}</Box>

      <Box sx={{ typography: 'h2' }}>{price}</Box>

      <Box sx={{ mt: 2, mb: 3, typography: 'body2' }}>{description}</Box>

      <InputBase
        fullWidth
        placeholder="Email"
        endAdornment={
          <Button color="warning" variant="contained" size="small" sx={{ mr: 0.5 }}>
            Invite
          </Button>
        }
        inputProps={{
          id: 'email-input',
          sx: { color: 'common.white', '&::placeholder': { opacity: 0.48, color: 'inherit' } },
        }}
        sx={[
          (theme) => ({
            pl: 1.5,
            height: 40,
            borderRadius: 1,
            bgcolor: varAlpha(theme.vars.palette.common.blackChannel, 0.12),
          }),
        ]}
      />
    </Box>
  );
}
