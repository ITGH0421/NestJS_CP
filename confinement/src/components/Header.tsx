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
  useMediaQuery,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Image from 'next/image';
import NextLink from 'next/link';

const Header: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isTabletOrBelow = useMediaQuery('(max-width: 835px)');

  const navItems = [
    { label: 'About Us', path: '/aboutUs' },
    { label: 'Menu', path: '/menu' },
    { label: 'E-Store', path: '/e-store' },
    { label: 'Confinement Tips', path: '/confinementTips' },
    { label: 'FAQ', path: '/faq' },
  ];

  return (
    <AppBar
      position="static"
      color="transparent"
      elevation={0}
    >
      <Toolbar sx={{ justifyContent: 'space-between', px: 2, py: 2 }}>
        <Link component={NextLink} href="/" underline="none">
          <Box sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
            <Image
              src="/logo/confiment_2019_logo_pink_long_Compressed.png"
              alt="Chilli Padi Confinement Logo"
              width={isTabletOrBelow ? 135 : 180}
              height={isTabletOrBelow ? 50 : 60}
            />
          </Box>
        </Link>

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
                  fontSize: '1rem',
                  fontWeight: 400,
                  '&:hover': { textDecoration: 'underline' },
                }}
              >
                {item.label}
              </Link>
            ))}

            <Button
              component={NextLink}
              href="/product"
              variant="contained"
              sx={{
                backgroundColor: '#f27b96',
                color: '#fff',
                borderRadius: '12px',
                px: 4,
                py: 1.5,
                textTransform: 'none',
                fontWeight: 400,
                '&:hover': { backgroundColor: '#e26782' },
              }}
            >
              Order Now
            </Button>

            <IconButton
              component={NextLink}
              href="/cart"
              sx={{ color: '#f27b96', '&:hover': { color: '#e26782' } }}
            >
              <ShoppingCartIcon />
            </IconButton>
          </Stack>
        )}

        {isTabletOrBelow && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton
              component={NextLink}
              href="/cart"
              sx={{ color: '#f27b96', '&:hover': { color: '#e26782' } }}
            >
              <ShoppingCartIcon />
            </IconButton>
            <IconButton onClick={() => setDrawerOpen(true)} sx={{ color: '#f27b96' }}>
              <MenuIcon />
            </IconButton>
          </Box>
        )}
      </Toolbar>

      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 250, p: 3, backgroundColor: '#fff', height: '100%' }}>
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
                sx={{
                  color: '#f27b96',
                  fontWeight: 400,
                }}
                onClick={() => setDrawerOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Button
              component={NextLink}
              href="/product"
              variant="contained"
              sx={{
                backgroundColor: '#f27b96',
                color: '#fff',
                borderRadius: '12px',
                textTransform: 'none',
                fontWeight: 400,
                '&:hover': { backgroundColor: '#e26782' },
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
