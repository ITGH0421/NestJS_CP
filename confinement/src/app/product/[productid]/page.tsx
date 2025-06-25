import ProductDetailPage from '@/sections/product/productview';
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import products from '@/data/product.json';
import addon from '@/data/addon.json';

export default async function ProductView() {
  await wait(1000);
  return (
    <>
      <Header />
        <ProductDetailPage products={products} />
      <Footer />
    </>
  );
}
function wait(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}