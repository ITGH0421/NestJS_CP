import Banner from '@/sections/home/Banner'
import Package from '@/sections/home/PackagesSection'
import Trusted from '@/sections/home/TrustedSection'
import Article from '@/sections/home/HomeLatestArticles'
import Partner from '@/sections/home/Partner'
import Header from '@/components/Header'
import Footer from '@/components/Footer'


export default function Home() {
  return (
    <>
    <Header />
    <Banner/>
    <Package/>
    <Trusted/>
    <Article/>
    <Partner/>
    <Footer/>
    </>
  );
}