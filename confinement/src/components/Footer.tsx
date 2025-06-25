'use client';
import React from 'react';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import { Box, IconButton, Stack, Typography } from '@mui/material';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer>
      <Box sx={{ backgroundColor: '#f5f5f5', px: { xs: 2, md: 6 }, pt: 6, pb: 4 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: 6,
            justifyContent: 'space-between',
          }}
        >
          {/* Logo and Contact */}
          <Box sx={{ flex: 1 }}>
            <Box mb={2}>
              <img
                src="/logo/confiment_2019_logo_pink_long_Compressed.png"
                alt="Chilli Padi Logo"
                width={200}
              />
            </Box>
            <Typography variant="body1" sx={{ color: '#f27b96' }}>
              3015 Bedok North Street 5, Shimei East Kitchen, #04-21
              <br />
              Singapore 486350
            </Typography>
            <Typography variant="body1" mt={2} sx={{ color: '#f27b96' }}>
              Phone:
            </Typography>
            <Typography variant="body1" sx={{ color: '#f27b96' }}>6914 9900</Typography>
            <Typography variant="body1" mt={1} sx={{ color: '#f27b96' }}>
              Email:
            </Typography>
            <Typography variant="body1" sx={{ color: '#f27b96' }}>
              confinement@chillipadi.com.sg
            </Typography>

            <Stack direction="row" spacing={2} mt={2}>
              <IconButton
                component="a"
                href="https://www.facebook.com/chillipadiconfinement"
                target="_blank"
                rel="noopener noreferrer"
                sx={{ color: '#f27b96' }}
              >
                <FacebookIcon />
              </IconButton>
              <IconButton
                component="a"
                href="https://www.instagram.com/chillipadiconfinement/"
                target="_blank"
                rel="noopener noreferrer"
                sx={{ color: '#f27b96' }}
              >
                <InstagramIcon />
              </IconButton>
            </Stack>
          </Box>

          {/* Quick Links */}
          <Box sx={{ flex: 1 }}>
            <Typography variant="subtitle1" gutterBottom sx={{ color: '#f27b96' }}>
              Quick Links
            </Typography>
            {[
              { label: 'Home', href: '/' },
              { label: 'About Us', href: '/aboutUs' },
              { label: 'Our Confinement Dishes', href: '' },
              { label: 'View Weekly Menu', href: '/menu' },
              { label: 'Confinement Packages', href: '/productList' },
              { label: 'Confinement Trial Meal', href: '' },
              { label: 'Baby Full Moon Gift Boxes', href: '' },
              { label: 'Baby Shower Celebration', href: '' },
              { label: 'Articles', href: '/confinementTips' },
              { label: 'Testimonials', href: '/Testimonials' },
              { label: 'FAQ', href: '/FAQ' },
            ].map((link) => (
              <Box key={link.label} sx={{ display: 'block', mb: 1 }}>
                <Link href={link.href} style={{ color: '#6D6E71', textDecoration: 'none' }}>
                  {link.label}
                </Link>
              </Box>
            ))}
          </Box>

          {/* Information */}
          <Box sx={{ flex: 1 }}>
            <Typography variant="subtitle1" gutterBottom sx={{ color: '#f27b96' }}>
              Information
            </Typography>
            <Typography variant="body1" sx={{ color: '#6D6E71' }}>
              Hotline/ Messenger Hours:
            </Typography>
            <Typography variant="body1" sx={{ color: '#6D6E71' }}>
              Mon - Fri: 9:00AM to 6:00PM
              <br />
              Sat: 9:00AM to 12:30PM
              <br />
              Sun, PH: Closed
            </Typography>

            <Typography variant="body1" mt={2} sx={{ color: '#6D6E71' }}>
              Please Note:
            </Typography>
            <Typography variant="body1" sx={{ color: '#6D6E71' }}>
              For E.D.D selection/new orders/next day activation/meal postponement and etc, we
              would need 1 working day’s notice (before 2PM) for delivery on weekdays or 2 working
              day’s notice (before 2PM) for delivery on weekends and PH. Any orders, activations or
              changes after operating hours would require 2 working day’s notice. Additional
              $20/trip for delivery to Sentosa. Do check with our team for menu schedules.
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 2 }}>
              <img src="/logo/payment/mastercard.svg" alt="Mastercard" width={40} />
              <img src="/logo/payment/unionpay.svg" alt="UnionPay" width={40} />
              <img src="/logo/payment/visa.svg" alt="Visa" width={40} />
            </Box>
          </Box>
        </Box>
        <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 6 }}>
          &copy; {new Date().getFullYear()}{' '}
          <Link href="/" style={{ color: 'inherit' }}>
            Confinement Food Delivery | Chilli Padi Confinement
          </Link>
          . All Rights Reserved.
        </Typography>
      </Box>
    </footer>
  );
}
