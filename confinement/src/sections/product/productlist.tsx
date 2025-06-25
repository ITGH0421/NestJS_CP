'use client';

import { Box, Typography, Card, CardMedia, CardContent, CardActionArea } from '@mui/material';
import NextLink from 'next/link';
import { styled } from '@mui/material/styles';

type Product = {
  product_id: number;
  image: string;
  name: string;
  price: number;
  disabled?: boolean;
  onSale?: boolean;
};

export default function ProductListView({ products }: { products: Product[] }) {
  const ProductCard = styled(({ disabled, ...other }: { disabled?: boolean } & any) => (
    <Card {...other} />
  ))(({ theme, disabled }: { theme: any; disabled?: boolean }) => ({
    position: 'relative',
    borderRadius: theme.spacing(2),
    overflow: 'hidden',
    filter: disabled ? 'grayscale(100%)' : 'none',
    opacity: disabled ? 0.5 : 1,
  }));

  const ProductImage = styled(CardMedia)({
    paddingTop: '100%',
    position: 'relative',
  });

  return (
    <Box display="flex" gap={3} flexWrap="wrap" alignContent="flex-start" justifyContent="center">
      {products.map((product, i) => (
        <ProductCard key={i} sx={{ width: 260 }} >
          <CardActionArea
            component={NextLink}
            href={`/product/${product.product_id}`} // Adjust if your route is different
            sx={{ height: '100%' }}
          >
            <Box position="relative">
              <ProductImage image={product.image} />
            </Box>
            <CardContent>
              <Typography variant="subtitle2" noWrap>
                {product.name}
              </Typography>
              <Box display="flex" alignItems="center" justifyContent="space-between" mt={1}>
                <Box textAlign="right">
                  <Typography variant="subtitle2" fontWeight="bold">
                    ${product.price.toFixed(2)}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </CardActionArea>
        </ProductCard>
      ))}
    </Box>
  );
}
