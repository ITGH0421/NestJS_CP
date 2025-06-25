import CheckoutCart from '@/sections/cart/cartpage';
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import addon from '@/data/addon.json';

export default async function ProductView() {
  await wait(1000);
  return (
    <>
      <Header />
        <CheckoutCart addon={addon}/>
      <Footer />
    </>
  );
}
function wait(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}