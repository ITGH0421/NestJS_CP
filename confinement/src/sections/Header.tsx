'use client';
import React, { useState } from 'react';
import {
  AppBar,
  Box,
  Button,
  Drawer,
  IconButton,
  Link,
  Stack,
  Toolbar,
  Typography,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Image from 'next/image';
import NextLink from 'next/link';

const Header: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isTabletOrBelow = useMediaQuery('(max-width: 835px)'); // includes iPad Mini, iPad Air, and smaller

  const navItems = [
    { label: 'About Us', path: '/aboutUs' },
    { label: 'Menu', path: '/menu' },
    { label: 'E-Store', path: '/e-store' },
    { label: 'Confinement Tips', path: '/confinementTips' },
    { label: 'FAQ', path: '/faq' },
  ];

  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar sx={{ justifyContent: 'space-between', px: 2, py: 2 }}>
        {/* Logo */}
        <Link component={NextLink} href="/" underline="none">
          <Box sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
            <Image
              src="/Logo/confiment_2019_logo_pink_long_Compressed.png"
              alt="Chilli Padi Confinement Logo"
              width={isTabletOrBelow ? 135 : 180}
              height={isTabletOrBelow ? 50 : 60}
              priority
            />
          </Box>
        </Link>

        {/* Desktop Navigation */}
        {!isTabletOrBelow && (
          <Stack direction="row" spacing={4} alignItems="center">
            {navItems.map((item) => (
              <Link
                key={item.label}
                component={NextLink}
                href={item.path}
                underline="none"
                sx={{
                  color: '#f27b96',
                  fontWeight: 500,
                  fontSize: '1rem',
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                }}
              >
                {item.label}
              </Link>
            ))}
            <Button
              component={NextLink}
              href="/order"
              variant="contained"
              sx={{
                backgroundColor: '#f27b96',
                color: '#fff',
                borderRadius: '12px',
                px: 4,
                py: 1.5,
                textTransform: 'none',
                fontWeight: 'bold',
                '&:hover': {
                  backgroundColor: '#e26782',
                },
              }}
            >
              Order Now
            </Button>
          </Stack>
        )}

        {/* Mobile Hamburger Menu */}
        {isTabletOrBelow && (
          <IconButton onClick={() => setDrawerOpen(true)} sx={{ color: '#f27b96' }}>
            <MenuIcon />
          </IconButton>
        )}
      </Toolbar>

      {/* Mobile Drawer */}
      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 250, p: 3 }}>
          <IconButton onClick={() => setDrawerOpen(false)} sx={{ mb: 2 }}>
            <CloseIcon />
          </IconButton>
          <Stack spacing={2}>
            {navItems.map((item) => (
              <Link
                key={item.label}
                component={NextLink}
                href={item.path}
                underline="none"
                sx={{ color: '#f27b96', fontWeight: 500 }}
                onClick={() => setDrawerOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Button
              component={NextLink}
              href="/OrderNow"
              variant="contained"
              sx={{
                backgroundColor: '#f27b96',
                color: '#fff',
                borderRadius: '12px',
                textTransform: 'none',
                fontWeight: 'bold',
                '&:hover': {
                  backgroundColor: '#e26782',
                },
              }}
            >
              Order Now
            </Button>
          </Stack>
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default Header;
