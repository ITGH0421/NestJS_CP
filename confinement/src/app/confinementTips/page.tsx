
import ConfinementTips from '@/sections/confinementTips/ConfinementTipsGrid';
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default async function confinementTips() {
  await wait(1000);
  return (
    <>
    <Header />
      <ConfinementTips/>
      <Footer/>
    </>
  );
}

function wait(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}