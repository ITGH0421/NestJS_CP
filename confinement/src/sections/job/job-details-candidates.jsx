import { varAlpha } from 'minimal-shared/utils';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import Pagination from '@mui/material/Pagination';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export function JobDetailsCandidates({ candidates }) {
  return (
    <>
      <Box
        sx={{
          gap: 3,
          display: 'grid',
          gridTemplateColumns: { xs: 'repeat(1, 1fr)', md: 'repeat(3, 1fr)' },
        }}
      >
        {candidates.map((candidate) => (
          <Card key={candidate.id} sx={{ p: 3, gap: 2, display: 'flex' }}>
            <IconButton sx={{ position: 'absolute', top: 8, right: 8 }}>
              <Iconify icon="eva:more-vertical-fill" />
            </IconButton>

            <Avatar alt={candidate.name} src={candidate.avatarUrl} sx={{ width: 48, height: 48 }} />

            <Stack spacing={2}>
              <ListItemText
                primary={candidate.name}
                secondary={candidate.role}
                secondaryTypographyProps={{
                  mt: 0.5,
                  component: 'span',
                  typography: 'caption',
                  color: 'text.disabled',
                }}
              />

              <Box sx={{ gap: 1, display: 'flex' }}>
                <IconButton
                  size="small"
                  color="error"
                  sx={[
                    (theme) => ({
                      borderRadius: 1,
                      bgcolor: varAlpha(theme.vars.palette.error.mainChannel, 0.08),
                      '&:hover': { bgcolor: varAlpha(theme.vars.palette.error.mainChannel, 0.16) },
                    }),
                  ]}
                >
                  <Iconify width={18} icon="solar:phone-bold" />
                </IconButton>

                <IconButton
                  size="small"
                  color="info"
                  sx={[
                    (theme) => ({
                      borderRadius: 1,
                      bgcolor: varAlpha(theme.vars.palette.info.mainChannel, 0.08),
                      '&:hover': { bgcolor: varAlpha(theme.vars.palette.info.mainChannel, 0.16) },
                    }),
                  ]}
                >
                  <Iconify width={18} icon="solar:chat-round-dots-bold" />
                </IconButton>

                <IconButton
                  size="small"
                  color="primary"
                  sx={[
                    (theme) => ({
                      borderRadius: 1,
                      bgcolor: varAlpha(theme.vars.palette.primary.mainChannel, 0.08),
                      '&:hover': {
                        bgcolor: varAlpha(theme.vars.palette.primary.mainChannel, 0.16),
                      },
                    }),
                  ]}
                >
                  <Iconify width={18} icon="fluent:mail-24-filled" />
                </IconButton>

                <Tooltip title="Download CV">
                  <IconButton
                    size="small"
                    color="secondary"
                    sx={[
                      (theme) => ({
                        borderRadius: 1,
                        bgcolor: varAlpha(theme.vars.palette.secondary.mainChannel, 0.08),
                        '&:hover': {
                          bgcolor: varAlpha(theme.vars.palette.secondary.mainChannel, 0.16),
                        },
                      }),
                    ]}
                  >
                    <Iconify width={18} icon="eva:cloud-download-fill" />
                  </IconButton>
                </Tooltip>
              </Box>
            </Stack>
          </Card>
        ))}
      </Box>

      <Pagination count={10} sx={{ mt: { xs: 5, md: 8 }, mx: 'auto' }} />
    </>
  );
}
