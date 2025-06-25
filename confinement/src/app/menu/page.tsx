import MenuSelection from '@/sections/menu/menupage';
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default async function Menu() {
  await wait(1000);
  return (
    <>
      <Header />
      <MenuSelection />
      <Footer />
    </>
  );
}
function wait(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}