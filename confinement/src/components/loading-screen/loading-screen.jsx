'use client';

import { Fragment } from 'react';

import Portal from '@mui/material/Portal';
import { styled } from '@mui/material/styles';
import LinearProgress from '@mui/material/LinearProgress';

/**
 * @typedef {Object} LoadingScreenProps
 * @property {boolean} [portal]
 * @property {import('@mui/system').SxProps<import('@mui/material').Theme>} [sx]
 */

/**
 * @param {LoadingScreenProps & React.HTMLAttributes<HTMLDivElement>} props
 */
export function LoadingScreen({ portal, sx, ...other }) {
  const PortalWrapper = portal ? Portal : Fragment;

  return (
    <PortalWrapper>
      <LoadingContent sx={sx} {...other}>
        <LinearProgress  sx={{ width: 1, maxWidth: 360, color:"#f27b96"}} />
      </LoadingContent>
    </PortalWrapper>
  );
}

const LoadingContent = styled('div')(({ theme }) => ({
  flexGrow: 1,
  width: '100%',
  display: 'flex',
  minHeight: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  paddingLeft: theme.spacing(5),
  paddingRight: theme.spacing(5),
}));
