// components/ConfinementTipsGrid.tsx
'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Chip,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Stack,
  Pagination
} from '@mui/material';
import articles from '@/data/article.json';

const getAllTags = (items: typeof articles) => {
  const tags = new Set<string>();
  items.forEach((item) => item.tags.forEach((tag) => tags.add(tag)));
  return Array.from(tags);
};

const ConfinementTipsGrid = () => {
  const [filter, setFilter] = useState('All');
  const [page, setPage] = useState(1);
  const articlesPerPage = 9;
  const allTags = getAllTags(articles);

  const filteredTips =
    filter === 'All'
      ? [...articles].sort((a, b) => Number(b.id.split('-')[1]) - Number(a.id.split('-')[1]))
      : [...articles]
          .filter((tip) => tip.tags.includes(filter))
          .sort((a, b) => Number(b.id.split('-')[1]) - Number(a.id.split('-')[1]));

  const totalPages = Math.ceil(filteredTips.length / articlesPerPage);
  const paginatedTips = filteredTips.slice(
    (page - 1) * articlesPerPage,
    page * articlesPerPage
  );

  return (
    <Box sx={{ px: { xs: 2, md: 6 }, py: 8 }}>
      <Typography variant="h4" align="center" sx={{ mb: 4, color: '#f27b96' }}>
        Confinement Tips
      </Typography>

      {/* Filter Dropdown */}
      <FormControl sx={{ minWidth: 200, mb: 4 }} size="small">
        <InputLabel>Filter By</InputLabel>
        <Select
          value={filter}
          label="Filter By"
          onChange={(e) => {
            setFilter(e.target.value);
            setPage(1);
          }}
        >
          <MenuItem value="All" sx={{ color: '#f27b96' }}>All Topic</MenuItem>
          {allTags.map((tag) => (
            <MenuItem key={tag} value={tag} sx={{ color: '#f27b96' }}>
              {tag.charAt(0).toUpperCase() + tag.slice(1)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Tips Flexbox Grid */}
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 4,
          justifyContent: 'center'
        }}
      >
        {paginatedTips.map((tip) => (
          <Box
            key={tip.id}
            sx={{
              width: { xs: '100%', sm: '45%', md: '30%' },
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <Card sx={{ borderRadius: 2, display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="img"
                image={tip.image}
                alt={tip.title}
                sx={{ height: 200, objectFit: 'cover' }}
              />
              <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h6" gutterBottom sx={{ color: '#f27b96' }}>
                  {tip.title}
                </Typography>
                <Typography variant="body2" color="#6D6E71" gutterBottom sx={{ flexGrow: 1 }}>
                  {tip.description}
                </Typography>
                <Stack direction="row" spacing={1.5} flexWrap="wrap" rowGap={1.5} mb={2} mt={2}>
                  {tip.tags.map((tag, i) => (
                    <Chip
                      key={i}
                      label={tag}
                      size="small"
                      sx={{ backgroundColor: '#fff0f3', color: '#f27b96', mt: 1 }}
                    />
                  ))}
                </Stack>
                <Box display="flex">
                  <Link href={`/ConfinementTips/${tip.id}`} passHref>
                    <Button size="small" variant="contained" sx={{ backgroundColor: '#f27b96', borderRadius: 2 }}>
                      Read More
                    </Button>
                  </Link>
                </Box>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>

      {/* Pagination */}
      {totalPages > 1 && (
        <Box mt={6} display="flex" justifyContent="center">
          <Pagination
            count={totalPages}
            page={page}
            onChange={(e, value) => setPage(value)}
            color="primary"
            variant="outlined"
          />
        </Box>
      )}
    </Box>
  );
};

export default ConfinementTipsGrid;
