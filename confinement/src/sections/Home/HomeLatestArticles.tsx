'use client';

import React from 'react';
import { Box, Typography, Button, Card, CardContent, CardMedia } from '@mui/material';
import Link from 'next/link';
import articles from '../../data/article.json';

const LatestArticles = () => {
  const latestArticles = [...articles]
    .sort((a, b) => b.id.localeCompare(a.id))
    .slice(0, 3);

  return (
    <Box sx={{ px: { xs: 2, md: 6 }, pb: 10 }}>
      <Typography variant="h4" align="center" sx={{ mb: 6, fontWeight: 'bold', color: '#f27b96' }}>
        Latest Articles
      </Typography>

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
              <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ color: '#f27b96' }}>
                {/* <Box component="span" sx={{ color: '#d2a04f' }}>{article.title.split(' ')[0]}</Box>{' '}
                {article.title.split(' ').slice(1).join(' ')} */}
                {article.title}
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>{article.description}</Typography>
              <Link href={`/confinement-tips/${article.id}`} passHref>
                <Button size="small" variant="text" sx={{ color: '#3f51b5', fontWeight: 'bold' }}>
                  Get More Info &nbsp;↗
                </Button>
              </Link>
            </CardContent>
          </Box>
        ))}
      </Box>

      <Box textAlign="center" mt={6}>
        <Link href="/confinement-tips" passHref>
          <Button variant="outlined" sx={{ color: '#f27b96', borderColor: '#f27b96' }}>
            View All Confinement Tips
          </Button>
        </Link>
      </Box>
    </Box>
  );
};

export default LatestArticles;