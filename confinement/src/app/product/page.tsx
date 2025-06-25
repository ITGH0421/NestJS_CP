import ProductListView from '@/sections/product/productlist';
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import products from '@/data/product.json';
import { Box, Typography } from '@mui/material';

export default  async function ProductView() {
  await wait(1000);
  return (
    <>
      <Header />
      <Box sx={{ padding: 2 }} display='flex' flexDirection='column' alignItems='flex-start'>
        <Typography variant='h3' color='primary'>Product</Typography>
        <ProductListView products={products} />
      </Box>
      <Footer />
    </>
  );
}
function wait(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}