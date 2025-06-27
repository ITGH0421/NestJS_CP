import { varAlpha } from 'minimal-shared/utils';

import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container';

import { CONFIG } from 'src/global-config';

import { componentLayoutClasses } from './classes';

// ----------------------------------------------------------------------

export const GridWrapper = styled('div')(({ theme }) => ({
  display: 'grid',
  gap: 'var(--wrapper-gap)',
  padding: theme.spacing(8, 'var(--wrapper-gutters)', 15, 'var(--wrapper-gutters)'),
  [theme.breakpoints.up('md')]: {
    gridTemplateColumns: 'var(--nav-width) auto',
    [`& .${componentLayoutClasses.primaryNav}`]: {
      display: 'flex',
    },
  },
  [theme.breakpoints.up(1440)]: {
    gridTemplateColumns: 'var(--nav-width) auto var(--nav-width)',
    [`& .${componentLayoutClasses.secondaryNav}`]: {
      display: 'flex',
    },
  },
}));

export const FlexibleContainer = styled(Container)(({ theme }) => ({
  padding: 0,
  minWidth: 0,
  [theme.breakpoints.up('sm')]: {
    padding: 0,
  },
}));

export const FlexibleSection = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--section-gap)',
  padding: 'var(--section-padding)',
  borderRadius: theme.shape.borderRadius * 2,
  backgroundColor: theme.vars.palette.background.neutral,
}));

// ----------------------------------------------------------------------

export const HeroArea = styled('section')(({ theme }) => ({
  minHeight: 240,
  display: 'flex',
  position: 'relative',
  alignItems: 'center',
  padding: theme.spacing(5, 0),
  '&::before': {
    ...theme.mixins.bgGradient({
      images: [
        `linear-gradient(0deg, ${varAlpha(theme.vars.palette.background.defaultChannel, 0.9)}, ${varAlpha(theme.vars.palette.background.defaultChannel, 0.9)})`,
        `url(${CONFIG.assetsDir}/assets/background/background-3-blur.webp)`,
      ],
    }),
    top: 0,
    left: 0,
    zIndex: -1,
    content: "''",
    width: '100%',
    height: '100%',
    position: 'absolute',
    transform: 'scaleX(-1)',
  },
}));
