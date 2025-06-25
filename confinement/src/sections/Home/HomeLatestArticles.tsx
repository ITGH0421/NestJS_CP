'use client';

import React from 'react';
import { Box, Typography, Button, CardContent, CardMedia, useMediaQuery, useTheme } from '@mui/material';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import articles from '../../data/article.json';

const LatestArticles = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const latestArticles = [...articles]
    .sort((a, b) => b.id.localeCompare(a.id))
    .slice(0, 3);

  return (
    <Box sx={{ px: { xs: 2, md: 10 }, pb: 10 }}>
      <Typography variant="h4" align="center" sx={{ mb: 6, color: '#f27b96' }}>
        Latest Articles
      </Typography>

      {isMobile ? (
        <Swiper
          modules={[Navigation, Pagination]}
          navigation
          pagination={{ clickable: true }}
          spaceBetween={16}
          slidesPerView={1}
          parallax={true}
          style={{ position: 'relative' }}
        >
          {/* Optional parallax background */}
          <Box
            slot="container-start"
            className="parallax-bg"
            sx={{
              // backgroundImage: 'url(/images/bg-light.jpg)', // optional
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              zIndex: -1,
            }}
            data-swiper-parallax="-20%"
          />

          {latestArticles.map((article) => (
            <SwiperSlide key={article.id}>
              <Box
                sx={{
                  borderRadius: 3,
                  overflow: 'hidden',
                  boxShadow: 3,
                  backgroundColor: '#fff',
                }}
              >
                <CardMedia
                  component="img"
                  image={article.image}
                  alt={article.title}
                  sx={{ width: '100%', height: 240, objectFit: 'cover' }}
                  data-swiper-parallax="-30%"
                />
                <CardContent sx={{ p: 4 }}>
                  <Typography
                    variant="subtitle2"
                    color="text.secondary"
                    gutterBottom
                    data-swiper-parallax="-10%"
                  >
                    Confinement Tips
                  </Typography>
                  <Typography
                    variant="h5"
                    gutterBottom
                    sx={{ color: '#f27b96' }}
                    data-swiper-parallax="-20%"
                  >
                    {article.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ mb: 2, color: '#6D6E71' }}
                    data-swiper-parallax="-15%"
                  >
                    {article.description}
                  </Typography>
                  <Link href={`/confinement-tips/${article.id}`} passHref>
                    <Button
                      size="small"
                      variant="text"
                      sx={{ color: '#f27b96', fontWeight: 'bold' }}
                      data-swiper-parallax="-25%"
                    >
                      Get More Info &nbsp;↗
                    </Button>
                  </Link>
                </CardContent>
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>

      ) : (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4, justifyContent: 'center' }}>
          {latestArticles.map((article, index) => (
            <Box
              key={article.id}
              sx={{
                width: index === 2 ? { xs: '100%', sm: '93%' } : { xs: '100%', sm: '45%', md: '45%' },
                display: 'flex',
                flexDirection: index === 2 ? { xs: 'column', sm: 'row' } : 'column',
                borderRadius: 3,
                overflow: 'hidden',
                boxShadow: 3,
                minHeight: index === 2 ? { sm: 300 } : 'auto',
              }}
            >
              <CardMedia
                component="img"
                image={article.image}
                alt={article.title}
                sx={{
                  width: index === 2 ? { xs: '100%', sm: '50%' } : '100%',
                  height: index === 2 ? { xs: 240, sm: 'auto' } : 240,
                  objectFit: 'cover'
                }}
              />
              <CardContent sx={{ p: 4, display: 'flex', flexDirection: 'column', justifyContent: 'center', flex: 1 }}>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Confinement Tips
                </Typography>
                <Typography variant="h5" gutterBottom sx={{ color: '#f27b96' }}>
                  {article.title}
                </Typography>
                <Typography variant="body2" sx={{ mb: 2, color: '#6D6E71' }}>{article.description}</Typography>
                <Link href={`/confinement-tips/${article.id}`} passHref>
                  <Button size="small" variant="text" sx={{ color: '#f27b96', fontWeight: 'bold' }}>
                    Get More Info &nbsp;↗
                  </Button>
                </Link>
              </CardContent>
            </Box>
          ))}
        </Box>
      )}

      <Box textAlign="center" mt={6}>
        <Link href="/confinementTips" passHref>
          <Button variant="outlined" sx={{ color: '#f27b96', borderColor: '#f27b96' }}>
            View All Confinement Tips
          </Button>
        </Link>
      </Box>
    </Box>
  );
};

export default LatestArticles;
